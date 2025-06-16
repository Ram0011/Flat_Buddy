import React, { useEffect, useState } from "react";
import { ConfigProvider, theme, Layout, Row, Col, Typography } from "antd";
import { motion } from "framer-motion";
import HeaderComponent from "../../components/Navbar/HomeNavbar.jsx";
import FooterComponent from "../../components/Home/FooterComponent.jsx";
import RoommateFilters from "../../components/Roommates/RoommateFilters.jsx";
import RoommateCard from "../../components/Roommates/RoommateCard.jsx";
import RoommateModals from "../../components/Roommates/RoommateModals.jsx";
import { useNavigate } from "react-router-dom";

const { defaultAlgorithm, darkAlgorithm } = theme;
const { Content } = Layout;
const { Text } = Typography;

// Animation variants
const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const filterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, staggerChildren: 0.1, delayChildren: 0.2 },
    },
};

const filterItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, delay: i * 0.1 + 0.4 },
    }),
};

const avatarVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.4, delay: 0.2 },
    },
};

const buttonVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.2, delay: 0.2 },
    },
};

const RoommatesPage = ({ isDarkMode, setIsDarkMode }) => {
    const navigate = useNavigate();
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [contactModalOpen, setContactModalOpen] = useState(false);
    const [selectedRoommate, setSelectedRoommate] = useState(null);
    const [filters, setFilters] = useState({
        smoking: "",
        drinking: "",
        pets: "",
        gender: "",
    });

    // Mock roommate data (replace with API call in production)
    const [roommates, setRoommates] = useState([
        {
            id: 1,
            name: "Alice Smith",
            age: 25,
            gender: "Female",
            smoking: "No",
            drinking: "Occasionally",
            pets: "Yes (Cat)",
            phoneNumber: "+1-555-123-4567",
        },
        {
            id: 2,
            name: "Bob Johnson",
            age: 30,
            gender: "Male",
            smoking: "Yes",
            drinking: "No",
            pets: "No",
            phoneNumber: "+1-555-234-5678",
        },
        {
            id: 3,
            name: "Carol Lee",
            age: 28,
            gender: "Female",
            smoking: "No",
            drinking: "Yes",
            pets: "Yes (Dog)",
            phoneNumber: "+1-555-345-6789",
        },
        {
            id: 4,
            name: "David Brown",
            age: 27,
            gender: "Male",
            smoking: "No",
            drinking: "Occasionally",
            pets: "No",
            phoneNumber: "+1-555-456-7890",
        },
    ]);

    // Handle screen resize for responsive design
    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Handle drawer for mobile menu
    const showDrawer = () => {
        setIsDrawerOpen(true);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };

    // Handle contact modal
    const showContactModal = (roommate) => {
        setSelectedRoommate(roommate);
        setContactModalOpen(true);
    };

    // Handle modal for logout
    const showModal = () => {
        setIsModalOpen(true);
    };

    // Apply filters (mock filtering logic)
    const filteredRoommates = roommates.filter((roommate) => {
        return (
            (filters.smoking === "" || roommate.smoking === filters.smoking) &&
            (filters.drinking === "" ||
                roommate.drinking === filters.drinking) &&
            (filters.pets === "" || roommate.pets === filters.pets) &&
            (filters.gender === "" || roommate.gender === filters.gender)
        );
    });

    return (
        <ConfigProvider
            theme={{
                algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
            }}
        >
            <Layout
                style={{
                    minHeight: "100vh",
                    width: "100vw",
                    overflow: "hidden",
                }}
            >
                <HeaderComponent
                    isDarkMode={isDarkMode}
                    setIsDarkMode={setIsDarkMode}
                    isSmallScreen={isSmallScreen}
                    showModal={showModal}
                    showDrawer={showDrawer}
                    isDrawerOpen={isDrawerOpen}
                    closeDrawer={closeDrawer}
                />
                <Content
                    className="p-4"
                    style={{
                        background: isDarkMode ? "#1f1f1f" : "#fff",
                        color: isDarkMode ? "#fff" : "#000",
                        paddingTop: "20px",
                        overflow: "auto",
                        boxSizing: "border-box",
                        maxWidth: "100%",
                    }}
                >
                    <motion.div
                        variants={pageVariants}
                        initial="hidden"
                        animate="visible"
                        className="max-w-7xl mx-auto pb-12"
                    >
                        <h1
                            className={`text-center text-3xl md:text-4xl lg:text-5xl ${
                                isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                            style={{
                                paddingBottom: "5rem",
                                paddingTop: "2rem",
                                fontWeight: "bold",
                            }}
                        >
                            Find Your Perfect Roommate
                        </h1>

                        <RoommateFilters
                            isDarkMode={isDarkMode}
                            filters={filters}
                            setFilters={setFilters}
                            filterVariants={filterVariants}
                            filterItemVariants={filterItemVariants}
                        />

                        <Row gutter={[16, 16]}>
                            {filteredRoommates.length > 0 ? (
                                filteredRoommates.map((roommate, index) => (
                                    <RoommateCard
                                        key={roommate.id}
                                        isDarkMode={isDarkMode}
                                        roommate={roommate}
                                        index={index}
                                        showContactModal={showContactModal}
                                        cardVariants={cardVariants}
                                        avatarVariants={avatarVariants}
                                        buttonVariants={buttonVariants}
                                    />
                                ))
                            ) : (
                                <Col span={24} className="text-center">
                                    <Text
                                        className={
                                            isDarkMode
                                                ? "text-gray-300"
                                                : "text-gray-700"
                                        }
                                    >
                                        No roommates match your filters.
                                    </Text>
                                </Col>
                            )}
                        </Row>
                    </motion.div>
                </Content>
                <FooterComponent
                    isDarkMode={isDarkMode}
                    setIsDarkMode={setIsDarkMode}
                />
                <RoommateModals
                    isDarkMode={isDarkMode}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    contactModalOpen={contactModalOpen}
                    setContactModalOpen={setContactModalOpen}
                    selectedRoommate={selectedRoommate}
                    setSelectedRoommate={setSelectedRoommate}
                    navigate={navigate}
                />
            </Layout>
        </ConfigProvider>
    );
};

export default RoommatesPage;
