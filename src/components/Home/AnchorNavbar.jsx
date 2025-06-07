import { useEffect, useState } from "react";
import {
    ConfigProvider,
    theme,
    Button,
    Card,
    Input,
    Progress,
    Layout,
    Menu,
    Switch,
    Modal,
    Carousel,
    Col,
    Row,
    Statistic,
} from "antd";

import {
    HomeOutlined,
    SearchOutlined,
    UserOutlined,
    ApartmentOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css";
import CountUp from "react-countup";

const { defaultAlgorithm, darkAlgorithm } = theme;
const { Header, Content } = Layout;

//Statistics
const formatter = (value) => <CountUp end={value} separator="," />;

//flats data
const flats = [
    {
        title: "Downtown Seattle",
        price: "$2000/month",
        image: "https://th.bing.com/th/id/R.bf3f2f0ab470b6ae0acd69d3366b8e71?rik=zDfPdp%2fp8597XA&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f10%2fPhotos-Apartment-HD.jpg&ehk=68xff7gTwc8dN2zuON1jZ0soOcByscrd6C9hwSszjyw%3d&risl=&pid=ImgRaw&r=0",
        features: ["WiFi", "AC", "Furnished"],
    },
    {
        title: "City Center Platz",
        price: "$1800/month",
        image: "https://www.phillyaptrentals.com/wp-content/uploads/2020/12/apartment-building-what-makes-good-apartment-building-scaled.jpg",
        features: ["WiFi", "Washer", "Pet-friendly"],
    },
];

export default function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleClick = () => {
        setIsDarkMode((prev) => !prev);
    };

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
        <ConfigProvider
            theme={{
                algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
            }}
        >
            <Layout style={{ minHeight: "100vh" }}>
                <Header
                    style={{
                        background: isDarkMode ? "#141414" : "#131D4F",
                        padding: "0 16px",

                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "#131D4F",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "24px",
                        }}
                    >
                        {isSmallScreen ? (
                            <img
                                src="/logo.svg"
                                alt="Smart Rentals Logo"
                                style={{ height: 40, paddingRight: "10px" }}
                            />
                        ) : (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                }}
                            >
                                <img
                                    src="/logo.svg"
                                    alt="Smart Rentals Logo"
                                    style={{ height: 40 }}
                                />
                                <h1
                                    className="text-3xl text-white cormorant-garamond"
                                    style={{
                                        margin: 0,
                                        fontFamily: "Permanent Marker",
                                        fontSize: "2.5rem",
                                        fontWeight: "bold",
                                        textShadow: isDarkMode
                                            ? "1px 1px 2px rgba(0, 0, 0, 0.5)"
                                            : "none",
                                        transition:
                                            "color 0.3s ease, text-shadow 0.3s ease",
                                    }}
                                >
                                    Smart Rentals
                                </h1>
                            </div>
                        )}
                    </div>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                        }}
                    >
                        <Menu
                            theme={"dark"}
                            mode="horizontal"
                            defaultSelectedKeys={["1"]}
                            items={menuItems}
                            style={{
                                borderBottom: "none",
                                background: "transparent",
                                fontFamily: "cursive",
                                minWidth: isSmallScreen ? "auto" : "500px",
                                marginLeft: "20px",
                                fontWeight: 700,
                                flexWrap: "wrap",
                            }}
                        />
                        <Modal
                            title="Basic Modal"
                            closable={{ "aria-label": "Custom Close Button" }}
                            open={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}
                        >
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                        </Modal>

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
                    className="p-4 overflow-scroll"
                    style={{
                        background: isDarkMode ? "#1f1f1f" : "#fff",
                        color: isDarkMode ? "#fff" : "#000",
                        paddingTop: "20px",
                    }}
                >
                    <div
                        className="py-12 rounded-md mb-6 text-center "
                        style={{
                            background: isDarkMode ? "#262626" : "#ebf8ff",
                        }}
                    >
                        <h2
                            className={`sm:text-xl md:text-3xl lg:text-5xl mb-1 ${
                                isDarkMode
                                    ? "text-white"
                                    : "bg-gradient-to-r from-blue-950 to-sky-800 bg-clip-text text-transparent"
                            }`}
                            style={{
                                fontFamily: "Rubik Gemstones",
                            }}
                        >
                            Find the Perfect Flat & Roommate
                        </h2>

                        <p
                            className="mb-4 sm:text-md md:text-lg lg:text-xl font-bold"
                            style={{ fontFamily: "Indie Flower, cursive" }}
                        >
                            Smart rentals that match your lifestyle preferences.
                        </p>
                        <div className="flex justify-center gap-2 mb-4">
                            <Input
                                placeholder="Location"
                                style={{ width: 200 }}
                            />
                            <Input
                                placeholder="Budget"
                                style={{ width: 120 }}
                            />
                            <Input
                                placeholder="Roommate Type"
                                style={{ width: 150 }}
                            />
                            <Input
                                placeholder="Lifestyle"
                                style={{ width: 150 }}
                            />
                            <Button type="primary">Search</Button>
                        </div>
                        <div className="flex gap-4 justify-center">
                            <Button>Search Flats</Button>
                            <Button>Find Roommates</Button>
                        </div>
                    </div>

                    {/* Statistics Cards */}
                    {/* Statistics + Carousel Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                        <Card
                            title={
                                <span
                                    className="text-2xl font-semibold"
                                    style={{ fontFamily: "Sour Gummy" }}
                                >
                                    Statistics
                                </span>
                            }
                            variant={"outlined"}
                            className="h-full"
                        >
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Statistic
                                        title="Total Listings"
                                        value={1234}
                                        formatter={formatter}
                                        style={{ fontFamily: "Winky Rough" }}
                                    />
                                </Col>
                                <Col span={12}>
                                    <Statistic
                                        title="Total Users"
                                        value={500}
                                        precision={2}
                                        formatter={formatter}
                                        style={{ fontFamily: "Winky Rough" }}
                                    />
                                </Col>
                            </Row>
                        </Card>
                        <div className="sm:col-span-2">
                            <Card variant="outlined" className="h-full">
                                <Carousel autoplay dotPosition="bottom">
                                    {flats.map((flat, index) => (
                                        <div key={index}>
                                            <div className="text-center">
                                                <h3 className="text-lg mb-2">
                                                    {flat.title}
                                                </h3>
                                                <img
                                                    src={flat.image}
                                                    alt={`flat-${index}`}
                                                    style={{
                                                        width: "100%",
                                                        maxHeight: "250px",
                                                        objectFit: "cover",
                                                        borderRadius: "8px",
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </Carousel>
                            </Card>
                        </div>
                    </div>

                    {/* Flats Display Section */}
                    <div className="flex gap-4">
                        <div className="w-1/4">
                            <h3
                                className=" mb-2 sm:text-xl md:text-4xl"
                                style={{ fontFamily: "Winky Rough" }}
                            >
                                Filters
                            </h3>
                            <div className="flex flex-col gap-2">
                                <Input placeholder="Budget Range" />
                                <Input placeholder="City / Area" />
                                <Input placeholder="Number of Rooms" />
                                <div>
                                    <label>
                                        <input type="checkbox" /> Pet-friendly
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input type="checkbox" /> Smoking
                                        allowed
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1">
                            <h3
                                className=" sm:text-xl md:text-4xl  mb-2"
                                style={{ fontFamily: "Winky Rough" }}
                            >
                                Listed Places
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {flats.map((flat, index) => (
                                    <Card
                                        key={index}
                                        cover={
                                            <img alt="flat" src={flat.image} />
                                        }
                                        actions={[
                                            <Button>View Details</Button>,
                                            <Button>Contact Owner</Button>,
                                        ]}
                                    >
                                        <Card.Meta
                                            title={flat.title}
                                            description={
                                                <div>
                                                    <p>{flat.price}</p>
                                                    <p className="text-sm text-gray-500">
                                                        {flat.features.join(
                                                            ", "
                                                        )}
                                                    </p>
                                                </div>
                                            }
                                        />
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </Content>
            </Layout>
        </ConfigProvider>
    );
}
