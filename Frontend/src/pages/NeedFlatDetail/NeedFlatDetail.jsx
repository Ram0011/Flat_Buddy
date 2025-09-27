import React, { useEffect, useState } from "react";
import {
    ConfigProvider,
    theme,
    Button,
    Row,
    Col,
    Carousel,
    Layout,
    Modal,
    message,
} from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import HeaderComponent from "../../components/Navbar/HomeNavbar";
import FooterComponent from "../../components/Home/FooterComponent";

const { defaultAlgorithm, darkAlgorithm } = theme;
const { Content } = Layout;

const NeedFlatDetail = ({ isDarkMode, setIsDarkMode }) => {
    const { propertyid } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    // 🔹 For Interest Modal
    const [isInterestModalOpen, setIsInterestModalOpen] = useState(false);

    // 🔹 For Logout Modal
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    // show contact
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/properties/${propertyid}`)
            .then((response) => {
                const data = response.data;
                setProperty({
                    ...data,
                    price: `₹${data.rent}/month`,
                    amenities: data.amenities ? data.amenities.split(",") : [],
                    photoUrls: data.photoUrls || [],
                    preferences: data.preferences || [],
                });
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching property details:", err);
                setLoading(false);
            });
    }, [propertyid]);

    // 🔹 Show Interest Modal
    const showInterestModal = () => {
        // setIsInterestModalOpen(true);
        message.warning("Under developement");
    };

    const handleInterestOk = async () => {
        const userid = localStorage.getItem("userId");
        try {
            const response = await axios.post(
                "http://localhost:8080/api/properties/interested",
                {
                    userid,
                    propid: parseInt(propertyid),
                }
            );
            message.success(response.data);
            setIsInterestModalOpen(false);
        } catch (err) {
            if (err.response) {
                if (
                    err.response.data ===
                    "Failed to register interest: User has already shown interest in this property."
                ) {
                    message.warning("Already shown interest");
                } else if (err.response.status === 400) {
                    message.error(err.response.data);
                } else {
                    message.error(
                        "Failed to register interest: " + err.response.data
                    );
                }
            } else {
                message.error("Network error occurred. Please try again.");
            }
        }
    };

    const handleInterestCancel = () => {
        setIsInterestModalOpen(false);
    };

    // 🔹 Logout Modal
    const showLogoutModal = () => {
        setIsLogoutModalOpen(true);
    };

    const handleLogoutOk = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("roleId");
        localStorage.removeItem("userId");
        setIsLogoutModalOpen(false);
        setTimeout(() => navigate("/login"), 0);
    };

    const handleLogoutCancel = () => {
        setIsLogoutModalOpen(false);
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 },
        },
    };

    if (loading) return <div>Loading...</div>;
    if (!property) return <div>Property not found</div>;

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
                    background: isDarkMode ? "#1e3a8a" : "#fff",
                }}
            >
                <HeaderComponent
                    isDarkMode={isDarkMode}
                    setIsDarkMode={setIsDarkMode}
                    isSmallScreen={isSmallScreen}
                    showModal={showLogoutModal} // 🔹 Pass logout modal trigger
                    showDrawer={() => {}}
                    isDrawerOpen={false}
                    closeDrawer={() => {}}
                />

                <Content
                    className="p-6"
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
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp}>
                            <h2 className="text-4xl font-bold mb-6 text-center">
                                {property.location}
                            </h2>
                            <Carousel autoplay dotPosition="bottom">
                                {property.photoUrls.map((url, index) => (
                                    <div key={index}>
                                        <img
                                            src={url}
                                            alt={`Property ${index}`}
                                            className="w-full h-96 object-cover rounded-lg"
                                        />
                                    </div>
                                ))}
                            </Carousel>
                        </motion.div>

                        <motion.div
                            variants={fadeInUp}
                            className={`mt-8 p-6 rounded-lg shadow-md ${
                                isDarkMode ? "bg-gray-600" : "bg-gray-100"
                            }`}
                        >
                            <h3 className="text-3xl font-semibold mb-4">
                                Details
                            </h3>
                            <Row gutter={[24, 24]}>
                                <Col span={12}>
                                    <p className="text-xl">
                                        <strong>Price:</strong> {property.price}
                                    </p>
                                    <p className="text-xl mt-2">
                                        <strong>Type:</strong>{" "}
                                        {property.flatType}
                                    </p>
                                    <p className="text-xl mt-2">
                                        <strong>Capacity:</strong>{" "}
                                        {property.capacity}
                                    </p>
                                </Col>
                                <Col span={12}>
                                    <p className="text-xl">
                                        <strong>Amenities:</strong>{" "}
                                        {property.amenities.join(", ") || "N/A"}
                                    </p>
                                    {property.preferences.length > 0 && (
                                        <p className="text-xl mt-2">
                                            <strong>Preferences:</strong>{" "}
                                            {property.preferences.join(", ")}
                                        </p>
                                    )}
                                </Col>
                            </Row>
                        </motion.div>

                        <motion.div
                            variants={fadeInUp}
                            className="mt-8 text-center flex justify-center gap-4"
                        >
                            <Button
                                type="primary"
                                size="large"
                                onClick={showInterestModal}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                Show Interest
                            </Button>

                            <Button
                                type="default"
                                size="large"
                                onClick={() => setIsContactModalOpen(true)}
                                className="border-blue-600 text-blue-600 hover:bg-blue-50"
                            >
                                Get Contact
                            </Button>
                        </motion.div>
                    </motion.div>
                </Content>

                <FooterComponent isDarkMode={isDarkMode} />

                {/* 🔹 Show Interest Modal */}
                <Modal
                    title="Confirm Interest"
                    open={isInterestModalOpen}
                    onOk={handleInterestOk}
                    onCancel={handleInterestCancel}
                >
                    <p>
                        Are you sure you want to show interest in this property?
                    </p>
                </Modal>

                {/* 🔹 Contact Owner Modal */}
                <Modal
                    title="Owner Contact Details"
                    open={isContactModalOpen}
                    onOk={() => setIsContactModalOpen(false)}
                    onCancel={() => setIsContactModalOpen(false)}
                    footer={[
                        <Button
                            key="close"
                            type="primary"
                            onClick={() => setIsContactModalOpen(false)}
                        >
                            Close
                        </Button>,
                    ]}
                >
                    {property.user ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="p-4 rounded-lg shadow-md bg-gray-50 dark:bg-gray-700"
                        >
                            <p className="text-lg">
                                <strong>Name:</strong> {property.user.uname}
                            </p>
                            <p className="text-lg mt-2">
                                <strong>Email:</strong> {property.user.emailid}
                            </p>
                            <p className="text-lg mt-2">
                                <strong>Contact:</strong>{" "}
                                {property.user.contactno}
                            </p>
                            <p className="text-lg mt-2">
                                <strong>Profession:</strong>{" "}
                                {property.user.profession}
                            </p>
                        </motion.div>
                    ) : (
                        <p>No owner information available.</p>
                    )}
                </Modal>

                {/* 🔹 Logout Modal */}
                <Modal
                    title="Confirm Logout"
                    open={isLogoutModalOpen}
                    onOk={handleLogoutOk}
                    onCancel={handleLogoutCancel}
                >
                    <p>Are you sure you want to logout?</p>
                </Modal>
            </Layout>
        </ConfigProvider>
    );
};

export default NeedFlatDetail;
