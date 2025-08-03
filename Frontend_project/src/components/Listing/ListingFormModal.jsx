import React from "react";
import { Modal, Form, Input, InputNumber } from "antd";
import { motion } from "framer-motion";
import { message } from "antd";

const ListingFormModal = ({
    isDarkMode,
    isModalOpen,
    setIsModalOpen,
    form,
    modalVariants,
}) => {
    const handleModalOk = () => {
        form.validateFields()
            .then((values) => {
                console.log("New Listing:", values);
                message.success("Flat listed successfully!");
                form.resetFields();
                setIsModalOpen(false);
            })
            .catch((info) => {
                console.log("Validation Failed:", info);
            });
    };

    const handleModalCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

    return (
        <motion.div
            variants={modalVariants}
            initial="hidden"
            animate={isModalOpen ? "visible" : "hidden"}
        >
            <Modal
                title="List a New Flat"
                open={isModalOpen}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                okText="Submit"
                cancelText="Cancel"
                style={{ background: isDarkMode ? "#2f2f2f" : "#fff" }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    style={{ color: isDarkMode ? "#fff" : "#000" }}
                >
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[
                            {
                                required: true,
                                message: "Please enter the title",
                            },
                        ]}
                    >
                        <Input placeholder="e.g., Cozy Studio in Downtown" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[
                            {
                                required: true,
                                message: "Please enter a description",
                            },
                        ]}
                    >
                        <Input.TextArea
                            rows={4}
                            placeholder="Describe the flat..."
                        />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Price ($/month)"
                        rules={[
                            {
                                required: true,
                                message: "Please enter the price",
                            },
                        ]}
                    >
                        <InputNumber
                            min={0}
                            style={{ width: "100%" }}
                            placeholder="e.g., 1200"
                        />
                    </Form.Item>
                    <Form.Item
                        name="location"
                        label="Location"
                        rules={[
                            {
                                required: true,
                                message: "Please enter the location",
                            },
                        ]}
                    >
                        <Input placeholder="e.g., New York, NY" />
                    </Form.Item>
                </Form>
            </Modal>
        </motion.div>
    );
};

export default ListingFormModal;
