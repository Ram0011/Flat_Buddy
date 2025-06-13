import { Switch } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const HeaderComponent = ({ isDarkMode, setIsDarkMode }) => {
    const navigate = useNavigate();

    const handleToggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <header
            className={`${
                isDarkMode ? "bg-gray-800" : "bg-white"
            } shadow-md py-4 px-4`}
            style={{ backgroundColor: "#131D4F" }}
        >
            <div className="container mx-auto flex justify-between items-center">
                <div
                    className="flex items-center cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    <img
                        src="/logo.svg"
                        alt="Smart Rentals Logo"
                        className="h-8 mr-2"
                    />
                    <h1
                        style={{
                            fontFamily: "Edu NSW ACT Hand Prescript, cursive",
                            color: "white",
                        }}
                        className="text-2xl"
                    >
                        Smart Rentals
                    </h1>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-white">
                        {isDarkMode ? "Dark Mode" : "Light Mode"}
                    </span>
                    <Switch
                        checked={isDarkMode}
                        onChange={handleToggleDarkMode}
                        checkedChildren={<MoonOutlined />}
                        unCheckedChildren={<SunOutlined />}
                    />
                </div>
            </div>
        </header>
    );
};

export default HeaderComponent;
