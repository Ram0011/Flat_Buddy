import { Layout } from "antd";

const { Footer } = Layout;

const FooterComponent = ({ isDarkMode }) => {
    return (
        <Footer
            style={{
                textAlign: "center",
                background: isDarkMode ? "#141414" : "#131D4F",
                color: "#fff",
                padding: "24px 48px",
            }}
        >
            <div>
                <h3
                    style={{
                        fontFamily: "Edu NSW ACT Hand Prescript, cursive",
                        fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
                        marginBottom: "38px",
                    }}
                >
                    Smart Rentals
                </h3>
                <p
                    style={{
                        fontFamily: "Sour Gummy",
                        fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
                        marginBottom: "12px",
                    }}
                >
                    A project to help you find the perfect flat and roommate.
                    Built with passion to simplify your rental journey.
                </p>
                <p
                    style={{
                        fontFamily: "Sour Gummy",
                        fontSize: "clamp(0.8rem, 1.8vw, 1rem)",
                        marginBottom: "38px",
                    }}
                >
                    Created by: Ayushi, Rohan, Tushar, Ramprakash
                </p>
                <p
                    style={{
                        fontFamily: "Roboto",
                        fontSize: "clamp(0.7rem, 1.5vw, 0.9rem)",
                        marginTop: "16px",
                    }}
                >
                    © 2025 Smart Rentals Project. All rights reserved.
                </p>
            </div>
        </Footer>
    );
};

export default FooterComponent;
