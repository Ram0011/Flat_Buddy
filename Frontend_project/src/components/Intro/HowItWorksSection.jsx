import { Card, Typography, Row, Col } from "antd";
import { motion } from "framer-motion";

const { Title, Paragraph } = Typography;

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

const steps = [
    {
        title: "Search",
        description:
            "Effortlessly input your preferred location, budget, and specific requirements to discover the perfect living space.",
        icon: "🔍",
    },
    {
        title: "Filter",
        description:
            "Use smart filters to refine listings by amenities, preferences, and compatibility for easy decision-making.",
        icon: "⚙️",
    },
    {
        title: "Connect",
        description:
            "Directly contact property owners or roommates to finalize arrangements confidently and conveniently.",
        icon: "📞",
    },
    {
        title: "Find Roommate",
        description:
            "Match with compatible roommates by lifestyle and preferences to ensure a peaceful living experience.",
        icon: "👥",
    },
];

const HowItWorksSection = ({ isDarkMode }) => {
    return (
        <motion.section
            className={`py-36 px-4 ${
                isDarkMode ? "bg-gray-900" : "bg-gray-100"
            }`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
        >
            <div className="container mx-auto">
                <motion.div variants={fadeIn} className="text-center mb-16">
                    <Title
                        level={2}
                        style={{
                            fontFamily: "Roboto",
                            fontWeight: "bold",
                            color: isDarkMode ? "#ffffff" : "#030712",
                        }}
                        className="!text-3xl md:!text-4xl lg:!text-5xl font-bold"
                    >
                        How It Works
                    </Title>
                </motion.div>

                <Row
                    gutter={[24, 24]}
                    justify="center"
                    className="flex flex-wrap"
                >
                    {steps.map((step, index) => (
                        <Col
                            key={index}
                            xs={24}
                            sm={12}
                            md={12}
                            lg={6}
                            xl={6}
                            className="flex"
                        >
                            <motion.div
                                variants={fadeIn}
                                className="w-full h-full"
                            >
                                <Card
                                    hoverable
                                    className="h-full text-center w-full shadow-md"
                                    styles={{
                                        body: {
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            padding: "24px",
                                            minHeight: "280px",
                                            background: isDarkMode
                                                ? "#3a3a3a"
                                                : "#f5f5f5",
                                        },
                                    }}
                                >
                                    <span className="text-4xl mb-4">
                                        {step.icon}
                                    </span>
                                    <Title
                                        level={4}
                                        style={{
                                            fontFamily: "Roboto",
                                            color: isDarkMode
                                                ? "#fff"
                                                : "#1f2937",
                                        }}
                                    >
                                        {step.title}
                                    </Title>
                                    <Paragraph
                                        style={{
                                            color: isDarkMode
                                                ? "#d1d5db"
                                                : "#4b5563",
                                        }}
                                    >
                                        {step.description}
                                    </Paragraph>
                                </Card>
                            </motion.div>
                        </Col>
                    ))}
                </Row>
            </div>
        </motion.section>
    );
};

export default HowItWorksSection;
