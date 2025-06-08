import { Button, Menu, Drawer, Layout, Switch } from "antd";
import {
    HomeOutlined,
    UserOutlined,
    ApartmentOutlined,
    LogoutOutlined,
    MenuOutlined,
} from "@ant-design/icons";

const { Header } = Layout;

const HeaderComponent = ({
    isDarkMode,
    isSmallScreen,
    handleToggleDarkMode,
    showModal,
    showDrawer,
    isDrawerOpen,
    closeDrawer,
}) => {
    const menuItems = [
        {
            key: "1",
            icon: <HomeOutlined />,
            label: "Home",
            onClick: () => {
                window.location.href = "/";
            },
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
                    gap: "8px",
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
                                    background: isDarkMode ? "#1f1f1f" : "#fff",
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
                            flex: 1,
                            justifyContent: "flex-end",
                            lineHeight: "64px",
                        }}
                    />
                )}
                <span style={{ color: "#fff" }}>
                    {isDarkMode ? "Dark Mode" : "Light Mode"}
                </span>
                <Switch
                    checked={isDarkMode}
                    onChange={handleToggleDarkMode}
                    checkedChildren={<span role="img">🌙</span>}
                    unCheckedChildren={<span role="img">☀️</span>}
                />
            </div>
        </Header>
    );
};

export default HeaderComponent;
