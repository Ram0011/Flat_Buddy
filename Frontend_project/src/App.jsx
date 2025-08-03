import { useState } from "react";
import { ConfigProvider, List, theme } from "antd";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Authentication/LoginPage.jsx";
import HomePage from "./pages/Home/HomePage.jsx";
import IntroPage from "./pages/Intro/IntroPage.jsx";
import ListingPage from "./pages/Listing/ListingPage.jsx";
import ProfilePage from "./pages/Profile/ProfilePage.jsx";
import RoommatesPage from "./pages/Roommates/RoommatesPage.jsx";
import FlatDetailsPage from "./pages/FlatDetails/FlatDetailsPage.jsx";

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
                        <IntroPage
                            isDarkMode={isDarkMode}
                            setIsDarkMode={setIsDarkMode}
                        />
                    }
                />
                <Route
                    path="/home"
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
                <Route
                    path="/listings"
                    element={
                        <ListingPage
                            isDarkMode={isDarkMode}
                            setIsDarkMode={setIsDarkMode}
                        />
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProfilePage
                            isDarkMode={isDarkMode}
                            setIsDarkMode={setIsDarkMode}
                        />
                    }
                />
                <Route
                    path="/roommates"
                    element={
                        <RoommatesPage
                            isDarkMode={isDarkMode}
                            setIsDarkMode={setIsDarkMode}
                        />
                    }
                />
                <Route
                    path="/flats/:id"
                    element={
                        <FlatDetailsPage
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
