import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Form,
    Input,
    Select,
    InputNumber,
    Upload,
    Button,
    message,
    Spin,
    Modal,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import HeaderNavbar from "../../components/Navbar/HomeNavbar.jsx";
import FooterComponent from "../../components/Home/FooterComponent";
import LogoutModal from "../../components/LogoutModel/LogoutModal.jsx";

const { Option } = Select;

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const OwnerListingPage = ({ isDarkMode, setIsDarkMode }) => {
    const [form] = Form.useForm();
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [cities, setCities] = useState([]);
    const navigate = useNavigate();

    // Responsive handler
    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        fetch("http://localhost:8080/api/cities")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setCities(data);
                } else {
                    console.error("Invalid city response", data);
                    setCities([]);
                }
            })
            .catch((err) => {
                console.error("Error fetching cities", err);
                setCities([]);
            });
    }, []);

    // Modal and drawer handlers
    const showModal = () => setIsLogoutModalVisible(true);
    const closeDrawer = () => setIsDrawerOpen(false);
    const showDrawer = () => setIsDrawerOpen(true);

    const handleLogoutConfirm = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("roleId");
        setIsLogoutModalVisible(false);
        navigate("/login");
    };

    const onFinish = async (values) => {
        setLoading(true);

        const formData = new FormData();
        formData.append("flatType", values.flatType);
        formData.append("location", values.location);
        formData.append("amenities", values.amenities);
        formData.append("rent", values.rent);
        formData.append("cityid", values.cityId);
        formData.append("capacity", values.capacity);
        formData.append("userid", localStorage.getItem("userId"));

        if (values.photos && values.photos.length > 0) {
            values.photos.forEach((file) => {
                formData.append("images", file.originFileObj);
            });
        }

        try {
            const res = await fetch(
                "http://localhost:8080/api/properties/create",
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (res.ok) {
                const data = await res.json();
                console.log("Response from backend:", data);
                message.success("Flat listed successfully!");
                form.resetFields();
                setFileList([]);
                navigate("/owner");
            } else {
                const error = await res.text();
                console.error("Error:", error);
                message.error("Failed to list flat.");
            }
        } catch (err) {
            console.error("Request failed:", err);
            message.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat relative"
            style={{
                backgroundImage: `url('https://www.limaone.com/wp-content/uploads/Rental-scaled.jpg')`,
            }}
        >
            <div className="absolute inset-0 backdrop-blur-sm bg-black/30 z-0" />
            <div className="relative z-10 flex flex-col min-h-screen">
                <HeaderNavbar
                    isDarkMode={isDarkMode}
                    setIsDarkMode={setIsDarkMode}
                    isSmallScreen={isSmallScreen}
                    showModal={showModal}
                    showDrawer={showDrawer}
                    isDrawerOpen={isDrawerOpen}
                    closeDrawer={closeDrawer}
                />
                <div className="flex-grow flex flex-col items-center justify-center px-4 py-12 pb-44">
                    <h1
                        className={`text-3xl md:text-5xl text-center mb-6 font-bold ${
                            isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                        style={{ fontWeight: "bold", fontFamily: "sans-serif" }}
                    >
                        Flat Listing for Owner
                    </h1>
                    <motion.div
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        className={`w-full max-w-2xl p-6 rounded-2xl shadow-xl ${
                            isDarkMode
                                ? "bg-gray-800 text-white"
                                : "bg-gray-100 text-black"
                        }`}
                    >
                        <Spin spinning={loading} tip="Listing flat...">
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={onFinish}
                                className="space-y-4"
                            >
                                <Form.Item
                                    name="flatType"
                                    label="Flat Type"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please select flat type",
                                        },
                                    ]}
                                >
                                    <Select placeholder="Select flat type">
                                        <Option value="1BHK">1 BHK</Option>
                                        <Option value="2BHK">2 BHK</Option>
                                        <Option value="3BHK">3 BHK</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="cityId"
                                    label="City"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please select a city",
                                        },
                                    ]}
                                >
                                    <Select placeholder="Select city">
                                        {cities
                                            .filter(
                                                (city) =>
                                                    city.cityid !== null &&
                                                    city.cityname !== null
                                            )
                                            .map((city) => (
                                                <Option
                                                    key={city.cityid}
                                                    value={city.cityid}
                                                >
                                                    {city.cityname}
                                                </Option>
                                            ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="location"
                                    label="Location"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please enter the location",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Enter location" />
                                </Form.Item>
                                <Form.Item
                                    name="amenities"
                                    label="Amenities"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please enter amenities",
                                        },
                                    ]}
                                >
                                    <Input placeholder="e.g. WiFi, AC, Parking" />
                                </Form.Item>
                                <Form.Item
                                    name="capacity"
                                    label="Capacity"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please enter capacity",
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        min={1}
                                        className="w-full"
                                        placeholder="1"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="rent"
                                    type="number"
                                    label="Rent (₹)"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please enter rent amount",
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        className="w-full"
                                        min={0}
                                        placeholder="Enter rent"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="photos"
                                    label="Photos"
                                    valuePropName="fileList"
                                    getValueFromEvent={(e) =>
                                        Array.isArray(e) ? e : e?.fileList
                                    }
                                >
                                    <Upload
                                        listType="picture"
                                        multiple
                                        beforeUpload={() => false}
                                        fileList={fileList}
                                        onChange={({
                                            fileList: newFileList,
                                        }) => {
                                            setFileList(
                                                newFileList.map((file) => ({
                                                    ...file,
                                                    sizeText:
                                                        (
                                                            file.size /
                                                            1024 /
                                                            1024
                                                        ).toFixed(2) + " MB",
                                                }))
                                            );
                                        }}
                                        itemRender={(
                                            originNode,
                                            file,
                                            fileList,
                                            actions
                                        ) => (
                                            <div style={{ marginBottom: 8 }}>
                                                {originNode}
                                                <div
                                                    style={{
                                                        fontSize: 12,
                                                        color: "#999",
                                                    }}
                                                >
                                                    Size:{" "}
                                                    {(
                                                        file.size /
                                                        1024 /
                                                        1024
                                                    ).toFixed(2)}{" "}
                                                    MB
                                                </div>
                                            </div>
                                        )}
                                    >
                                        <Button icon={<UploadOutlined />}>
                                            Select Photos
                                        </Button>
                                    </Upload>
                                </Form.Item>
                                <Form.Item className="text-center">
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="px-6 py-2 rounded-xl"
                                    >
                                        Submit Listing
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Spin>
                    </motion.div>
                </div>
                <FooterComponent
                    isDarkMode={isDarkMode}
                    setIsDarkMode={setIsDarkMode}
                />
            </div>
            <LogoutModal
                open={isLogoutModalVisible}
                onCancel={() => setIsLogoutModalVisible(false)}
                onConfirm={handleLogoutConfirm}
            />
        </div>
    );
};

export default OwnerListingPage;
