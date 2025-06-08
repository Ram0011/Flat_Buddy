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

// Import Card.Meta explicitly
const { Meta: CardMeta } = Card;

// Formatter for CountUp component
const formatter = (value) => <CountUp end={value} separator="," />;

// Sample data for flats
const flats = [
    {
        title: "Shivaji Nagar",
        price: "₹30000/month",
        image: "https://th.bing.com/th/id/R.bf3f2f0ab470b6ae0acd69d3366b8e71?rik=zDfPdp%2fp8597XA&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f10%2fPhotos-Apartment-HD.jpg&ehk=68xff7gTwc8dN2zuON1jZ0soOcByscrd6C9hwSszjyw%3d&risl=&pid=ImgRaw&r=0",
        features: ["WiFi", "AC", "Furnished"],
    },
    {
        title: "Kothrud",
        price: "₹19000/month",
        image: "https://www.phillyaptrentals.com/wp-content/uploads/2020/12/apartment-building-what-makes-good-apartment-building-scaled.jpg",
        features: ["WiFi", "Washer", "Pet-friendly"],
    },
    {
        title: "Viman Nagar",
        price: "₹20000/month",
        image: "https://static.giggster.com/images/location/ca5202c1-854f-4eb2-83c0-635c5f1e01e4/d859ba35-e9fa-474f-8b44-dfe8ae061b22/full_hd_retina.jpeg",
        features: ["Balcony", "Gym", "Parking"],
    },
    {
        title: "Hinjawadi Phase 2",
        price: "₹25000/month",
        image: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://www.glenwoodnyc.com/wp-content/uploads/2022/05/2-JSP-LOBBY-01-02-1280.jpg",
        features: ["WiFi", "Dishwasher", "Central Heating"],
    },
];

// Sample data for roommates
const roommates = [
    {
        name: "Mangesh Honrao",
        preferences: "Non-smoker, Quiet, Works remotely",
        details: ["25 years old", "Loves hiking", "No pets"],
    },
    {
        name: "Abhishek Kapadnis",
        preferences: "Pet-friendly, Social, Clean",
        details: ["28 years old", "Has a cat", "Enjoys cooking"],
    },
    {
        name: "Sarang Patil",
        preferences: "Night owl, Gamer, Tidy",
        details: ["30 years old", "No pets", "Freelancer"],
    },
    {
        name: "Trupti Gupta",
        preferences: "Early riser, Fitness enthusiast, Organized",
        details: ["27 years old", "Vegan", "No smoking"],
    },
];

const MainContent = ({ isDarkMode }) => {
    // State for budget range
    const [budgetRange, setBudgetRange] = useState([3500, 30000]);

    // Handle slider change
    const handleSliderChange = (value) => {
        setBudgetRange(value);
    };

    // Handle min budget input change
    const handleMinInputChange = (value) => {
        if (value >= 3500 && value <= budgetRange[1]) {
            setBudgetRange([value, budgetRange[1]]);
        }
    };

    // Handle max budget input change
    const handleMaxInputChange = (value) => {
        if (value <= 30000 && value >= budgetRange[0]) {
            setBudgetRange([budgetRange[0], value]);
        }
    };

    return (
        <div>
            {/* Statistics and Carousel Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <Card
                    title={
                        <span
                            className="text-2xl font-semibold"
                            style={{
                                fontFamily: "Roboto",
                                fontWeight: "bold",
                            }}
                        >
                            Statistics
                        </span>
                    }
                    variant="outlined"
                    className="h-full"
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Statistic
                                title="Total Listings"
                                value={1234}
                                formatter={formatter}
                                style={{
                                    fontFamily: "Roboto",
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
                                }}
                            />
                        </Col>
                    </Row>
                </Card>
                <div className="sm:col-span-2">
                    <Card variant="outlined" className="h-full">
                        <Carousel autoplay dotPosition="bottom">
                            {flats.slice(0, 4).map((flat, index) => (
                                <div key={index}>
                                    <div className="text-center">
                                        <h3 className="text-lg mb-2">
                                            {flat.title}
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
                        className="mb-2 text-2xl md:text-4xl text-gray-700"
                        style={{ fontFamily: "Roboto" }}
                    >
                        Filters
                    </h3>
                    <div className="flex flex-col gap-2">
                        <p>Budget Range</p>
                        <Slider
                            range
                            min={3500}
                            max={30000}
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
                                max={30000}
                                value={budgetRange[1]}
                                onChange={handleMaxInputChange}
                                formatter={(value) => `₹ ${value}`}
                                parser={(value) => value.replace("₹ ", "")}
                                style={{ flex: 1 }}
                            />
                        </div>
                        <Input placeholder="City / Area" />
                        <div>
                            <Checkbox>Pet-friendly</Checkbox>
                        </div>
                        <div>
                            <Checkbox>Smoking allowed</Checkbox>
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    <h3
                        className="text-3xl md:text-4xl mb-2"
                        style={{
                            fontFamily: "Roboto",
                            fontWeight: "bold",
                        }}
                    >
                        Listed Places
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {flats.slice(0, 4).map((flat, index) => (
                            <Card
                                key={index}
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
                                    <Button key="view">View Details</Button>,
                                    <Button key="contact">
                                        Contact Owner
                                    </Button>,
                                ]}
                                style={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
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
                                    title={flat.title}
                                    description={
                                        <div>
                                            <p>{flat.price}</p>
                                            <p className="text-sm text-gray-500">
                                                {flat.features.join(", ")}
                                            </p>
                                        </div>
                                    }
                                />
                            </Card>
                        ))}
                    </div>
                    <div className="text-center mb-8">
                        <Button variant="outlined" color="primary">
                            Show More
                        </Button>
                    </div>

                    <h3
                        className="text-3xl md:text-4xl mb-2"
                        style={{
                            fontFamily: "Roboto",
                            fontWeight: "bold",
                        }}
                    >
                        Listed Roommates
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {roommates.slice(0, 4).map((roommate, index) => (
                            <Card
                                key={index}
                                cover={
                                    <div
                                        style={{
                                            width: "100%",
                                            height: "200px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            background: isDarkMode
                                                ? "#2f2f2f"
                                                : "#f0f0f0",
                                            borderRadius: "8px 8px 0 0",
                                        }}
                                    >
                                        <UserOutlined
                                            style={{
                                                fontSize: "80px",
                                                color: isDarkMode
                                                    ? "#fff"
                                                    : "#000",
                                            }}
                                        />
                                    </div>
                                }
                                actions={[
                                    <Button key="view">View Profile</Button>,
                                    <Button key="contact">Contact</Button>,
                                ]}
                                style={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
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
                                    title={roommate.name}
                                    description={
                                        <div>
                                            <p>{roommate.preferences}</p>
                                            <p className="text-sm text-gray-500">
                                                {roommate.details.join(", ")}
                                            </p>
                                        </div>
                                    }
                                />
                            </Card>
                        ))}
                    </div>
                    <div className="text-center mb-8">
                        <Button variant="outlined" color="primary">
                            Show More
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainContent;
