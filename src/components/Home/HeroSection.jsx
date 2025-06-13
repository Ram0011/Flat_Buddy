import { Button, Input } from "antd";
import { motion } from "framer-motion";

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
    return (
        <motion.div
            className="py-12 rounded-md mb-6 text-center"
            style={{
                background: isDarkMode ? "#262626" : "#ebf8ff",
            }}
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
        >
            <motion.h2
                className={`text-3xl md:text-3xl  lg:text-6xl py-5 ${
                    isDarkMode
                        ? "text-white"
                        : "bg-gradient-to-r from-blue-950 to-sky-800 bg-clip-text text-transparent"
                }`}
                style={{
                    fontFamily: "Roboto, sans-serif",
                    textShadow: isDarkMode
                        ? "1px 1px 2px rgba(0, 0, 0, 0.5)"
                        : "none",
                    fontWeight: 700,
                }}
                variants={fadeIn}
            >
                Find the Perfect Flat & Roommate
            </motion.h2>
            <motion.p
                className="my-4 sm:text-xl md:text-2xl lg:text-3xl font-bold"
                style={{
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: 300,
                    fontStyle: "italic",
                    color: isDarkMode ? "#d1d5db" : "#6b7280",
                }}
                variants={fadeIn}
            >
                Smart rentals that match your lifestyle preferences.
            </motion.p>
            <motion.div
                className="flex justify-center gap-2 mb-4 pt-5 flex-wrap"
                variants={fadeIn}
            >
                <Input placeholder="Location" style={{ width: 200 }} />
                <Input placeholder="Budget" style={{ width: 120 }} />
                <Button type="primary">Search</Button>
            </motion.div>
            <motion.div
                className="flex gap-4 justify-center pt-4"
                variants={fadeIn}
            >
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                >
                    <Button type="default">Search Flats</Button>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                >
                    <Button type="default">Find Roommates</Button>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default HeroSection;
