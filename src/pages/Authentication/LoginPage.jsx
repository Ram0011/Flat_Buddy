import { useState, useEffect } from "react";
import {
    Button,
    Input,
    Layout,
    Menu,
    Switch,
    Modal,
    Drawer,
    Form,
    message,
    Tabs,
} from "antd";
import {
    HomeOutlined,
    UserOutlined,
    ApartmentOutlined,
    LogoutOutlined,
    MenuOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Header, Content } = Layout;
const { TabPane } = Tabs;

export default function LoginPage({ isDarkMode, setIsDarkMode }) {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        message.info("Logged out successfully");
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

    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleClick = () => {
        setIsDarkMode((prev) => !prev);
    };

    const onLoginFinish = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:3000/login", {
                userId: values.userId,
                password: values.password,
            });
            if (response.data.success) {
                message.success(`Welcome, ${response.data.userName}!`);
                navigate("/");
            } else {
                message.error(
                    "Invalid user ID or password. If you're not registered, please sign up."
                );
            }
        } catch (error) {
            message.error("Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const onSignupFinish = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:3000/signup", {
                userId: values.userId,
                password: values.password,
                userName: values.userName,
            });
            if (response.data.success) {
                message.success("Sign up successful! Please log in.");
                document.getElementById("login-form").reset();
            } else {
                message.error(response.data.message || "Sign up failed.");
            }
        } catch (error) {
            message.error("Sign up failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const menuItems = [
        {
            key: "1",
            icon: <HomeOutlined />,
            label: "Home",
            onClick: () => navigate("/"),
        },
        {
            key: "2",
            icon: <UserOutlined />,
            label: "My Requests",
        },
        {
            key: "3",
            icon: <ApartmentOutlined />,
            label: "My Listings",
        },
        {
            key: "4",
            icon: <LogoutOutlined />,
            label: "Logout",
            onClick: showModal,
        },
    ];

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Header
                style={{
                    background: isDarkMode ? "#141414" : "#131D4F",
                    padding: "0 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    overflowX: "hidden",
                }}
            >
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                        src="/logo.svg"
                        alt="Smart Rentals Logo"
                        style={{
                            height: isSmallScreen ? 32 : 40,
                            paddingRight: "10px",
                        }}
                    />
                    {!isSmallScreen && (
                        <h1
                            style={{
                                margin: 0,
                                fontFamily: "Permanent Marker",
                                fontSize: isSmallScreen ? "1.5rem" : "2.5rem",
                                fontWeight: "bold",
                                color: "#fff",
                                textShadow: isDarkMode
                                    ? "1px 1px 2px rgba(0, 0, 0, 0.5)"
                                    : "none",
                            }}
                        >
                            Smart Rentals
                        </h1>
                    )}
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        flex: 1,
                        justifyContent: "flex-end",
                    }}
                >
                    {isSmallScreen ? (
                        <>
                            <Button
                                type="text"
                                icon={<MenuOutlined />}
                                onClick={showDrawer}
                                style={{ color: "#fff" }}
                                aria-label="Open menu"
                            />
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
                                <Menu
                                    theme={isDarkMode ? "dark" : "light"}
                                    mode="vertical"
                                    defaultSelectedKeys={["1"]}
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
                            </Drawer>
                        </>
                    ) : (
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={["1"]}
                            items={menuItems}
                            overflowedIndicator={null}
                            style={{
                                borderBottom: "none",
                                background: "transparent",
                                fontFamily: "cursive",
                                fontWeight: 700,
                                marginLeft: "auto",
                                lineHeight: "64px",
                            }}
                        />
                    )}
                    <span style={{ color: "#fff" }}>
                        {isDarkMode ? "Dark Mode" : "Light Mode"}
                    </span>
                    <Switch
                        checked={isDarkMode}
                        onChange={handleClick}
                        checkedChildren={<span role="img">🌙</span>}
                        unCheckedChildren={<span role="img">☀️</span>}
                    />
                </div>
            </Header>

            <Content
                className="p-4"
                style={{
                    backgroundImage: `url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
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
                    <h2
                        className={`text-2xl sm:text-xl md:text-4xl lg:text-6xl mb-2 ${
                            isDarkMode
                                ? "text-white"
                                : "bg-gradient-to-r from-blue-950 to-sky-800 bg-clip-text text-transparent"
                        }`}
                        style={{
                            fontFamily: "Rubik Gemstones",
                            textShadow: isDarkMode
                                ? "1px 1px 2px rgba(0, 0, 0, 0.5)"
                                : "none",
                        }}
                    >
                        Smart Rentals
                    </h2>
                    <p
                        className="mb-4 sm:text-md md:text-lg lg:text-2xl font-bold"
                        style={{ fontFamily: "Indie Flower, cursive" }}
                    >
                        Access or create your account to find the perfect flat
                        and roommate.
                    </p>
                    <Tabs defaultActiveKey="login" centered>
                        <TabPane tab="Login" key="login">
                            <Form
                                id="login-form"
                                name="login"
                                onFinish={onLoginFinish}
                                style={{
                                    width: "100%",
                                    padding: "0 16px",
                                }}
                            >
                                <Form.Item
                                    name="userId"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input your User ID!",
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="User ID"
                                        className="text-base md:text-lg"
                                        style={{
                                            fontFamily: "Indie Flower, cursive",
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input your Password!",
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        placeholder="Password"
                                        className="text-base md:text-lg"
                                        style={{
                                            fontFamily: "Indie Flower, cursive",
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={loading}
                                        className="text-base md:text-lg"
                                        style={{ width: "100%" }}
                                    >
                                        Log In
                                    </Button>
                                </Form.Item>
                            </Form>
                        </TabPane>
                        <TabPane tab="Sign Up" key="signup">
                            <Form
                                id="signup-form"
                                name="signup"
                                onFinish={onSignupFinish}
                                style={{
                                    width: "100%",
                                    padding: "0 16px",
                                }}
                            >
                                <Form.Item
                                    name="userId"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input your User ID!",
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="User ID"
                                        className="text-base md:text-lg"
                                        style={{
                                            fontFamily: "Indie Flower, cursive",
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input your Password!",
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        placeholder="Password"
                                        className="text-base md:text-lg"
                                        style={{
                                            fontFamily: "Indie Flower, cursive",
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="userName"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your Name!",
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="Full Name"
                                        className="text-base md:text-lg"
                                        style={{
                                            fontFamily: "Indie Flower, cursive",
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={loading}
                                        className="text-base md:text-lg"
                                        style={{ width: "100%" }}
                                    >
                                        Sign Up
                                    </Button>
                                </Form.Item>
                            </Form>
                        </TabPane>
                    </Tabs>
                </div>
            </Content>
            <Modal
                title="Confirm Logout"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Cancel"
                cancelText="Logout"
            >
                <p>Are you sure you want to log out?</p>
            </Modal>
        </Layout>
    );
}
