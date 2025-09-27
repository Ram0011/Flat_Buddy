import React from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

// Animation variants
const avatarVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.4, delay: 0.2 },
    },
};

const ProfileAvatar = ({ isDarkMode }) => {
    return (
        <motion.div
            variants={avatarVariants}
            initial="hidden"
            animate="visible"
        >
            <Avatar
                size={100}
                icon={<UserOutlined />}
                className={isDarkMode ? "bg-gray-700" : "bg-gray-200"}
            />
        </motion.div>
    );
};

export default ProfileAvatar;
