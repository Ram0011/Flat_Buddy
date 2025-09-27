import React, { useEffect, useState } from "react";
import { Card, Tag, Spin, Image, message, Button } from "antd";
import { motion } from "framer-motion";
import HomeNavbar from "../../components/Navbar/HomeNavbar";
import FooterComponent from "../../components/Home/FooterComponent";
import { useParams } from "react-router-dom";

const slideIn = (delay = 0) => ({
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay },
    },
});

const OwnerPropertyDetails = ({ isDarkMode, setIsDarkMode }) => {
    const { propertyid } = useParams();
    const [property, setProperty] = useState(null);
    const [interestedUsers, setInterestedUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const res = await fetch(
                    `http://localhost:8080/api/properties/${propertyid}`
                );
                if (!res.ok)
                    throw new Error("Failed to fetch property details");
                const data = await res.json();
                setProperty(data);
            } catch (err) {
                console.error("Error fetching property details:", err);
                setError("Failed to load property details. Please try again.");
            }
        };

        const fetchInterestDetails = async () => {
            try {
                const res = await fetch(
                    `http://localhost:8080/api/properties/interested-users/${propertyid}`
                );
                if (!res.ok) {
                    if (res.status === 204) {
                        setInterestedUsers([]);
                    } else {
                        throw new Error("Failed to fetch interested users");
                    }
                }
                const data = await res.json();
                setInterestedUsers(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Error fetching interested users:", err);
                setInterestedUsers([]);
                message.error("Failed to load interested users.");
            }
        };

        Promise.all([fetchPropertyDetails(), fetchInterestDetails()]).finally(
            () => setLoading(false)
        );
    }, [propertyid]);

    const toggleGrantProperty = async (tenantId) => {
        try {
            const endpoint =
                property.status === 1
                    ? `http://localhost:8080/api/properties/${propertyid}/grant`
                    : `http://localhost:8080/api/properties/${propertyid}/release`;

            const options =
                property.status === 1
                    ? {
                          method: "PUT",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ tenantId }),
                      }
                    : { method: "PUT" };

            const res = await fetch(endpoint, options);

            if (!res.ok) throw new Error("Failed to update property");

            message.success(
                property.status === 1
                    ? "Property Granted"
                    : "Property Taken Back"
            );

            // update local property status
            setProperty({
                ...property,
                status: property.status === 1 ? 0 : 1,
            });
        } catch (err) {
            console.error(err);
            message.error("Error updating property");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    if (!property) {
        return <div>Property not found</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <HomeNavbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

            <main className="max-w-5xl mx-auto px-4 py-10">
                <motion.h1
                    className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white"
                    variants={slideIn(0.1)}
                    initial="hidden"
                    animate="visible"
                >
                    Property Details
                </motion.h1>

                <motion.div
                    variants={slideIn(0.2)}
                    initial="hidden"
                    animate="visible"
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl mb-10"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Image.PreviewGroup>
                                {property.photoUrls?.map((url, index) => (
                                    <Image
                                        key={index}
                                        src={url}
                                        className="mb-4 rounded-lg"
                                        width="100%"
                                        height={300}
                                        style={{ objectFit: "cover" }}
                                    />
                                ))}
                            </Image.PreviewGroup>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                                {property.flatType} in {property.location}
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300">
                                <strong>Rent:</strong> ₹{property.rent}
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                                <strong>Capacity:</strong> {property.capacity}{" "}
                                person(s)
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                                <strong>Amenities:</strong>{" "}
                                {Array.isArray(property.amenities)
                                    ? property.amenities.join(", ")
                                    : property.amenities}
                            </p>
                            <Tag
                                color={property.status === 1 ? "green" : "red"}
                                className="w-fit text-sm mt-2"
                            >
                                {property.status === 1
                                    ? "Not Booked"
                                    : "Booked"}
                            </Tag>
                            <Tag
                                color={
                                    property.interestCount > 0
                                        ? "blue"
                                        : "default"
                                }
                                className="w-fit text-sm"
                            >
                                {property.interestCount > 0
                                    ? `${property.interestCount} user(s) interested`
                                    : "No interest shown yet"}
                            </Tag>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    variants={slideIn(0.3)}
                    initial="hidden"
                    animate="visible"
                    className="bg-gray-800 p-6 rounded-lg shadow-xl"
                >
                    <h3 className="text-xl font-semibold mb-4 text-white">
                        Interested Users
                    </h3>

                    {interestedUsers.length === 0 ? (
                        <p className=" text-gray-400">
                            No one has shown interest in this property yet.
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {interestedUsers.map((user, idx) => (
                                <Card
                                    key={idx}
                                    className="bg-gray-700 border-none shadow-sm"
                                >
                                    <p className="text-gray-800">
                                        <strong>Name:</strong> {user.uname}
                                    </p>
                                    <p className="text-gray-800">
                                        <strong>Email:</strong> {user.emailid}
                                    </p>
                                    <p className="text-gray-800">
                                        <strong>Phone:</strong> {user.contactno}
                                    </p>
                                    <Button
                                        type="primary"
                                        danger={property.status === 0} // red when booked
                                        onClick={() =>
                                            toggleGrantProperty(user.userid)
                                        } // pass interested user's id
                                    >
                                        {property.status === 1
                                            ? "Grant Property"
                                            : "Take Back Property"}
                                    </Button>
                                </Card>
                            ))}
                        </div>
                    )}
                </motion.div>
            </main>

            <FooterComponent
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
            />
        </div>
    );
};

export default OwnerPropertyDetails;
