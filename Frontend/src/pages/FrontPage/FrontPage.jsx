import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button, message, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import HomeNavbar from "../../components/Navbar/HomeNavbar";
import FooterComponent from "../../components/Home/FooterComponent";

// Slide-in animation variants
const slideInFromBottom = (delay = 0) => ({
    hidden: { opacity: 0, y: 100 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay },
    },
});

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const FrontPage = ({ isDarkMode, setIsDarkMode }) => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAccessDeniedModalOpen, setIsAccessDeniedModalOpen] =
        useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const showDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);
    const showModal = () => setIsModalOpen(true);

    const handleOk = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("roleId");
        localStorage.removeItem("userId");
        setIsModalOpen(false);
        message.info("Logged out successfully");
        setTimeout(() => navigate("/login"), 0);
    };

    const handleCancel = () => setIsModalOpen(false);
    const handleAccessDeniedOk = () => {
        setIsAccessDeniedModalOpen(false);
    };

    const cards = [
        {
            title: "Seek for a flat",
            path: "/seek-flat",
            delay: 0.1,
        },
        {
            title: "List flat to find roommate",
            path: "/lister",
            delay: 0.3,
        },
        {
            title: "List private flat",
            path: "/owner",
            delay: 0.5,
        },
    ];

    const updateRole = async (roleId) => {
        const token = localStorage.getItem("token");

        try {
            await fetch("http://localhost:4000/api/auth/role", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ roleId }),
            });
        } catch (err) {
            console.error("Error updating role:", err);
        }
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat relative"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1470&q=80')",
            }}
        >
            {/* Blur Overlay */}
            <div className="absolute inset-0 backdrop-blur-sm bg-black/30 z-0" />

            {/* Content */}
            <div className="relative z-10 flex flex-col min-h-screen">
                {/* Navbar */}
                <HomeNavbar
                    isDarkMode={isDarkMode}
                    setIsDarkMode={setIsDarkMode}
                    isSmallScreen={isSmallScreen}
                    showModal={showModal}
                    showDrawer={showDrawer}
                    isDrawerOpen={isDrawerOpen}
                    closeDrawer={closeDrawer}
                />

                {/* Main Section with slide-in cards */}
                <main className="flex-grow flex flex-col items-center justify-center px-4 py-20">
                    <motion.div
                        variants={fadeIn}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1 }}
                        className="text-4xl md:text-6xl mb-4"
                    >
                        <motion.h1
                            className={`text-custom md:text-5xl lg:text-7xl mb-1 ${
                                isDarkMode
                                    ? "text-white"
                                    : "bg-gradient-to-r from-blue-950 to-sky-950 bg-clip-text text-transparent"
                            }`}
                            style={{
                                fontFamily: "Roboto, sans-serif",
                                fontWeight: "bold",
                                textAlign: "center",
                                textShadow: isDarkMode
                                    ? "1px 1px 2px rgba(0, 0, 0, 0.5)"
                                    : "none",
                            }}
                        >
                            Welcome to Flat Buddy
                        </motion.h1>
                    </motion.div>

                    <motion.div variants={fadeIn}>
                        <motion.p
                            className={`text-lg md:text-2xl pb-14 max-w-2xl mx-auto text-center ${
                                isDarkMode ? "text-gray-300" : "text-gray-900"
                            }`}
                            style={{
                                fontFamily: "Roboto, sans-serif",
                                fontWeight: 300,
                            }}
                        >
                            Discover your dream flat or perfect roommate with
                            ease. Filter by budget, location, pets, smoking, and
                            more on our rental platform.
                        </motion.p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl pb-72">
                        {cards.map((card, index) => (
                            <motion.div
                                key={index}
                                variants={slideInFromBottom(card.delay)}
                                initial="hidden"
                                animate="visible"
                                whileHover={{ scale: 1.05 }}
                                onClick={() => {
                                    const token = localStorage.getItem("token");
                                    if (!token) {
                                        message.warning(
                                            "Please login to continue."
                                        );
                                        return;
                                    }

                                    const userRoleId = parseInt(
                                        localStorage.getItem("roleId")
                                    );

                                    if (
                                        (userRoleId === 1 &&
                                            (card.title ===
                                                "List flat to find roommate" ||
                                                card.title ===
                                                    "Seek for a flat")) ||
                                        (userRoleId === 2 &&
                                            card.title === "List private flat")
                                    ) {
                                        setIsAccessDeniedModalOpen(true);
                                        return;
                                    }

                                    const roleId =
                                        card.title === "List private flat"
                                            ? 1
                                            : 2;

                                    updateRole(roleId).then(() =>
                                        navigate(card.path)
                                    );
                                }}
                                className={`rounded-2xl p-8 text-center cursor-pointer shadow-xl border transition-all duration-300 ${
                                    isDarkMode
                                        ? "bg-gray-800 text-white border-gray-700 hover:shadow-2xl"
                                        : "bg-gray-300 text-gray-900 border-gray-200 hover:shadow-2xl"
                                }`}
                            >
                                <h2 className="text-xl pb-2 font-semibold">
                                    {card.title}
                                </h2>
                                <Button type="primary" className="mt-4">
                                    Explore
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                </main>

                {/* Footer (only visible if you scroll down) */}
                <FooterComponent
                    isDarkMode={isDarkMode}
                    setIsDarkMode={setIsDarkMode}
                />
            </div>

            {/* Logout Confirmation Modal */}
            <Modal
                title="Confirm Logout"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Are you sure you want to logout?</p>
            </Modal>
            <Modal
                title="Access Denied"
                open={isAccessDeniedModalOpen}
                onOk={handleAccessDeniedOk}
                onCancel={handleAccessDeniedOk}
                okText="Login with Different Account"
            >
                <p>
                    This option is not available for your role. Please login
                    from a different account to access it.
                </p>
            </Modal>
        </div>
    );
};

export default FrontPage;
