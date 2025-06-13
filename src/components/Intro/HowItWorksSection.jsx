import { Typography, Row, Col } from "antd";
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

const HowItWorksSection = ({ isDarkMode }) => {
    return (
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
    );
};

export default HowItWorksSection;
