import React from "react";
import { Card, Typography, Avatar, Button, Col } from "antd";
import { UserOutlined, PhoneOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

const { Title, Text } = Typography;

const RoommateCard = ({
    isDarkMode,
    roommate,
    index,
    showContactModal,
    cardVariants,
    avatarVariants,
    buttonVariants,
}) => {
    return (
        <Col xs={24} sm={12} md={8} key={roommate.id}>
            <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                whileHover={{ scale: 1.02 }}
            >
                <Card
                    hoverable
                    className={`${
                        isDarkMode
                            ? "bg-gray-800 text-white"
                            : "bg-white text-gray-900"
                    }`}
                >
                    <div className="flex justify-center mb-4">
                        <motion.div variants={avatarVariants}>
                            <Avatar
                                size={64}
                                icon={<UserOutlined />}
                                className={
                                    isDarkMode ? "bg-gray-700" : "bg-gray-200"
                                }
                            />
                        </motion.div>
                    </div>
                    <Title
                        level={4}
                        className={isDarkMode ? "text-white" : "text-gray-900"}
                    >
                        {roommate.name}
                    </Title>
                    <Text
                        className={
                            isDarkMode ? "text-gray-300" : "text-gray-700"
                        }
                    >
                        <p className="font-bold inline">Age:</p> {roommate.age}
                    </Text>
                    <br />
                    <Text
                        className={
                            isDarkMode ? "text-gray-300" : "text-gray-700"
                        }
                    >
                        <p className="font-bold inline">Gender:</p>{" "}
                        {roommate.gender}
                    </Text>
                    <br />
                    <Text
                        className={
                            isDarkMode ? "text-gray-300" : "text-gray-700"
                        }
                    >
                        <p className="font-bold inline">Smoking:</p>{" "}
                        {roommate.smoking}
                    </Text>
                    <br />
                    <Text
                        className={
                            isDarkMode ? "text-gray-300" : "text-gray-700"
                        }
                    >
                        <p className="font-bold inline">Drinking:</p>{" "}
                        {roommate.drinking}
                    </Text>
                    <br />
                    <Text
                        className={
                            isDarkMode ? "text-gray-300" : "text-gray-700"
                        }
                    >
                        <p className="font-bold inline">Pets:</p>{" "}
                        {roommate.pets}
                    </Text>
                    <motion.div
                        variants={buttonVariants}
                        initial="hidden"
                        animate="visible"
                        className="mt-4 text-center"
                    >
                        <Button
                            type="primary"
                            icon={<PhoneOutlined />}
                            onClick={() => showContactModal(roommate)}
                            className={
                                isDarkMode
                                    ? "bg-blue-600 hover:bg-blue-500"
                                    : ""
                            }
                        >
                            Contact
                        </Button>
                    </motion.div>
                </Card>
            </motion.div>
        </Col>
    );
};

export default RoommateCard;
