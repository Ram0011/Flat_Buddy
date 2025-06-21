import React from "react";
import { Card, Col } from "antd";
import { motion } from "framer-motion";

const FlatCard = ({ isDarkMode, flat, index, cardVariants }) => {
    return (
        <Col xs={24} sm={12} md={8} key={flat.id}>
            <motion.div variants={cardVariants} custom={index}>
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
                        background: isDarkMode ? "#2f2f2f" : "#fff",
                        color: isDarkMode ? "#fff" : "#000",
                        borderRadius: "8px",
                        overflow: "hidden",
                    }}
                    title={
                        <h3
                            className="text-lg sm:text-lg md:text-xl lg:text-2xl font-extralight"
                            style={{
                                color: isDarkMode ? "#fff" : "#000",
                                margin: 0,
                                fontFamily: "Nunito Sans, sans-serif",
                            }}
                        >
                            {flat.title}
                        </h3>
                    }
                >
                    <p>{flat.description}</p>
                    <p>
                        <strong>Price:</strong> ${flat.price}/month
                    </p>
                    <p>
                        <strong>Location:</strong> {flat.location}
                    </p>
                </Card>
            </motion.div>
        </Col>
    );
};

export default FlatCard;
