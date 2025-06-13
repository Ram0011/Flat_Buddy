import React, { useEffect, useState } from "react";
import { ConfigProvider, theme, Modal, Layout } from "antd";
import HeaderComponent from "../../components/Home/HeaderComponent.jsx";
import HeroSection from "../../components/Home/HeroSection.jsx";
import MainContent from "../../components/Home/MainContent.jsx";
import FooterComponent from "../../components/Home/FooterComponent.jsx";
import { useNavigate } from "react-router-dom";

const { defaultAlgorithm, darkAlgorithm } = theme;
const { Content } = Layout;

const HomePage = ({ isDarkMode, setIsDarkMode }) => {
    const navigate = useNavigate();
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

    // Toggle dark mode
    const handleToggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <ConfigProvider
            theme={{
                algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
            }}
        >
            <Layout
                style={{
                    minHeight: "100vh",
                    width: "100vw",
                    overflow: "hidden",
                }}
            >
                <HeaderComponent
                    isDarkMode={isDarkMode}
                    isSmallScreen={isSmallScreen}
                    handleToggleDarkMode={handleToggleDarkMode}
                    showModal={showModal}
                    showDrawer={showDrawer}
                    isDrawerOpen={isDrawerOpen}
                    closeDrawer={closeDrawer}
                />
                <Content
                    className="p-4"
                    style={{
                        background: isDarkMode ? "#1f1f1f" : "#fff",
                        color: isDarkMode ? "#fff" : "#000",
                        paddingTop: "20px",
                        overflow: "auto", // Only show scrollbars when needed
                        boxSizing: "border-box", // Include padding in width calculations
                        maxWidth: "100%", // Prevent content from exceeding viewport
                    }}
                >
                    <HeroSection isDarkMode={isDarkMode} />
                    <MainContent isDarkMode={isDarkMode} />
                </Content>
                <FooterComponent isDarkMode={isDarkMode} />
                <Modal
                    title="Confirm Logout"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <p>Are you sure you want to logout?</p>
                </Modal>
            </Layout>
        </ConfigProvider>
    );
};

export default HomePage;
