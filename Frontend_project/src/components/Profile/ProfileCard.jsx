import { Card, Typography } from "antd";
import ProfileAvatar from "./ProfileAvatar.jsx";
import Fields from "./Fields.jsx";
import Actions from "./Actions.jsx";
import { motion } from "framer-motion";

const { Title } = Typography;

// Animation variants
const titleVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.4, delay: 0.3 },
    },
};

const ProfileCard = ({
    isDarkMode,
    user,
    handleUpdateProfile,
    handleLogout,
    isSmallScreen,
}) => {
    return (
        <Card
            className={`shadow-xl ${
                isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}
            cover={
                <div
                    className="flex justify-center items-center pt-6"
                    style={{ display: "flex" }}
                >
                    <ProfileAvatar isDarkMode={isDarkMode} />
                </div>
            }
        >
            <motion.div
                variants={titleVariants}
                initial="hidden"
                animate="visible"
            >
                <Title
                    level={3}
                    className={`text-center ${
                        isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                >
                    {user.name}
                </Title>
            </motion.div>
            <Fields user={user} />
            <Actions
                isDarkMode={isDarkMode}
                isSmallScreen={isSmallScreen}
                handleUpdateProfile={handleUpdateProfile}
                handleLogout={handleLogout}
            />
        </Card>
    );
};

export default ProfileCard;
