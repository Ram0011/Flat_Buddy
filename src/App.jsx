import { useState } from "react";
import { ConfigProvider, theme } from "antd";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";

function App() {
    const { defaultAlgorithm, darkAlgorithm } = theme;
    const [isDarkMode, setIsDarkMode] = useState(false);

    return (
        <ConfigProvider
            theme={{
                algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
            }}
        >
            <Routes>
                <Route
                    path="/"
                    element={
                        <HomePage
                            isDarkMode={isDarkMode}
                            setIsDarkMode={setIsDarkMode}
                        />
                    }
                />
                <Route
                    path="/login"
                    element={
                        <LoginPage
                            isDarkMode={isDarkMode}
                            setIsDarkMode={setIsDarkMode}
                        />
                    }
                />
            </Routes>
        </ConfigProvider>
    );
}

export default App;
