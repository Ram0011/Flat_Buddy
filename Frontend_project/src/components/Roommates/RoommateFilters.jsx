import React from "react";
import { Select, Button, Row, Col } from "antd";
import { motion } from "framer-motion";

const RoommateFilters = ({
    isDarkMode,
    filters,
    setFilters,
    filterVariants,
    filterItemVariants,
}) => {
    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <motion.div
            variants={filterVariants}
            initial="hidden"
            animate="visible"
            className="pb-14"
        >
            <h1 className="text-2xl md:text-4xl">Filters:</h1>
            <Row gutter={[16, 16]} justify="center">
                <Col xs={24} sm={12} md={6}>
                    <motion.div variants={filterItemVariants}>
                        <Select
                            placeholder="Smoking"
                            onChange={(value) =>
                                handleFilterChange("smoking", value)
                            }
                            style={{ width: "100%" }}
                            options={[
                                { value: "", label: "Any" },
                                { value: "Yes", label: "Yes" },
                                { value: "No", label: "No" },
                            ]}
                        />
                    </motion.div>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <motion.div variants={filterItemVariants}>
                        <Select
                            placeholder="Drinking"
                            onChange={(value) =>
                                handleFilterChange("drinking", value)
                            }
                            style={{ width: "100%" }}
                            options={[
                                { value: "", label: "Any" },
                                { value: "Yes", label: "Yes" },
                                {
                                    value: "Occasionally",
                                    label: "Occasionally",
                                },
                                { value: "No", label: "No" },
                            ]}
                        />
                    </motion.div>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <motion.div variants={filterItemVariants}>
                        <Select
                            placeholder="Pets"
                            onChange={(value) =>
                                handleFilterChange("pets", value)
                            }
                            style={{ width: "100%" }}
                            options={[
                                { value: "", label: "Any" },
                                { value: "Yes (Cat)", label: "Yes (Cat)" },
                                { value: "Yes (Dog)", label: "Yes (Dog)" },
                                { value: "No", label: "No" },
                            ]}
                        />
                    </motion.div>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <motion.div variants={filterItemVariants}>
                        <Select
                            placeholder="Gender"
                            onChange={(value) =>
                                handleFilterChange("gender", value)
                            }
                            style={{ width: "100%" }}
                            options={[
                                { value: "", label: "Any" },
                                { value: "Male", label: "Male" },
                                { value: "Female", label: "Female" },
                            ]}
                        />
                    </motion.div>
                </Col>
                <Col xs={24}>
                    <motion.div variants={filterItemVariants}>
                        <Button
                            type="primary"
                            onClick={() =>
                                setFilters({
                                    smoking: "",
                                    drinking: "",
                                    pets: "",
                                    gender: "",
                                })
                            }
                            className={
                                isDarkMode
                                    ? "bg-blue-600 hover:bg-blue-500"
                                    : ""
                            }
                        >
                            Clear Filters
                        </Button>
                    </motion.div>
                </Col>
            </Row>
        </motion.div>
    );
};

export default RoommateFilters;
