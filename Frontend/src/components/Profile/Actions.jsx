import React from "react";
import { Button, Space } from "antd";
import { motion } from "framer-motion";

// Animation variants
const buttonContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2, delayChildren: 0.6 },
    },
};

const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const Actions = ({
    isDarkMode,
    isSmallScreen,
    handleUpdateProfile,
    handleLogout,
}) => {
    return (
        <motion.div
            variants={buttonContainerVariants}
            initial="hidden"
            animate="visible"
            className="mt-8 flex items-center justify-center"
        >
            <Space
                direction={isSmallScreen ? "vertical" : "horizontal"}
                size="large"
            >
                <motion.div
                    variants={buttonVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button
                        type="primary"
                        onClick={handleUpdateProfile}
                        className={
                            isDarkMode ? "bg-blue-600 hover:bg-blue-500" : ""
                        }
                    >
                        Update Profile
                    </Button>
                </motion.div>
                <motion.div
                    variants={buttonVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button
                        danger
                        onClick={handleLogout}
                        className={
                            isDarkMode ? "bg-red-600 hover:bg-red-500" : ""
                        }
                    >
                        Logout
                    </Button>
                </motion.div>
            </Space>
        </motion.div>
    );
};

export default Actions;
