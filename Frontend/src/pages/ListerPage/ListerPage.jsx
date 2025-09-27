import React, { useEffect, useState } from "react";
import { Card, Button, Modal, message } from "antd";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import HomeNavbar from "../../components/Navbar/HomeNavbar";
import FooterComponent from "../../components/Home/FooterComponent";

// Animation variant
const slideIn = (delay = 0) => ({
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay },
    },
});

const ListerPage = ({ isDarkMode, setIsDarkMode }) => {
    const navigate = useNavigate();
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [propertyToDelete, setPropertyToDelete] = useState(null);
    const [listedProperties, setListedProperties] = useState([]);
    const [hasListedProperty, setHasListedProperty] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const userId = localStorage.getItem("userId");
                const res = await fetch(
                    `http://localhost:8080/api/properties/tenants/${userId}`
                );
                if (!res.ok) {
                    throw new Error("Failed to fetch properties");
                }
                const data = await res.json();
                console.log(data);
                setListedProperties(data);
                setHasListedProperty(data.length > 0);
            } catch (err) {
                console.error("Error fetching listed properties:", err);
            }
        };
        fetchProperties();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("roleId");
        localStorage.removeItem("userId");
        setIsLogoutModalVisible(false);
        navigate("/");
    };

    const handleDeleteProperty = async () => {
        if (!propertyToDelete) return;
        try {
            const res = await fetch(
                `http://localhost:8080/api/properties/delete/${propertyToDelete}`,
                {
                    method: "DELETE",
                }
            );
            if (!res.ok) {
                throw new Error("Failed to delete");
            }
            setListedProperties((prev) =>
                prev.filter((item) => item.propertyid !== propertyToDelete)
            );
            setIsDeleteModalVisible(false);
            setPropertyToDelete(null);
        } catch (err) {
            console.error("Error deleting property:", err);
        }
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat relative"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1470&q=80')",
            }}
        >
            <div className="absolute inset-0 backdrop-blur-sm bg-black/30 z-0" />
            <div className="relative z-10 flex flex-col min-h-screen">
                {/* Navbar */}
                <HomeNavbar
                    isDarkMode={isDarkMode}
                    setIsDarkMode={setIsDarkMode}
                    isSmallScreen={isSmallScreen}
                    showModal={() => setIsLogoutModalVisible(true)}
                />
                {/* Logout Modal */}
                <Modal
                    title="Confirm Logout"
                    open={isLogoutModalVisible}
                    onOk={handleLogout}
                    onCancel={() => setIsLogoutModalVisible(false)}
                    okText="Yes, Logout"
                    cancelText="Cancel"
                >
                    <p>Are you sure you want to logout?</p>
                </Modal>
                {/* Delete Property Modal */}
                <Modal
                    title="Confirm Delete"
                    open={isDeleteModalVisible}
                    onOk={handleDeleteProperty}
                    onCancel={() => {
                        setIsDeleteModalVisible(false);
                        setPropertyToDelete(null);
                    }}
                    okText="Yes, Delete"
                    cancelText="Cancel"
                    okButtonProps={{ danger: true }}
                >
                    <p>Are you sure you want to delete this property?</p>
                </Modal>
                {/* Main content */}
                <main className="flex-grow px-4 py-20 flex flex-col items-center">
                    {/* Add Property Card */}
                    <motion.div
                        variants={slideIn(0.1)}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ scale: 1.03 }}
                        className={`w-full max-w-4xl mb-16 cursor-pointer rounded-2xl shadow-2xl transition-all duration-300 ${
                            isDarkMode
                                ? "bg-gray-800 text-white"
                                : "bg-gray-300 text-gray-900"
                        }`}
                        onClick={() => {
                            if (hasListedProperty) {
                                message.warning(
                                    "You have already listed your property!"
                                );
                                return;
                            }
                            navigate("/lister-property-listing");
                        }}
                    >
                        <div className="p-10 text-center">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">
                                List Your Property
                            </h2>
                            <Button type="primary" size="large">
                                List Property
                            </Button>
                        </div>
                    </motion.div>

                    {/* Heading */}
                    <motion.h3
                        variants={slideIn(0.2)}
                        initial="hidden"
                        animate="visible"
                        className="text-lg md:text-2xl font-semibold mb-6"
                    >
                        Your Listed Property
                    </motion.h3>

                    {/* Listed Properties */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full pb-24">
                        {listedProperties.length === 0 ? (
                            <p>No properties listed yet.</p>
                        ) : (
                            listedProperties.map((property, index) => (
                                <motion.div
                                    key={property.propertyid}
                                    variants={slideIn(0.3 + index * 0.2)}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover={{
                                        scale: 1.05,
                                        y: -10,
                                        boxShadow:
                                            "0px 10px 30px rgba(0,0,0,0.2)",
                                        transition: {
                                            duration: 0.3,
                                            ease: "easeOut",
                                        },
                                    }}
                                >
                                    <Card
                                        hoverable
                                        cover={
                                            <img
                                                alt={property.propertyType}
                                                src={
                                                    property.photoUrls &&
                                                    property.photoUrls.length >
                                                        0
                                                        ? property.photoUrls[0]
                                                        : "https://placehold.co/600x400"
                                                }
                                                className="h-60 object-cover"
                                            />
                                        }
                                        className={`rounded-xl shadow-xl transition ${
                                            isDarkMode
                                                ? "bg-gray-900 text-white border-none"
                                                : ""
                                        }`}
                                    >
                                        <Card.Meta
                                            title={`${property.flattype} in ${property.location}`}
                                            description={
                                                <>
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-lg font-semibold">
                                                            ₹{property.rent}
                                                        </span>
                                                        <span className="text-sm text-gray-500">
                                                            {property.location}
                                                        </span>
                                                        <span
                                                            className={`text-sm font-semibold ${
                                                                property.status ===
                                                                1
                                                                    ? "text-green-500"
                                                                    : "text-red-500"
                                                            }`}
                                                        >
                                                            {property.status ===
                                                            1
                                                                ? "Not Booked"
                                                                : "Booked"}
                                                        </span>
                                                        {typeof property.interestCount ===
                                                            "number" && (
                                                            <span
                                                                className={`inline-block text-xs mt-1 px-2 py-1 rounded-full w-fit ${
                                                                    property.interestCount >
                                                                    0
                                                                        ? "bg-blue-100 text-blue-800"
                                                                        : "bg-gray-200 text-gray-600"
                                                                }`}
                                                            >
                                                                {property.interestCount >
                                                                0
                                                                    ? `${property.interestCount} user(s) interested`
                                                                    : "No interest yet"}
                                                            </span>
                                                        )}
                                                    </div>
                                                </>
                                            }
                                        />
                                        <div className="flex justify-end mt-4">
                                            <Button
                                                danger
                                                type="primary"
                                                onClick={() => {
                                                    setPropertyToDelete(
                                                        property.propertyid
                                                    );
                                                    setIsDeleteModalVisible(
                                                        true
                                                    );
                                                }}
                                            >
                                                Delete Property
                                            </Button>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))
                        )}
                    </div>
                </main>
                {/* Footer */}
                <FooterComponent
                    isDarkMode={isDarkMode}
                    setIsDarkMode={setIsDarkMode}
                />
            </div>
        </div>
    );
};

export default ListerPage;
