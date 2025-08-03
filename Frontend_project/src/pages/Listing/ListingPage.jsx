import { useState, useEffect } from "react";
import { Layout, Button, Form, Row } from "antd";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../../components/Navbar/HomeNavbar";
import FlatCard from "../../components/Listing/FlatCard.jsx";
import ListingFormModal from "../../components/Listing/ListingFormModal.jsx";
import LogoutModal from "../../components/Listing/LogoutModal.jsx";

const { Content } = Layout;

// Animation variants
const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const modalVariants = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const cardVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: (i) => ({
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, delay: i * 0.2 },
    }),
};

// Mock data for listed flats with images
const mockFlats = [
    {
        id: 1,
        title: "Cozy Studio in Downtown",
        description: "A modern studio apartment with great amenities.",
        price: 1200,
        location: "New York, NY",
        imageUrl:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tags: ["1 Bedroom", "1 Bathroom", "Kitchen"],
        amenities: ["Wi-Fi", "Air Conditioning", "Gym"],
    },
    {
        id: 2,
        title: "Spacious 2-Bedroom Flat",
        description: "Perfect for roommates, close to public transport.",
        price: 2000,
        location: "San Francisco, CA",
        imageUrl:
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tags: ["2 Bedrooms", "1 Bathroom", "Balcony"],
        amenities: ["Wi-Fi", "Air Conditioning", "Parking"],
    },
    {
        id: 3,
        title: "Luxury Condo with View",
        description: "Stunning views and premium facilities.",
        price: 3500,
        location: "Miami, FL",
        imageUrl:
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/b49bf469697403.5b8a353d1b1ad.jpg",
        tags: ["3 Bedrooms", "2 Bathrooms", "Swimming Pool"],
        amenities: ["Wi-Fi", "Air Conditioning", "Gym", "Pool"],
    },
];

const ListingPage = ({ isDarkMode, setIsDarkMode }) => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // For listing modal
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // For logout modal
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

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
                showModal={() => setIsLogoutModalOpen(true)}
                showDrawer={showDrawer}
                isDrawerOpen={isDrawerOpen}
                closeDrawer={closeDrawer}
            />
            <Content
                style={{
                    padding: isSmallScreen ? "16px" : "32px",
                    background: isDarkMode ? "#1f1f1f" : "#fff",
                    color: isDarkMode ? "#fff" : "#000",
                    minHeight: "calc(100vh - 64px)",
                }}
            >
                {/* Buttons Section */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={buttonVariants}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "24px",
                        marginBottom: "32px",
                        flexWrap: "wrap",
                    }}
                    className="py-5"
                >
                    <Button
                        type="primary"
                        size="large"
                        onClick={() => setIsModalOpen(true)}
                        style={{
                            width: isSmallScreen ? "100%" : "300px",
                            height: "60px",
                            fontSize: "18px",
                            background: isDarkMode ? "#1890ff" : "#131D4F",
                            borderColor: isDarkMode ? "#1890ff" : "#131D4F",
                        }}
                    >
                        List a Flat
                    </Button>
                </motion.div>

                {/* Listed Flats Section */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={buttonVariants}
                >
                    <h2
                        style={{
                            textAlign: "center",
                            marginBottom: "24px",
                            color: isDarkMode ? "#fff" : "#000",
                            fontFamily: "Nunito Sans, sans-serif",
                        }}
                        className="text-[24px] md:text-[30px] lg:text-[44px] pb-6"
                    >
                        Flats Listed by Others
                    </h2>
                    <Row gutter={[16, 16]}>
                        {mockFlats.map((flat, index) => (
                            <FlatCard
                                key={flat.id}
                                isDarkMode={isDarkMode}
                                flat={flat}
                                index={index}
                                cardVariants={cardVariants}
                            />
                        ))}
                    </Row>
                </motion.div>

                <ListingFormModal
                    isDarkMode={isDarkMode}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    form={form}
                    modalVariants={modalVariants}
                />

                <LogoutModal
                    isDarkMode={isDarkMode}
                    isLogoutModalOpen={isLogoutModalOpen}
                    setIsLogoutModalOpen={setIsLogoutModalOpen}
                    navigate={navigate}
                    modalVariants={modalVariants}
                />
            </Content>
        </Layout>
    );
};

export default ListingPage;
