import { Button, Menu, Drawer, Layout, Switch } from "antd";
import {
    HomeOutlined,
    UserOutlined,
    ApartmentOutlined,
    LogoutOutlined,
    MenuOutlined,
    MenuUnfoldOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const { Header } = Layout;

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

const drawerVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
};

const HeaderComponent = ({
    isDarkMode,
    setIsDarkMode,
    isSmallScreen,
    showModal,
    showDrawer,
    isDrawerOpen,
    closeDrawer,
}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            key: "1",
            icon: <HomeOutlined />,
            label: "Home",
            onClick: () => {
                navigate("/");
            },
        },
        {
            key: "2",
            icon: <MenuUnfoldOutlined />,
            label: "Explore",
            onClick: () => {
                navigate("/home");
            },
        },
        {
            key: "3",
            icon: <UserOutlined />,
            label: "My Profile",
            onClick: () => {
                navigate("/profile");
            },
        },
        {
            key: "4",
            icon: <ApartmentOutlined />,
            label: "Listings",
            onClick: () => {
                navigate("/listings");
            },
        },
        {
            key: "5",
            icon: <LogoutOutlined />,
            label: "Logout",
            onClick: showModal,
        },
    ];

    const getSelectedKey = () => {
        const path = location.pathname;
        switch (path) {
            case "/":
                return "1";
            case "/home":
                return "2";
            case "/profile":
                return "3";
            default:
                return "1";
        }
    };

    const handleToggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
        >
            <Header
                style={{
                    background: isDarkMode ? "#030712" : "#131D4F",
                    padding: "0 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    overflowX: "hidden", // prevents header overflow
                }}
            >
                <motion.div
                    variants={fadeIn}
                    style={{ display: "flex", alignItems: "center" }}
                >
                    <motion.img
                        variants={fadeIn}
                        src="/logo.svg"
                        alt="Smart Rentals Logo"
                        style={{
                            height: isSmallScreen ? 32 : 40,
                            paddingRight: "10px",
                            cursor: "pointer",
                        }}
                        onClick={() => navigate("/")}
                    />
                    {!isSmallScreen && (
                        <motion.h1
                            variants={fadeIn}
                            style={{
                                margin: 0,
                                fontFamily:
                                    "Edu NSW ACT Hand Prescript, cursive",
                                fontSize: isSmallScreen ? "1.5rem" : "2.3rem",
                                fontWeight: "bold",
                                color: "#fff",
                                cursor: "pointer",
                                textShadow: isDarkMode
                                    ? "1px 1px 2px rgba(0, 0, 0, 0.5)"
                                    : "none",
                            }}
                            onClick={() => navigate("/")}
                        >
                            Smart Rentals
                        </motion.h1>
                    )}
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                    }}
                >
                    {isSmallScreen ? (
                        <>
                            <motion.div variants={fadeIn}>
                                <Button
                                    type="text"
                                    icon={<MenuOutlined />}
                                    onClick={showDrawer}
                                    style={{ color: "#fff" }}
                                    aria-label="Open menu"
                                />
                            </motion.div>
                            <Drawer
                                title="Menu"
                                placement="right"
                                onClose={closeDrawer}
                                open={isDrawerOpen}
                                width={250}
                                style={{
                                    background: isDarkMode ? "#1f1f1f" : "#fff",
                                }}
                            >
                                <motion.div
                                    variants={drawerVariants}
                                    initial="hidden"
                                    animate={
                                        isDrawerOpen ? "visible" : "hidden"
                                    }
                                >
                                    <Menu
                                        theme={isDarkMode ? "dark" : "light"}
                                        mode="vertical"
                                        selectedKeys={[getSelectedKey()]}
                                        items={menuItems}
                                        style={{
                                            background: isDarkMode
                                                ? "#1f1f1f"
                                                : "#fff",
                                            color: isDarkMode ? "#fff" : "#000",
                                            fontFamily: "cursive",
                                            fontWeight: 700,
                                        }}
                                    />
                                </motion.div>
                            </Drawer>
                        </>
                    ) : (
                        <motion.div
                            variants={staggerContainer}
                            style={{
                                overflowX: "auto",
                                maxWidth: "100vw",
                            }}
                        >
                            <Menu
                                theme="dark"
                                mode="horizontal"
                                selectedKeys={[getSelectedKey()]}
                                items={menuItems}
                                style={{
                                    borderBottom: "none",
                                    background: "transparent",
                                    fontFamily: "Roboto",
                                    fontWeight: 400,
                                    fontSize: "15px",
                                    lineHeight: "64px",
                                    display: "flex",
                                    flexWrap: "wrap",
                                    minWidth: "600px",
                                }}
                            />
                        </motion.div>
                    )}
                    <motion.div variants={fadeIn}>
                        <span style={{ color: "#fff" }}>
                            {isDarkMode ? "Dark Mode" : "Light Mode"}
                        </span>
                    </motion.div>
                    <motion.div variants={fadeIn}>
                        <Switch
                            checked={isDarkMode}
                            onChange={handleToggleDarkMode}
                            checkedChildren={<span role="img">🌙</span>}
                            unCheckedChildren={<span role="img">☀️</span>}
                        />
                    </motion.div>
                </motion.div>
            </Header>
        </motion.div>
    );
};

export default HeaderComponent;
