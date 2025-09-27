import { Modal } from "antd";
import { motion } from "framer-motion";

const modalVariants = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const LogoutModal = ({ open, onCancel, onConfirm }) => {
    return (
        <motion.div
            variants={modalVariants}
            initial="hidden"
            animate={open ? "visible" : "hidden"}
        >
            <Modal
                title="Confirm Logout"
                open={open}
                onOk={onConfirm}
                onCancel={onCancel}
                okText="Logout"
                cancelText="Cancel"
                okButtonProps={{ danger: true }}
            >
                <p>Are you sure you want to logout?</p>
            </Modal>
        </motion.div>
    );
};

export default LogoutModal;
