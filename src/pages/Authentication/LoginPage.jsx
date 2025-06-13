import { useState, useEffect } from "react";
import { Modal, message } from "antd";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../../components/Login/HeaderComponent";
import ContentComponent from "../../components/Login/ContentComponent";

// Animation variants for modal
const modalVariants = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const LoginPage = ({ isDarkMode, setIsDarkMode }) => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        message.info("Logged out successfully");
        navigate("/login");
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const showDrawer = () => {
        setIsDrawerOpen(true);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };

    return (
        <>
            <HeaderComponent
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                isSmallScreen={isSmallScreen}
                showModal={showModal}
                showDrawer={showDrawer}
                isDrawerOpen={isDrawerOpen}
                closeDrawer={closeDrawer}
            />
            <ContentComponent
                isDarkMode={isDarkMode}
                navigate={navigate}
                setLoading={setLoading}
                loading={loading}
            />
            <motion.div
                variants={modalVariants}
                initial="hidden"
                animate={isModalOpen ? "visible" : "hidden"}
            >
                <Modal
                    title="Confirm Logout"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okText="Logout"
                    cancelText="Cancel"
                >
                    <p>Are you sure you want to log out?</p>
                </Modal>
            </motion.div>
        </>
    );
};

export default LoginPage;
