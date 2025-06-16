import React from "react";
import { Modal } from "antd";

const RoommateModals = ({
    isDarkMode,
    isModalOpen,
    setIsModalOpen,
    contactModalOpen,
    setContactModalOpen,
    selectedRoommate,
    setSelectedRoommate,
    navigate,
}) => {
    const handleOk = () => {
        console.log("User logged out - navigating to /login");
        setIsModalOpen(false);
        setTimeout(() => navigate("/login"), 0);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleContactModalOk = () => {
        if (selectedRoommate && selectedRoommate.phoneNumber) {
            window.location.href = `tel:${selectedRoommate.phoneNumber}`;
        }
        setContactModalOpen(false);
        setSelectedRoommate(null);
    };

    const handleContactModalCancel = () => {
        setContactModalOpen(false);
        setSelectedRoommate(null);
    };

    return (
        <>
            <Modal
                title="Confirm Logout"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Are you sure you want to logout?</p>
            </Modal>
            <Modal
                title={`Contact ${selectedRoommate?.name || ""}`}
                open={contactModalOpen}
                onOk={handleContactModalOk}
                onCancel={handleContactModalCancel}
                okText="Call Now"
                cancelText="Close"
            >
                <p>
                    Phone Number:{" "}
                    <a href={`tel:${selectedRoommate?.phoneNumber}`}>
                        {selectedRoommate?.phoneNumber || "N/A"}
                    </a>
                </p>
            </Modal>
        </>
    );
};

export default RoommateModals;
