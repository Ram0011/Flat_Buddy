import { Button, Typography, Card, Carousel, Row, Col } from "antd";
import { motion } from "framer-motion";
import {
    ArrowRightOutlined,
    MoonOutlined,
    SunOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Switch } from "antd";
import FooterComponent from "../../components/Home/FooterComponent";

const { Title, Paragraph } = Typography;

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

// Feature data
const features = [
    {
        title: "Find Your Perfect Flat",
        description:
            "Browse a wide range of flats with detailed listings and high-quality images.",
        icon: "🏠",
    },
    {
        title: "Match with Roommates",
        description:
            "Connect with roommates based on preferences like smoking, pets, or lifestyle.",
        icon: "👥",
    },
    {
        title: "Easy Filtering",
        description:
            "Filter flats and roommates by budget, location, pets, smoking, and more.",
        icon: "🔍",
    },
];

// How It Works data
const steps = [
    {
        title: "Search",
        description: "Enter your location, budget, and preferences.",
        icon: "🔎",
    },
    {
        title: "Filter",
        description: "Narrow down options with our smart filters.",
        icon: "⚙️",
    },
    {
        title: "Connect",
        description: "Contact owners or roommates directly.",
        icon: "📞",
    },
];

// Testimonial data
const testimonials = [
    {
        name: "Priya Sharma",
        quote: "Found a pet-friendly flat in Mumbai within a week! The filters made it so easy.",
    },
    {
        name: "Arjun Patel",
        quote: "Matched with a non-smoking roommate who loves gaming. Smart Rentals is a lifesaver!",
    },
    {
        name: "Neha Gupta",
        quote: "The platform is user-friendly, and I love the detailed listings.",
    },
];

const IntroPage = ({ isDarkMode, setIsDarkMode }) => {
    const navigate = useNavigate();

    const handleToggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div
            className={`flex flex-col min-h-screen ${
                isDarkMode ? "bg-gray-900" : "bg-gray-50"
            }`}
        >
            {/* Header */}
            <header
                className={`${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                } shadow-md py-4 px-4`} // Non-fixed navbar
                style={{ backgroundColor: "#131D4F" }}
            >
                <div className="container mx-auto flex justify-between items-center">
                    <div
                        className="flex items-center"
                        onClick={() => navigate("/")}
                    >
                        <img
                            src="/logo.svg"
                            alt="Smart Rentals Logo"
                            className="h-8 mr-2"
                        />
                        <h1
                            level={4}
                            style={{
                                fontFamily:
                                    "Edu NSW ACT Hand Prescript, cursive",
                                color: "white",
                            }}
                            className="text-2xl"
                        >
                            Smart Rentals
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-white">
                            {isDarkMode ? "Dark Mode" : "Light Mode"}
                        </span>
                        <Switch
                            checked={isDarkMode}
                            onChange={handleToggleDarkMode}
                            checkedChildren={<MoonOutlined />}
                            unCheckedChildren={<SunOutlined />}
                        />
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <motion.section
                className={`${
                    isDarkMode
                        ? "bg-gradient-to-b from-gray-800 to-gray-600"
                        : "#ebf8ff"
                } bg-sky-50 py-44 px-4 mt-16`}
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
            >
                <div className="container mx-auto text-center">
                    <motion.div
                        variants={fadeIn}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1 }}
                        className="text-4xl md:text-6xl mb-4"
                    >
                        <motion.h1
                            className={`text-custom md:text-5xl lg:text-6xl mb-1 ${
                                isDarkMode
                                    ? "text-white"
                                    : "bg-gradient-to-r from-blue-950 to-sky-800 bg-clip-text text-transparent"
                            }`}
                            style={{
                                fontFamily: "Roboto, sans-serif",
                                fontWeight: "bold",
                                textAlign: "center",
                                textShadow: isDarkMode
                                    ? "1px 1px 2px rgba(0, 0, 0, 0.5)"
                                    : "none",
                            }}
                        >
                            Welcome to Smart Rentals
                        </motion.h1>
                    </motion.div>
                    <motion.div variants={fadeIn}>
                        <p
                            className="text-lg md:text-2xl mb-8 max-w-2xl mx-auto"
                            style={{
                                fontFamily: "Roboto, sans-serif",
                                fontWeight: 300,
                            }}
                        >
                            Discover your dream flat or perfect roommate with
                            ease. Filter by budget, location, pets, smoking, and
                            more on our rental platform.
                        </p>
                    </motion.div>
                    <motion.div
                        variants={fadeIn}
                        className="flex gap-4 justify-center"
                    >
                        <Button
                            type="primary"
                            size="large"
                            icon={<ArrowRightOutlined />}
                            onClick={() => navigate("/home")}
                        >
                            Explore Listings
                        </Button>
                        <Button
                            type="default"
                            size="large"
                            onClick={() => navigate("/signup")}
                            className={
                                isDarkMode
                                    ? "bg-gray-700 text-white"
                                    : "bg-white text-blue-600"
                            }
                        >
                            Sign Up
                        </Button>
                    </motion.div>
                </div>
            </motion.section>

            {/* Feature Section */}
            <motion.section
                className={`py-36 px-4 ${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                } relative background-image-container`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
            >
                <div className="container mx-auto relative z-20">
                    {" "}
                    {/* Increased z-index for content */}
                    <motion.div variants={fadeIn} className="text-center mb-12">
                        <Title
                            level={2}
                            style={{ fontFamily: "Roboto", fontWeight: "bold" }}
                            className={`!text-3xl md:!text-4xl lg:!text-5xl font-bold ${
                                isDarkMode ? "text-white" : "text-gray-950"
                            }`}
                        >
                            Why Choose Smart Rentals?
                        </Title>
                    </motion.div>
                    <Row
                        gutter={[16, 16]}
                        justify="center"
                        className="flex flex-wrap lg:flex-nowrap"
                    >
                        {features.map((feature, index) => (
                            <Col
                                key={index}
                                xs={24}
                                sm={24}
                                md={8}
                                lg={8}
                                xl={8}
                                className="flex"
                            >
                                <motion.div
                                    variants={fadeIn}
                                    className="w-full"
                                >
                                    <Card
                                        hoverable
                                        className="h-full text-center w-full"
                                        variant="outlined"
                                        styles={{
                                            body: {
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                padding: "24px",
                                                background: isDarkMode
                                                    ? "#3a3a3a"
                                                    : "#f5f5f5",
                                                opacity: 1,
                                            },
                                        }}
                                    >
                                        <span className="text-4xl mb-4">
                                            {feature.icon}
                                        </span>
                                        <Title
                                            level={4}
                                            style={{ fontFamily: "Roboto" }}
                                            className={
                                                isDarkMode
                                                    ? "text-white"
                                                    : "text-gray-800"
                                            }
                                        >
                                            {feature.title}
                                        </Title>
                                        <Paragraph
                                            className={
                                                isDarkMode
                                                    ? "text-gray-400"
                                                    : "text-gray-600"
                                            }
                                        >
                                            {feature.description}
                                        </Paragraph>
                                    </Card>
                                </motion.div>
                            </Col>
                        ))}
                    </Row>
                </div>
                <style>
                    {`
            .background-image-container::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-image: url('https://i.pinimg.com/originals/e0/83/b6/e083b6aeb140ffc8e32e95fac0e35096.jpg');
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
                filter: blur(8px);
                z-index: 10; /* Lower z-index for background */
                background-blend-mode: overlay;
            }
            .ant-card {
                background: inherit !important; /* Prevent card inheriting section background */
            }
        `}
                </style>
            </motion.section>

            {/* How It Works Section */}
            <motion.section
                className={`py-36 px-4 ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
            >
                <div className="container mx-auto">
                    <motion.div variants={fadeIn} className="text-center mb-12">
                        <Title
                            level={2}
                            style={{ fontFamily: "Roboto", fontWeight: "bold" }}
                            className={`!text-3xl md:!text-3xl lg:!text-5xl font-bold pb-10 ${
                                isDarkMode ? "text-white" : "text-gray-800"
                            }`}
                        >
                            How It Works
                        </Title>
                    </motion.div>
                    <Row
                        gutter={[16, 16]}
                        justify="center"
                        className="flex flex-wrap lg:flex-nowrap"
                    >
                        {steps.map((step, index) => (
                            <Col
                                key={index}
                                xs={24}
                                sm={24}
                                md={8}
                                lg={8}
                                xl={8}
                                className="flex"
                            >
                                <motion.div
                                    variants={fadeIn}
                                    className="text-center w-full"
                                >
                                    <div
                                        className={`text-5xl mb-4 ${
                                            isDarkMode
                                                ? "text-white"
                                                : "text-gray-800"
                                        }`}
                                    >
                                        {step.icon}
                                    </div>
                                    <Title
                                        level={4}
                                        style={{ fontFamily: "Roboto" }}
                                        className={
                                            isDarkMode
                                                ? "text-white"
                                                : "text-gray-800"
                                        }
                                    >
                                        {step.title}
                                    </Title>
                                    <Paragraph
                                        className={
                                            isDarkMode
                                                ? "text-gray-400"
                                                : "text-gray-600"
                                        }
                                    >
                                        {step.description}
                                    </Paragraph>
                                </motion.div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </motion.section>

            {/* Testimonial Section */}
            <motion.section
                className={`py-36 px-4 ${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                }`}
                style={{ minHeight: "480px" }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
            >
                <div className="container mx-auto">
                    <motion.div variants={fadeIn} className="text-center mb-12">
                        <Title
                            level={1}
                            style={{
                                fontFamily: "Roboto",
                                fontWeight: "bold",
                                fontSize: "2.75rem",
                            }}
                            className={`!text-4xl md:!text-5xl ${
                                isDarkMode ? "text-white" : "text-gray-800"
                            }`}
                        >
                            What Our Users Say
                        </Title>
                    </motion.div>
                    <Carousel
                        autoplay
                        dotPosition="bottom"
                        className="max-w-2xl mx-auto"
                        style={{ color: isDarkMode ? "#fff" : "#000" }}
                    >
                        {testimonials.map((testimonial, index) => (
                            <div key={index}>
                                <motion.div
                                    variants={fadeIn}
                                    className="text-center p-4"
                                >
                                    <Paragraph
                                        className={`text-lg italic mb-4 ${
                                            isDarkMode
                                                ? "text-gray-300"
                                                : "text-gray-600"
                                        }`}
                                    >
                                        "{testimonial.quote}"
                                    </Paragraph>
                                    <Title
                                        level={5}
                                        style={{ fontFamily: "Roboto" }}
                                        className={
                                            isDarkMode
                                                ? "text-white"
                                                : "text-gray-800"
                                        }
                                    >
                                        - {testimonial.name}
                                    </Title>
                                </motion.div>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </motion.section>

            {/* Footer */}
            <FooterComponent
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
            />
        </div>
    );
};

export default IntroPage;
