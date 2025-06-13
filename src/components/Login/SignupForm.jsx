import { Form, Input, Button } from "antd";
import { motion } from "framer-motion";
import axios from "axios";
import { message } from "antd";

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

const SignupForm = ({ isDarkMode, setLoading, loading }) => {
    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:3000/signup", {
                userId: values.userId,
                password: values.password,
                userName: values.userName,
            });
            if (response.data.success) {
                message.success("Sign up successful! Please log in.");
                document.getElementById("signup-form").reset();
            } else {
                message.error(response.data.message || "Sign up failed.");
            }
        } catch (error) {
            message.error("Sign up failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
        >
            <Form
                id="signup-form"
                name="signup"
                onFinish={onFinish}
                style={{
                    width: "100%",
                    padding: "0 16px",
                }}
            >
                <motion.div variants={fadeIn}>
                    <Form.Item
                        name="userId"
                        rules={[
                            {
                                required: true,
                                message: "Please input your User ID!",
                            },
                        ]}
                    >
                        <Input
                            placeholder="User ID"
                            className="text-base md:text-lg"
                            style={{
                                fontFamily: "Indie Flower, cursive",
                            }}
                        />
                    </Form.Item>
                </motion.div>
                <motion.div variants={fadeIn}>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Password!",
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder="Password"
                            className="text-base md:text-lg"
                            style={{
                                fontFamily: "Indie Flower, cursive",
                            }}
                        />
                    </Form.Item>
                </motion.div>
                <motion.div variants={fadeIn}>
                    <Form.Item
                        name="userName"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Name!",
                            },
                        ]}
                    >
                        <Input
                            placeholder="Full Name"
                            className="text-base md:text-lg"
                            style={{
                                fontFamily: "Indie Flower, cursive",
                            }}
                        />
                    </Form.Item>
                </motion.div>
                <motion.div variants={fadeIn}>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            className="text-base md:text-lg"
                            style={{ width: "100%" }}
                        >
                            Sign Up
                        </Button>
                    </Form.Item>
                </motion.div>
            </Form>
        </motion.div>
    );
};

export default SignupForm;
