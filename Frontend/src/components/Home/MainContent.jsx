import {
    Button,
    Card,
    Input,
    Carousel,
    Col,
    Row,
    Statistic,
    Slider,
    InputNumber,
    Checkbox,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import CountUp from "react-countup";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

// Import Card.Meta explicitly
const { Meta: CardMeta } = Card;

// Formatter for CountUp component
const formatter = (value) => <CountUp end={value} separator="," />;

// Animation variants
const slideUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
};

const MainContent = ({ isDarkMode }) => {
    // State for budget range and filters
    const [budgetRange, setBudgetRange] = useState([3500, 500000]);
    const [flats, setFlats] = useState([]);
    const [allFlats, setAllFlats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        fitness: false,
        nightowl: false,
        smoker: false,
        nonalcoholic: false,
        vegetarian: false,
    });

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/properties/all")
            .then((response) => {
                console.log(response);
                const data = response.data.map((property) => ({
                    id: property.propertyid,
                    location: property.location,
                    price: `₹${property.rent}/month`,
                    rent: property.rent, // Store raw rent for filtering
                    image:
                        property.photoUrls?.[0] ||
                        "https://via.placeholder.com/400",
                    amenities: property.amenities?.split(",") || [],
                    tags: [
                        `${property.flatType}`,
                        `${property.capacity} Capacity`,
                    ],
                    preferences: property.preferences || [],
                }));
                setAllFlats(data);
                applyFilters(data); // Apply initial filters
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching properties:", err);
                setLoading(false);
            });
    }, []);

    const navigate = useNavigate();

    // Handle slider change
    const handleSliderChange = (value) => {
        setBudgetRange(value);
        applyFilters(allFlats);
    };

    // Handle min budget input change
    const handleMinInputChange = (value) => {
        if (value >= 3500 && value <= budgetRange[1]) {
            setBudgetRange([value, budgetRange[1]]);
            applyFilters(allFlats);
        }
    };

    // Handle max budget input change
    const handleMaxInputChange = (value) => {
        if (value <= 500000 && value >= budgetRange[0]) {
            setBudgetRange([budgetRange[0], value]);
            applyFilters(allFlats);
        }
    };

    // Handle checkbox filter changes
    const handleFilterChange = (e) => {
        const { name, checked } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: checked,
        }));
        applyFilters(allFlats);
    };

    // Apply filters to flats
    const applyFilters = (flatsToFilter) => {
        let filteredFlats = [...flatsToFilter];

        // Budget filter
        filteredFlats = filteredFlats.filter(
            (flat) => flat.rent >= budgetRange[0] && flat.rent <= budgetRange[1]
        );

        // Preference filter
        if (Object.values(filters).some((value) => value)) {
            filteredFlats = filteredFlats.filter((flat) => {
                return Object.entries(filters).every(([key, value]) => {
                    if (!value) return true; // Skip if filter is not selected
                    return flat.preferences.includes(key);
                });
            });
        }

        setFlats(filteredFlats);
    };

    return (
        <div
            className={
                isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
            }
            style={{
                maxWidth: "100%",
                margin: "0 auto",
                padding: "0 16px",
                boxSizing: "border-box",
            }}
        >
            {/* Statistics and Carousel Section - No Framer Motion */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <Card
                    title={
                        <span
                            className="text-2xl md:text-3xl font-semibold"
                            style={{
                                fontFamily: "Roboto",
                                fontWeight: "bold",
                                color: isDarkMode ? "#fff" : "#000",
                            }}
                        >
                            Statistics
                        </span>
                    }
                    variant="outlined"
                    className="h-full"
                    style={{ background: isDarkMode ? "#2f2f2f" : "#fff" }}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Statistic
                                title="Total Listings"
                                value={1234}
                                formatter={formatter}
                                style={{
                                    fontFamily: "Roboto",
                                    color: isDarkMode ? "#fff" : "#000",
                                }}
                            />
                        </Col>
                        <Col span={12}>
                            <Statistic
                                title="Total Users"
                                value={500}
                                precision={2}
                                formatter={formatter}
                                style={{
                                    fontFamily: "Roboto",
                                    color: isDarkMode ? "#fff" : "#000",
                                }}
                            />
                        </Col>
                        <Col span={12}>
                            <Statistic
                                title="Total Searches"
                                value={100}
                                precision={2}
                                formatter={formatter}
                                style={{
                                    fontFamily: "Roboto",
                                    paddingTop: "16px",
                                    color: isDarkMode ? "#fff" : "#000",
                                }}
                            />
                        </Col>
                    </Row>
                </Card>
                <div className="sm:col-span-2">
                    <Card
                        variant="outlined"
                        className="h-full"
                        style={{ background: isDarkMode ? "#2f2f2f" : "#fff" }}
                    >
                        <Carousel autoplay dotPosition="bottom">
                            {flats.slice(0, 10).map((flat, index) => (
                                <div key={index}>
                                    <div className="text-center">
                                        <h3
                                            className="text-xl md:text-3xl mb-2 font-bold"
                                            style={{
                                                color: isDarkMode
                                                    ? "#fff"
                                                    : "#000",
                                            }}
                                        >
                                            Flat in {flat.location}
                                        </h3>
                                        <img
                                            src={flat.image}
                                            alt={`flat-${index}`}
                                            style={{
                                                width: "100%",
                                                maxHeight: "250px",
                                                objectFit: "cover",
                                                borderRadius: "8px",
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    </Card>
                </div>
            </div>

            {/* Filters and Listings Section */}
            <div className="flex gap-4 flex-col md:flex-row">
                <div className="w-full md:w-1/4 mb-6 md:mb-0">
                    <h3
                        className="mb-2 text-2xl md:text-4xl"
                        style={{
                            fontFamily: "Roboto",
                            color: isDarkMode ? "#fff" : "#000",
                        }}
                    >
                        Filters
                    </h3>
                    <div className="flex flex-col gap-2">
                        <p
                            style={{
                                color: isDarkMode ? "#d1d5db" : "#6b7280",
                            }}
                            className="text-lg font-semibold"
                        >
                            Budget Range
                        </p>
                        <Slider
                            range
                            min={3500}
                            max={500000}
                            value={budgetRange}
                            onChange={handleSliderChange}
                            step={100}
                            tooltip={{
                                formatter: (value) => `₹${value}`,
                            }}
                        />
                        <div className="flex gap-2">
                            <InputNumber
                                min={3500}
                                max={budgetRange[1]}
                                value={budgetRange[0]}
                                onChange={handleMinInputChange}
                                formatter={(value) => `₹ ${value}`}
                                parser={(value) => value.replace("₹ ", "")}
                                style={{ flex: 1 }}
                            />
                            <InputNumber
                                min={budgetRange[0]}
                                max={500000} // Updated max to match slider
                                value={budgetRange[1]}
                                onChange={handleMaxInputChange}
                                formatter={(value) => `₹ ${value}`}
                                parser={(value) => value.replace("₹ ", "")}
                                style={{ flex: 1 }}
                            />
                        </div>
                        <Input placeholder="City / Area" />
                        <div>
                            <Checkbox
                                name="fitness"
                                checked={filters.fitness}
                                onChange={handleFilterChange}
                                style={{
                                    color: isDarkMode ? "#d1d5db" : "#6b7280",
                                }}
                                className="text-lg md:text-xl"
                            >
                                Fitness
                            </Checkbox>
                        </div>
                        <div>
                            <Checkbox
                                name="nightowl"
                                checked={filters.nightowl}
                                onChange={handleFilterChange}
                                style={{
                                    color: isDarkMode ? "#d1d5db" : "#6b7280",
                                }}
                            >
                                NightOwl
                            </Checkbox>
                        </div>
                        <div>
                            <Checkbox
                                name="smoker"
                                checked={filters.smoker}
                                onChange={handleFilterChange}
                                style={{
                                    color: isDarkMode ? "#d1d5db" : "#6b7280",
                                }}
                            >
                                Smoker
                            </Checkbox>
                        </div>
                        <div>
                            <Checkbox
                                name="nonalcoholic"
                                checked={filters.nonalcoholic}
                                onChange={handleFilterChange}
                                style={{
                                    color: isDarkMode ? "#d1d5db" : "#6b7280",
                                }}
                            >
                                Non-Alcoholic
                            </Checkbox>
                        </div>
                        <div>
                            <Checkbox
                                name="vegetarian"
                                checked={filters.vegetarian}
                                onChange={handleFilterChange}
                                style={{
                                    color: isDarkMode ? "#d1d5db" : "#6b7280",
                                }}
                            >
                                Vegetarian
                            </Checkbox>
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    <h3
                        className="text-3xl md:text-4xl mb-2"
                        style={{
                            fontFamily: "Roboto",
                            fontWeight: "bold",
                            color: isDarkMode ? "#fff" : "#000",
                        }}
                    >
                        Listed Places
                    </h3>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        {flats.slice(0, 10).map((flat, index) => (
                            <motion.div
                                key={index}
                                variants={slideUp}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 1 }}
                            >
                                <Card
                                    cover={
                                        <img
                                            alt="flat"
                                            src={flat.image}
                                            style={{
                                                width: "100%",
                                                height: "200px",
                                                objectFit: "cover",
                                                borderRadius: "8px 8px 0 0",
                                            }}
                                        />
                                    }
                                    actions={[
                                        <Button
                                            key="view"
                                            onClick={() =>
                                                navigate(
                                                    `/need-flat/${flat.id}`
                                                )
                                            }
                                        >
                                            View Details
                                        </Button>,
                                    ]}
                                    style={{
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        background: isDarkMode
                                            ? "#2f2f2f"
                                            : "#fff",
                                    }}
                                    styles={{
                                        body: {
                                            flex: 1,
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                        },
                                    }}
                                    variant="outlined"
                                >
                                    <CardMeta
                                        title={
                                            flat.title ||
                                            `Flat in ${flat.location}`
                                        }
                                        description={
                                            <div>
                                                <h4
                                                    style={{
                                                        color: isDarkMode
                                                            ? "#d1d5db"
                                                            : "#6b7280",
                                                    }}
                                                >
                                                    Flat in {flat.location}
                                                </h4>
                                                <p
                                                    style={{
                                                        color: isDarkMode
                                                            ? "#d1d5db"
                                                            : "#6b7280",
                                                    }}
                                                >
                                                    {flat.price}
                                                </p>
                                                <p
                                                    className="text-sm"
                                                    style={{
                                                        color: isDarkMode
                                                            ? "#9ca3af"
                                                            : "#6b7280",
                                                    }}
                                                >
                                                    {flat.amenities.join(", ")}
                                                </p>
                                                {flat.preferences.length >
                                                    0 && (
                                                    <p
                                                        className="text-sm"
                                                        style={{
                                                            color: isDarkMode
                                                                ? "#9ca3af"
                                                                : "#6b7280",
                                                        }}
                                                    >
                                                        Preferences:{" "}
                                                        {flat.preferences.join(
                                                            ", "
                                                        )}
                                                    </p>
                                                )}
                                            </div>
                                        }
                                    />
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                    {/* <div className="text-center mb-8">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Button
                                type="default"
                                onClick={() => navigate("/listings")}
                            >
                                Show More
                            </Button>
                        </motion.div>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default MainContent;
