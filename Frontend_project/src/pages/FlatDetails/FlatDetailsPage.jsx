import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Layout,
    Carousel,
    Typography,
    Row,
    Col,
    Button,
    Modal,
    Card,
    Tag,
    Space,
} from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import HeaderComponent from "../../components/Navbar/HomeNavbar.jsx";
import FooterComponent from "../../components/Home/FooterComponent.jsx";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

// Animation variants
const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
};

// Mock data for flats (extended with amenities and contact phone)
const mockFlats = [
    {
        id: 1,
        title: "Cozy Studio in Downtown",
        description:
            "A modern studio apartment with great amenities, perfect for young professionals.",
        price: 1200,
        location: "New York, NY",
        amenities: ["Wi-Fi", "Air Conditioning", "Laundry", "Gym"],
        contactPhone: "+1-555-123-4567",
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1600607688969-a95ab8d8f286?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1600585154085-007db7b8f7b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
    },
    {
        id: 2,
        title: "Spacious 2-Bedroom Flat",
        description:
            "Perfect for roommates, close to public transport with modern appliances.",
        price: 2000,
        location: "San Francisco, CA",
        amenities: ["Parking", "Wi-Fi", "Dishwasher", "Balcony"],
        contactPhone: "+1-555-234-5678",
        images: [
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1600607687640-3b8b8f8f8f8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1600607688960-3b8b8f8f8f8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
    },
    {
        id: 3,
        title: "Luxury Condo with View",
        description:
            "Stunning views and premium facilities, ideal for luxury living.",
        price: 3500,
        location: "Miami, FL",
        amenities: ["Pool", "Gym", "Concierge", "Ocean View"],
        contactPhone: "+1-555-345-6789",
        images: [
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/b49bf469697403.5b8a353d1b1ad.jpg",
            "https://images.unsplash.com/photo-1600585154085-007db7b8f7b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1600607688969-a95ab8d8f286?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
    },
];

const FlatDetailsPage = ({ isDarkMode, setIsDarkMode }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [flat, setFlat] = useState(null);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    // Fetch flat data by ID (mock)
    useEffect(() => {
        const foundFlat = mockFlats.find((f) => f.id === parseInt(id));
        setFlat(foundFlat);
    }, [id]);

    // Handle screen resize
    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Drawer handlers
    const showDrawer = () => {
        setIsDrawerOpen(true);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };

    // Logout modal handlers
    const showLogoutModal = () => {
        setIsLogoutModalOpen(true);
    };

    const handleLogoutOk = () => {
        setIsLogoutModalOpen(false);
        navigate("/login");
    };

    const handleLogoutCancel = () => {
        setIsLogoutModalOpen(false);
    };

    // Contact modal handlers
    const showContactModal = () => {
        setIsContactModalOpen(true);
    };

    const handleContactModalOk = () => {
        if (flat?.contactPhone) {
            window.location.href = `tel:${flat.contactPhone}`;
        }
        setIsContactModalOpen(false);
    };

    const handleContactModalCancel = () => {
        setIsContactModalOpen(false);
    };

    if (!flat) {
        return (
            <Layout
                style={{
                    minHeight: "100vh",
                    background: isDarkMode ? "#1f1f1f" : "#f0f2f5",
                }}
            >
                <HeaderComponent
                    isDarkMode={isDarkMode}
                    setIsDarkMode={setIsDarkMode}
                    isSmallScreen={isSmallScreen}
                    showModal={showLogoutModal}
                    showDrawer={showDrawer}
                    isDrawerOpen={isDrawerOpen}
                    closeDrawer={closeDrawer}
                />
                <Content
                    style={{
                        padding: isSmallScreen ? "16px" : "32px",
                        background: isDarkMode ? "#1f1f1f" : "#fff",
                        color: isDarkMode ? "#fff" : "#000",
                        textAlign: "center",
                    }}
                >
                    <Paragraph>Flat not found.</Paragraph>
                </Content>
                <FooterComponent
                    isDarkMode={isDarkMode}
                    setIsDarkMode={setIsDarkMode}
                />
            </Layout>
        );
    }

    return (
        <Layout
            style={{
                minHeight: "100vh",
                background: isDarkMode ? "#1f1f1f" : "#f0f2f5",
            }}
        >
            <HeaderComponent
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                isSmallScreen={isSmallScreen}
                showModal={showLogoutModal}
                showDrawer={showDrawer}
                isDrawerOpen={isDrawerOpen}
                closeDrawer={closeDrawer}
            />
            <Content
                style={{
                    padding: isSmallScreen ? "16px" : "36px",
                    background: isDarkMode ? "#1f1f1f" : "#fff",
                    color: isDarkMode ? "#fff" : "#000",
                }}
            >
                <motion.div
                    variants={pageVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-6xl mx-auto"
                >
                    {/* Carousel */}
                    <motion.div variants={contentVariants}>
                        <Carousel
                            autoplay
                            arrows
                            style={{ marginBottom: "32px" }}
                        >
                            {flat.images.map((image, index) => (
                                <div key={index}>
                                    <img
                                        src={image}
                                        alt={`${flat.title} ${index + 1}`}
                                        style={{
                                            width: "100%",
                                            height: isSmallScreen
                                                ? "300px"
                                                : "500px",
                                            objectFit: "cover",
                                            borderRadius: "8px",
                                        }}
                                    />
                                </div>
                            ))}
                        </Carousel>
                    </motion.div>

                    {/* Details Section */}
                    <motion.div variants={contentVariants} className="pb-18">
                        <Card
                            className={`${
                                isDarkMode
                                    ? "bg-gray-800 text-white"
                                    : "bg-white text-gray-900"
                            } p-8`}
                            style={{
                                borderRadius: "8px",
                                boxShadow: isDarkMode
                                    ? "0 4px 12px rgba(0, 0, 0, 0.3)"
                                    : "0 4px 12px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            <Row gutter={[16, 16]}>
                                <Col xs={24}>
                                    <Title
                                        level={2}
                                        style={{
                                            color: isDarkMode ? "#fff" : "#000",
                                            fontFamily:
                                                "Nunito Sans, sans-serif",
                                            fontSize: isSmallScreen
                                                ? "28px"
                                                : "36px",
                                            marginBottom: "16px",
                                        }}
                                    >
                                        {flat.title}
                                    </Title>
                                    <Paragraph
                                        style={{
                                            color: isDarkMode
                                                ? "#d9d9d9"
                                                : "#595959",
                                            fontSize: isSmallScreen
                                                ? "16px"
                                                : "18px",
                                            marginBottom: "24px",
                                        }}
                                    >
                                        {flat.description}
                                    </Paragraph>
                                    <Space
                                        direction="vertical"
                                        size="middle"
                                        style={{ width: "100%" }}
                                    >
                                        <Paragraph
                                            style={{
                                                color: isDarkMode
                                                    ? "#fff"
                                                    : "#000",
                                                fontSize: isSmallScreen
                                                    ? "16px"
                                                    : "18px",
                                            }}
                                        >
                                            <strong>Price:</strong> $
                                            {flat.price}/month
                                        </Paragraph>
                                        <Paragraph
                                            style={{
                                                color: isDarkMode
                                                    ? "#fff"
                                                    : "#000",
                                                fontSize: isSmallScreen
                                                    ? "16px"
                                                    : "18px",
                                            }}
                                        >
                                            <strong>Location:</strong>{" "}
                                            {flat.location}
                                        </Paragraph>
                                        <Paragraph
                                            style={{
                                                color: isDarkMode
                                                    ? "#fff"
                                                    : "#000",
                                                fontSize: isSmallScreen
                                                    ? "16px"
                                                    : "18px",
                                            }}
                                        >
                                            <strong>Amenities:</strong>
                                            <br />
                                            <Space wrap>
                                                {flat.amenities.map(
                                                    (amenity, index) => (
                                                        <Tag
                                                            key={index}
                                                            color={
                                                                isDarkMode
                                                                    ? "blue"
                                                                    : "default"
                                                            }
                                                            style={{
                                                                fontSize:
                                                                    isSmallScreen
                                                                        ? "14px"
                                                                        : "16px",
                                                                padding:
                                                                    "4px 8px",
                                                            }}
                                                        >
                                                            {amenity}
                                                        </Tag>
                                                    )
                                                )}
                                            </Space>
                                        </Paragraph>
                                        <Button
                                            type="primary"
                                            icon={<PhoneOutlined />}
                                            size="large"
                                            onClick={showContactModal}
                                            className={
                                                isDarkMode
                                                    ? "bg-blue-600 hover:bg-blue-500"
                                                    : "bg-blue-500 hover:bg-blue-600"
                                            }
                                            style={{
                                                fontSize: isSmallScreen
                                                    ? "16px"
                                                    : "18px",
                                                height: "48px",
                                            }}
                                        >
                                            Contact Owner
                                        </Button>
                                    </Space>
                                </Col>
                            </Row>
                        </Card>
                    </motion.div>
                </motion.div>
            </Content>
            <FooterComponent
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
            />
            {/* Logout Modal */}
            <Modal
                title="Confirm Logout"
                open={isLogoutModalOpen}
                onOk={handleLogoutCancel}
                onCancel={handleLogoutOk}
                okText="Cancel"
                cancelText="Logout"
                style={{ background: isDarkMode ? "#2f2f2f" : "#fff" }}
            >
                <p>Are you sure you want to log out?</p>
            </Modal>
            {/* Contact Modal */}
            <motion.div
                variants={contentVariants}
                initial="hidden"
                animate={isContactModalOpen ? "visible" : "hidden"}
            >
                <Modal
                    title="Contact Owner"
                    open={isContactModalOpen}
                    onOk={handleContactModalOk}
                    onCancel={handleContactModalCancel}
                    okText="Call Now"
                    cancelText="Close"
                    style={{ background: isDarkMode ? "#2f2f2f" : "#fff" }}
                >
                    <p>
                        Phone Number:{" "}
                        <a href={`tel:${flat.contactPhone}`}>
                            {flat.contactPhone || "N/A"}
                        </a>
                    </p>
                </Modal>
            </motion.div>
        </Layout>
    );
};

export default FlatDetailsPage;
