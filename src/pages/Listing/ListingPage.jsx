import { useState, useEffect } from "react";
import {
    Layout,
    Button,
    Modal,
    Form,
    Input,
    InputNumber,
    Card,
    Row,
    Col,
    message,
} from "antd";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../../components/Login/HeaderComponent";

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
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
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
    },
    {
        id: 2,
        title: "Spacious 2-Bedroom Flat",
        description: "Perfect for roommates, close to public transport.",
        price: 2000,
        location: "San Francisco, CA",
        imageUrl:
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 3,
        title: "Luxury Condo with View",
        description: "Stunning views and premium facilities.",
        price: 3500,
        location: "Miami, FL",
        imageUrl:
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/b49bf469697403.5b8a353d1b1ad.jpg",
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

    // Listing modal handlers
    const showListingModal = () => {
        setIsModalOpen(true);
    };

    const handleModalOk = () => {
        form.validateFields()
            .then((values) => {
                // Simulate saving the listing (no backend)
                console.log("New Listing:", values);
                message.success("Flat listed successfully!");
                form.resetFields();
                setIsModalOpen(false);
            })
            .catch((info) => {
                console.log("Validation Failed:", info);
            });
    };

    const handleModalCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

    // Logout modal handlers
    const showLogoutModal = () => {
        setIsLogoutModalOpen(true);
    };

    const handleLogoutOk = () => {
        setIsLogoutModalOpen(false);
        message.info("Logged out successfully");
        navigate("/login");
    };

    const handleLogoutCancel = () => {
        setIsLogoutModalOpen(false);
    };

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
                        onClick={showListingModal}
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
                        {mockFlats.map((flat) => (
                            <Col xs={24} sm={12} md={8} key={flat.id}>
                                <motion.div variants={cardVariants}>
                                    <Card
                                        hoverable
                                        cover={
                                            <img
                                                alt={flat.title}
                                                src={flat.imageUrl}
                                                style={{
                                                    height: "200px",
                                                    objectFit: "cover",
                                                    borderTopLeftRadius: "8px",
                                                    borderTopRightRadius: "8px",
                                                }}
                                            />
                                        }
                                        style={{
                                            background: isDarkMode
                                                ? "#2f2f2f"
                                                : "#fff",
                                            color: isDarkMode ? "#fff" : "#000",
                                            borderRadius: "8px",
                                            overflow: "hidden",
                                        }}
                                        title={
                                            <h3
                                                className="text-lg sm:text-lg md:text-xl lg:text-2xl font-extralight"
                                                style={{
                                                    color: isDarkMode
                                                        ? "#fff"
                                                        : "#000",
                                                    margin: 0,
                                                    fontFamily:
                                                        "Nunito Sans, sans-serif",
                                                }}
                                            >
                                                {flat.title}
                                            </h3>
                                        }
                                    >
                                        <p>{flat.description}</p>
                                        <p>
                                            <strong>Price:</strong> $
                                            {flat.price}/month
                                        </p>
                                        <p>
                                            <strong>Location:</strong>{" "}
                                            {flat.location}
                                        </p>
                                    </Card>
                                </motion.div>
                            </Col>
                        ))}
                    </Row>
                </motion.div>

                {/* Modal for Listing a Flat */}
                <motion.div
                    variants={modalVariants}
                    initial="hidden"
                    animate={isModalOpen ? "visible" : "hidden"}
                >
                    <Modal
                        title="List a New Flat"
                        open={isModalOpen}
                        onOk={handleModalOk}
                        onCancel={handleModalCancel}
                        okText="Submit"
                        cancelText="Cancel"
                        style={{ background: isDarkMode ? "#2f2f2f" : "#fff" }}
                    >
                        <Form
                            form={form}
                            layout="vertical"
                            style={{ color: isDarkMode ? "#fff" : "#000" }}
                        >
                            <Form.Item
                                name="title"
                                label="Title"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter the title",
                                    },
                                ]}
                            >
                                <Input placeholder="e.g., Cozy Studio in Downtown" />
                            </Form.Item>
                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter a description",
                                    },
                                ]}
                            >
                                <Input.TextArea
                                    rows={4}
                                    placeholder="Describe the flat..."
                                />
                            </Form.Item>
                            <Form.Item
                                name="price"
                                label="Price ($/month)"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter the price",
                                    },
                                ]}
                            >
                                <InputNumber
                                    min={0}
                                    style={{ width: "100%" }}
                                    placeholder="e.g., 1200"
                                />
                            </Form.Item>
                            <Form.Item
                                name="location"
                                label="Location"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter the location",
                                    },
                                ]}
                            >
                                <Input placeholder="e.g., New York, NY" />
                            </Form.Item>
                        </Form>
                    </Modal>
                </motion.div>

                {/* Modal for Logout Confirmation */}
                <motion.div
                    variants={modalVariants}
                    initial="hidden"
                    animate={isLogoutModalOpen ? "visible" : "hidden"}
                >
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
                </motion.div>
            </Content>
        </Layout>
    );
};

export default ListingPage;
