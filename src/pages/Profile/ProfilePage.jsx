import React, { useState, useEffect } from "react";
import { Layout, message } from "antd";
import { motion } from "framer-motion";
import "antd/dist/reset.css";
import HeaderNavbar from "../../components/Navbar/HomeNavbar.jsx";
import ProfileCard from "../../components/Profile/ProfileCard.jsx";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

// Animation variants
const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ProfilePage = ({ isDarkMode, setIsDarkMode }) => {
    const [user, setUser] = useState({
        name: "John Doe",
        age: 30,
        profession: "Software Engineer",
        drinks: "Occasionally",
        smokes: "No",
        pets: "Yes (Dog)",
    });

    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const navigate = useNavigate();

    // Handle modal for logout
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        console.log("User logged out - navigating to /login");
        setIsModalOpen(false);
        setTimeout(() => navigate("/login"), 0);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // Handle logout
    const handleLogout = () => {
        navigate("/login");
        setIsModalOpen(false);
        message.success("Logged out successfully!");
    };

    // Handle drawer for mobile menu
    const showDrawer = () => {
        setIsDrawerOpen(true);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };

    // Handle screen resize for responsive design
    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Handle update profile
    const handleUpdateProfile = () => {
        message.info("Update profile functionality to be implemented.");
    };

    return (
        <div
            className={`flex flex-col min-h-screen ${
                isDarkMode ? "bg-gray-900" : "bg-gray-50"
            }`}
        >
            <HeaderNavbar
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                isSmallScreen={isSmallScreen}
                showModal={showModal}
                showDrawer={showDrawer}
                isDrawerOpen={isDrawerOpen}
                closeDrawer={closeDrawer}
            />
            <div className="flex-grow flex items-center justify-center pt-16 px-4">
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full max-w-md"
                >
                    <ProfileCard
                        isDarkMode={isDarkMode}
                        user={user}
                        handleUpdateProfile={handleUpdateProfile}
                        handleLogout={handleLogout}
                        isSmallScreen={isSmallScreen}
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default ProfilePage;
