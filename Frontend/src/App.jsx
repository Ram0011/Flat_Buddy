import { useState } from "react";
import { ConfigProvider, List, theme } from "antd";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Authentication/LoginPage.jsx";
import NeedFlatPage from "./pages/NeedFlatPage/NeedFlatPage.jsx";
import IntroPage from "./pages/Intro/IntroPage.jsx";
import ProfilePage from "./pages/Profile/ProfilePage.jsx";
import RoommatesPage from "./pages/Roommates/RoommatesPage.jsx";
import FlatDetailsPage from "./pages/FlatDetails/FlatDetailsPage.jsx";
import OwnerListing from "./pages/OwnerListing/OwnerListing.jsx";
import FrontPage from "./pages/FrontPage/FrontPage.jsx";
import OwnerPage from "./pages/Owner/OwnerPage.jsx";
import NeedFlatDetail from "./pages/NeedFlatDetail/NeedFlatDetail.jsx";
import OwnerPropertyDetails from "./pages/OwnerPropertyDetails/OwnerPropertyDetails.jsx";
import ListerPage from "./pages/ListerPage/ListerPage.jsx";
import ListerPropertyListing from "./pages/ListerPropertyListing/ListerPropertyListing.jsx";

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
                    path="/login"
                    element={
                        <LoginPage
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
                <Route
                    path="/owner-listing"
                    element={
                        <OwnerListing
                            isDarkMode={isDarkMode}
                            setIsDarkMode={setIsDarkMode}
                        />
                    }
                />
                <Route
                    path="/front-page"
                    element={
                        <FrontPage
                            isDarkMode={isDarkMode}
                            setIsDarkMode={setIsDarkMode}
                        />
                    }
                />
                <Route
                    path="/owner"
                    element={
                        <OwnerPage
                            isDarkMode={isDarkMode}
                            setIsDarkMode={setIsDarkMode}
                        />
                    }
                />
                <Route
                    path="/need-flat"
                    element={
                        <NeedFlatPage
                            isDarkMode={isDarkMode}
                            setIsDarkMode={setIsDarkMode}
                        />
                    }
                />
                <Route
                    path="/need-flat/:propertyid"
                    element={
                        <NeedFlatDetail
                            isDarkMode={isDarkMode}
                            setIsDarkMode={setIsDarkMode}
                        />
                    }
                />
                <Route
                    path="/owner/property/:propertyid"
                    element={
                        <OwnerPropertyDetails
                            isDarkMode={isDarkMode}
                            setIsDarkMode={setIsDarkMode}
                        />
                    }
                />
                <Route
                    path="/lister"
                    element={
                        <ListerPage
                            isDarkMode={isDarkMode}
                            setIsDarkMode={setIsDarkMode}
                        />
                    }
                />
                <Route
                    path="/lister-property-listing"
                    element={
                        <ListerPropertyListing
                            isDarkMode={isDarkMode}
                            setIsDarkMode={setIsDarkMode}
                        />
                    }
                />
                <Route
                    path="/seek-flat"
                    element={
                        <NeedFlatPage
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
