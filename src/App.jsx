import { useState } from "react";
import { ConfigProvider, theme, Button, Card } from "antd";
import AnchorNavbar from "./components/Home/AnchorNavbar.jsx";

function App() {
    const { defaultAlgorithm, darkAlgorithm } = theme;
    const [isDarkMode, setIsDarkMode] = useState(false);
    const handleClick = () => {
        setIsDarkMode((previousValue) => !previousValue);
    };

    return (
        <ConfigProvider
            theme={{
                algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
            }}
        >
            {/* props passing */}
            <AnchorNavbar
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
            />
        </ConfigProvider>
    );
}

export default App;
