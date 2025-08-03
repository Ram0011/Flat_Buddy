import { Carousel, Typography } from "antd";
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
            className="relative w-full"
            style={{ minHeight: "600px" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
        >
            {/* Background Image with Blur and Conditional Brightness */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    filter: isDarkMode
                        ? "blur(8px)"
                        : "blur(8px) brightness(1.2)",
                }}
            />

            {/* Foreground Content */}
            <div className="relative z-10 px-4 pt-36 pb-36">
                <div className="container mx-auto">
                    <motion.div variants={fadeIn} className="text-center mb-12">
                        <h1
                            style={{
                                fontFamily: "Roboto",
                                fontWeight: "bold",
                                fontSize: "2.75rem",
                                textShadow: !isDarkMode
                                    ? "1px 1px 3px rgba(0, 0, 0, 0.3)"
                                    : "none",
                                paddingBottom: "2.5rem",
                            }}
                            className={`!text-4xl md:!text-5xl px ${
                                isDarkMode
                                    ? "text-white"
                                    : "bg-gradient-to-r from-gray-100 via-gray-400 bg-clip-text inline-block"
                            }`}
                        >
                            What Our Users Say
                        </h1>
                    </motion.div>

                    <Carousel
                        autoplay
                        dotPosition="bottom"
                        className="max-w-2xl mx-auto"
                    >
                        {testimonials.map((testimonial, index) => (
                            <div key={index}>
                                <motion.div
                                    variants={fadeIn}
                                    className="text-center px-6"
                                >
                                    <Paragraph
                                        className={` italic mb-4 ${
                                            isDarkMode
                                                ? "text-gray-100"
                                                : "text-gray-100"
                                        }`}
                                        style={{
                                            textShadow: !isDarkMode
                                                ? "1px 1px 3px rgba(0, 0, 0, 0.3)"
                                                : "none",
                                            fontSize: "1.25rem",
                                            lineHeight: "1.6",
                                            color: "white",
                                        }}
                                    >
                                        "{testimonial.quote}"
                                    </Paragraph>
                                    <Title
                                        level={5}
                                        style={{
                                            fontFamily: "Roboto",
                                            textShadow: !isDarkMode
                                                ? "1px 1px 3px rgba(0, 0, 0, 0.3)"
                                                : "none",
                                            paddingBottom: "3rem",
                                            color: "white",
                                        }}
                                        className={
                                            isDarkMode
                                                ? "text-white"
                                                : "text-white"
                                        }
                                    >
                                        - {testimonial.name}
                                    </Title>
                                </motion.div>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        </motion.section>
    );
};

export default TestimonialSection;
