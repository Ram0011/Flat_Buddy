const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../db");
const verifyToken = require("../middleware/verifyToken");

// Register
router.post("/register", async (req, res) => {
    const { uname, emailid, pwd, gender, contactno, profession, cityid } =
        req.body;
    console.log("Received registration data:", req.body);

    try {
        db.query(
            "SELECT * FROM User WHERE emailid = ?",
            [emailid],
            async (err, users) => {
                if (err)
                    return res.status(500).json({ error: "Database error." });

                if (users.length > 0) {
                    return res
                        .status(409)
                        .json({ error: "Email already registered." });
                }

                const hashedPassword = await bcrypt.hash(pwd, 5);

                db.query(
                    "INSERT INTO User (pwd, uname, gender, emailid, contactno, profession, cityid) VALUES (?, ?, ?, ?, ?, ?, ?)",
                    [
                        hashedPassword,
                        uname,
                        gender,
                        emailid,
                        contactno,
                        profession,
                        cityid,
                    ],
                    (err, result) => {
                        if (err) {
                            console.error("DB insert error:", err);
                            return res.status(500).json({ error: err.message });
                        }
                        res.json({ success: true, message: "User registered" });
                    }
                );
            }
        );
    } catch (e) {
        console.error("Server error:", e);
        res.status(500).json({ error: "Something went wrong" });
    }
});

// Login
router.post("/login", async (req, res) => {
    const { emailid, pwd } = req.body;

    db.query(
        "SELECT * FROM User WHERE emailid = ?",
        [emailid],
        async (err, results) => {
            if (err) return res.status(500).json({ error: "Server error" });

            if (results.length === 0)
                return res.status(401).json({ error: "Invalid Emailid" });

            const user = results[0];
            const match = await bcrypt.compare(pwd, user.pwd);

            if (!match)
                return res.status(401).json({ error: "Invalid Password" });

            const token = jwt.sign(
                { userid: user.userid, emailid: user.emailid },
                process.env.JWT_SECRET,
                { algorithm: "HS256", expiresIn: "1d" }
            );

            res.json({
                success: true,
                token,
                userName: user.uname,
                roleId: user.roleid,
                userId: user.userid,
            });
        }
    );
});

// Update user role by ID
router.put("/role", verifyToken, (req, res) => {
    const userId = req.user.userid;
    const { roleId } = req.body;

    if (!roleId) {
        return res.status(400).json({ error: "Role ID is required." });
    }

    // Step 1: Check existing role
    const checkRoleQuery = "SELECT roleid FROM user WHERE userid = ?";

    db.query(checkRoleQuery, [userId], (err, results) => {
        if (err) {
            console.error("Error checking role:", err);
            return res.status(500).json({ error: "Database error." });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "User not found." });
        }

        const existingRoleId = results[0].roleid;

        // Step 2: Only update if role is null
        if (existingRoleId !== null) {
            return res
                .status(200)
                .json({ message: "Role already set. No update needed." });
        }

        // Step 3: Update role
        const updateQuery = "UPDATE user SET roleid = ? WHERE userid = ?";

        db.query(updateQuery, [roleId, userId], (err, result) => {
            if (err) {
                console.error("Error updating role:", err);
                return res.status(500).json({ error: "Database error." });
            }

            res.status(200).json({ message: "Role updated successfully." });
        });
    });
});

module.exports = router;
