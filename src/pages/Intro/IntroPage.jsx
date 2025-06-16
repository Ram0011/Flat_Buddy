import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import HeaderComponent from "../../components/Navbar/HomeNavbar";
import HeroSection from "../../components/Intro/HeroSection";
import FeatureSection from "../../components/Intro/FeatureSection";
import HowItWorksSection from "../../components/Intro/HowItWorksSection";
import TestimonialSection from "../../components/Intro/TestimonialSection";
import FooterComponent from "../../components/Home/FooterComponent";
import { useNavigate } from "react-router-dom";

const IntroPage = ({ isDarkMode, setIsDarkMode }) => {
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

    return (
        <div
            className={`flex flex-col min-h-screen ${
                isDarkMode ? "bg-gray-900" : "bg-gray-50"
            }`}
        >
            <HeaderComponent
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                isSmallScreen={isSmallScreen}
                showModal={showModal}
                showDrawer={showDrawer}
                isDrawerOpen={isDrawerOpen}
                closeDrawer={closeDrawer}
            />
            <HeroSection isDarkMode={isDarkMode} />
            <FeatureSection isDarkMode={isDarkMode} />
            <HowItWorksSection isDarkMode={isDarkMode} />
            <TestimonialSection isDarkMode={isDarkMode} />
            <FooterComponent
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
            />
            <Modal
                title="Confirm Logout"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Are you sure you want to logout?</p>
            </Modal>
        </div>
    );
};

export default IntroPage;
