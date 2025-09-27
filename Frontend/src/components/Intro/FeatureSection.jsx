import { Card, Typography, Row, Col } from "antd";
import { motion } from "framer-motion";

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

const FeatureSection = ({ isDarkMode }) => {
    return (
        <motion.section
            className={`py-44 px-4 ${
                isDarkMode ? "bg-gray-800" : "bg-white"
            } relative background-image-container`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
        >
            <div className="container mx-auto relative z-20">
                <motion.div variants={fadeIn} className="text-center mb-12">
                    <Title
                        level={2}
                        style={{
                            fontFamily: "Roboto",
                            fontWeight: "bold",
                            color: "#030712",
                        }}
                        className={
                            "!text-3xl md:!text-4xl lg:!text-5xl font-bold text-gray-950"
                        }
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
                            <motion.div variants={fadeIn} className="w-full">
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
                        z-index: 10;
                        background-blend-mode: overlay;
                    }
                    .ant-card {
                        background: inherit !important;
                    }
                `}
            </style>
        </motion.section>
    );
};

export default FeatureSection;
