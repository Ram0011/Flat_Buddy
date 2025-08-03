import React from "react";
import { Modal } from "antd";
import { motion } from "framer-motion";
import { message } from "antd";

const LogoutModal = ({
    isDarkMode,
    isLogoutModalOpen,
    setIsLogoutModalOpen,
    navigate,
    modalVariants,
}) => {
    const handleLogoutOk = () => {
        setIsLogoutModalOpen(false);
        message.info("Logged out successfully");
        navigate("/login");
    };

    const handleLogoutCancel = () => {
        setIsLogoutModalOpen(false);
    };

    return (
        <motion.div
            variants={modalVariants}
            initial="hidden"
            animate={isLogoutModalOpen ? "visible" : "hidden"}
        >
            <Modal
                title="Confirm Logout"
                open={isLogoutModalOpen}
                onOk={handleLogoutCancel}
                onCancel={handleLogoutOk}
                okText="Cancel"
                cancelText="Logout"
                style={{ background: isDarkMode ? "#2f2f2f" : "#fff" }}
            >
                <p>Are you sure you want to log out?</p>
            </Modal>
        </motion.div>
    );
};

export default LogoutModal;
