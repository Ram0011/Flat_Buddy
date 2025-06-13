import { Carousel, Typography } from "antd";
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

const TestimonialSection = ({ isDarkMode }) => {
    return (
        <motion.section
            className={`py-36 px-4 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
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
    );
};

export default TestimonialSection;
