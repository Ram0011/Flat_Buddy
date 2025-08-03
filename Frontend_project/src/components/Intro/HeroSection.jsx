import { Button, Typography } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const { Paragraph } = Typography;

// Animation variants
const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
};

const HeroSection = ({ isDarkMode }) => {
    const navigate = useNavigate();

    return (
        <motion.section
            className={`${
                isDarkMode
                    ? "bg-gradient-to-b from-gray-950 via-gray-950 to-gray-900"
                    : "#ebf8ff"
            } bg-sky-50 py-56 px-4 `}
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
        >
            <div className="container mx-auto text-center">
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
                                : "bg-gradient-to-r from-blue-950 to-sky-800 bg-clip-text text-transparent"
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
                        Welcome to Smart Rentals
                    </motion.h1>
                </motion.div>
                <motion.div variants={fadeIn}>
                    <p
                        className={`text-lg md:text-2xl mb-8 max-w-2xl mx-auto ${
                            isDarkMode ? "text-gray-300" : "text-gray-900"
                        }`}
                        style={{
                            fontFamily: "Roboto, sans-serif",
                            fontWeight: 300,
                        }}
                    >
                        Discover your dream flat or perfect roommate with ease.
                        Filter by budget, location, pets, smoking, and more on
                        our rental platform.
                    </p>
                </motion.div>
                <motion.div
                    variants={fadeIn}
                    className="flex gap-4 justify-center"
                >
                    <Button
                        type="primary"
                        size="large"
                        icon={<ArrowRightOutlined />}
                        onClick={() => navigate("/home")}
                    >
                        Explore Rentals
                    </Button>
                    <Button
                        type="default"
                        size="large"
                        onClick={() => navigate("/login?tab=signup")} // Updated to include query parameter
                        className={
                            isDarkMode
                                ? "bg-gray-700 text-white"
                                : "bg-white text-blue-600"
                        }
                    >
                        Sign Up
                    </Button>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default HeroSection;
