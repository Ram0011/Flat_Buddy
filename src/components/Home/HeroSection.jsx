import { Button, Input } from "antd";

const HeroSection = ({ isDarkMode }) => {
    return (
        <div
            className="py-12 rounded-md mb-6 text-center"
            style={{
                background: isDarkMode ? "#262626" : "#ebf8ff",
            }}
        >
            <h2
                className={` text-3xl md:text-3xl lg:text-5xl mb-1 ${
                    isDarkMode
                        ? "text-white"
                        : "bg-gradient-to-r from-blue-950 to-sky-800 bg-clip-text text-transparent"
                }`}
                style={{
                    fontFamily: "Rubik Gemstones",
                    textShadow: isDarkMode
                        ? "1px 1px 2px rgba(0, 0, 0, 0.5)"
                        : "none",
                }}
            >
                Find the Perfect Flat & Roommate
            </h2>
            <p
                className="mb-4 sm:text-md md:text-lg lg:text-xl font-bold"
                style={{ fontFamily: "Indie Flower, cursive" }}
            >
                Smart rentals that match your lifestyle preferences.
            </p>
            <div className="flex justify-center gap-2 mb-4 pt-5 flex-wrap">
                <Input placeholder="Location" style={{ width: 200 }} />
                <Input placeholder="Budget" style={{ width: 120 }} />
                <Button type="primary">Search</Button>
            </div>
            <div className="flex gap-4 justify-center pt-4">
                <Button variant="outlined" color="primary">
                    Search Flats
                </Button>
                <Button variant="outlined" color="primary">
                    Find Roommates
                </Button>
            </div>
        </div>
    );
};

export default HeroSection;
