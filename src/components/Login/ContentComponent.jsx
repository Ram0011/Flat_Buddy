import { Tabs, Layout } from "antd";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const { Content } = Layout;

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
};

const ContentComponent = ({ isDarkMode, navigate, setLoading, loading }) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const activeTab = queryParams.get("tab") === "signup" ? "signup" : "login";

    const tabItems = [
        {
            key: "login",
            label: "Login",
            children: (
                <LoginForm
                    isDarkMode={isDarkMode}
                    navigate={navigate}
                    setLoading={setLoading}
                    loading={loading}
                />
            ),
        },
        {
            key: "signup",
            label: "Sign Up",
            children: (
                <SignupForm
                    isDarkMode={isDarkMode}
                    setLoading={setLoading}
                    loading={loading}
                />
            ),
        },
    ];

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            style={{
                position: "relative",
                width: "100%",
                minHeight: "calc(100vh - 64px)",
                backgroundColor: "#1a1a1a",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    filter: "blur(6px)",
                    zIndex: 1,
                    overflow: "hidden",
                }}
            />
            <Content
                className="p-4"
                style={{
                    position: "relative",
                    zIndex: 2,
                    minHeight: "calc(100vh - 64px)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div
                    className="py-8 px-4 md:py-10 md:px-6 rounded-md text-center max-w-md md:max-w-lg lg:max-w-xl w-full"
                    style={{
                        background: isDarkMode
                            ? "rgba(38, 38, 38, 0.9)"
                            : "rgba(235, 248, 255, 0.9)",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    }}
                >
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className={`text-2xl sm:text-xl md:text-4xl lg:text-6xl mb-2 ${
                            isDarkMode
                                ? "text-white"
                                : "bg-gradient-to-r from-blue-950 to-sky-800 bg-clip-text text-transparent"
                        }`}
                        style={{
                            fontFamily: "Nunito Sans, sans-serif",
                            fontWeight: "bold",
                            textShadow: isDarkMode
                                ? "1px 1px 2px rgba(0, 0, 0, 0.5)"
                                : "none",
                        }}
                    >
                        Smart Rentals
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mb-4 sm:text-md md:text-lg lg:text-xl"
                        style={{ fontFamily: "Nunito Sans, sans-serif" }}
                    >
                        Access or create your account to find the perfect flat
                        and roommate.
                    </motion.p>
                    <Tabs
                        defaultActiveKey={activeTab}
                        centered
                        items={tabItems}
                    />
                </div>
            </Content>
        </motion.div>
    );
};

export default ContentComponent;
