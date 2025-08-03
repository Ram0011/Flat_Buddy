import React from "react";
import { Flex } from "antd";
import { motion } from "framer-motion";

// Animation variants
const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
        opacity: 1,
        x: 0,
        transition: { duration: 0.3, delay: i * 0.1 + 0.4 },
    }),
};

const Fields = ({ user }) => {
    const fields = [
        { label: "Age:", value: user.age },
        { label: "Profession:", value: user.profession },
        { label: "Drinks:", value: user.drinks },
        { label: "Smokes:", value: user.smokes },
        { label: "Pets:", value: user.pets },
    ];

    return (
        <div className="space-y-2">
            {fields.map((field, index) => (
                <motion.div
                    key={field.label}
                    variants={fieldVariants}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                >
                    <Flex justify="space-between" align="center">
                        <strong className="text-md md:text-lg w-28">
                            {field.label}
                        </strong>
                        <span>{field.value}</span>
                    </Flex>
                </motion.div>
            ))}
        </div>
    );
};

export default Fields;
