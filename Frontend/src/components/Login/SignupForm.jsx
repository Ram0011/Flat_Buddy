import { useEffect, useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { motion } from "framer-motion";
import axios from "axios";

const { Option } = Select;

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
    const [cities, setCities] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/cities")
            .then((res) => {
                const validCities = res.data.filter(
                    (city) => city.cityid !== null && city.cityname !== null
                );
                setCities(validCities);
            })
            .catch(() => {
                message.error("Failed to load cities.");
            });
    }, []);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post(
                "http://localhost:4000/api/auth/register",
                {
                    uname: values.username,
                    emailid: values.emailid,
                    pwd: values.password,
                    gender: values.gender,
                    contactno: values.contactno,
                    profession: values.profession,
                    cityid: values.cityid,
                }
            );

            if (response.data.success) {
                message.success("Sign up successful! Please log in.");
                document.getElementById("register-form").reset();
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
                id="register-form"
                name="Register"
                onFinish={onFinish}
                style={{ width: "100%", padding: "0 16px" }}
            >
                {[
                    {
                        name: "username",
                        placeholder: "Username",
                        message: "Please input your Username!",
                    },
                    {
                        name: "emailid",
                        placeholder: "Email Id",
                        message: "Please enter email id",
                    },
                    {
                        name: "password",
                        placeholder: "Password",
                        type: "password",
                        message: "Please input your Password!",
                    },
                    {
                        name: "contactno",
                        placeholder: "Contact No",
                        message: "Please input your Contact no",
                    },
                    {
                        name: "profession",
                        placeholder: "Profession",
                        message: "Please input your profession",
                    },
                ].map((field) => (
                    <motion.div key={field.name} variants={fadeIn}>
                        <Form.Item
                            name={field.name}
                            rules={[{ required: true, message: field.message }]}
                        >
                            {field.type === "password" ? (
                                <Input.Password
                                    placeholder={field.placeholder}
                                    className="text-base md:text-lg"
                                    style={{
                                        fontFamily: "Indie Flower, cursive",
                                    }}
                                />
                            ) : (
                                <Input
                                    placeholder={field.placeholder}
                                    className="text-base md:text-lg"
                                    style={{
                                        fontFamily: "Indie Flower, cursive",
                                    }}
                                />
                            )}
                        </Form.Item>
                    </motion.div>
                ))}

                {/* Gender Select */}
                <motion.div variants={fadeIn}>
                    <Form.Item
                        name="gender"
                        rules={[
                            {
                                required: true,
                                message: "Please select your gender",
                            },
                        ]}
                    >
                        <Select
                            placeholder="Select Gender"
                            className="text-base md:text-lg"
                            style={{ fontFamily: "Indie Flower, cursive" }}
                        >
                            <Option value="Male">Male</Option>
                            <Option value="Female">Female</Option>
                            <Option value="Other">Other</Option>
                        </Select>
                    </Form.Item>
                </motion.div>

                {/* City Select */}
                <motion.div variants={fadeIn}>
                    <Form.Item
                        name="cityid"
                        rules={[
                            {
                                required: true,
                                message: "Please select your city",
                            },
                        ]}
                    >
                        <Select
                            placeholder="Select City"
                            className="text-base md:text-lg"
                            style={{ fontFamily: "Indie Flower, cursive" }}
                        >
                            {cities.map((city) => (
                                <Option key={city.cityid} value={city.cityid}>
                                    {city.cityname}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={fadeIn}>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            className="text-base md:text-lg"
                            style={{ width: "100%" }}
                        >
                            Register
                        </Button>
                    </Form.Item>
                </motion.div>
            </Form>
        </motion.div>
    );
};

export default SignupForm;
