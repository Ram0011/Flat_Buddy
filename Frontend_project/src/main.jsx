import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@ant-design/v5-patch-for-react-19";
import App from "./App.jsx";
import "./index.css";
// import { unstableSetRender } from "antd";

// // Setup Ant Design's patch to use React 19-compatible rendering
// unstableSetRender((node, container) => {
//     container._reactRoot ||= createRoot(container);
//     const root = container._reactRoot;

//     root.render(node);

//     return async () => {
//         await new Promise((resolve) => setTimeout(resolve, 0));
//         root.unmount();
//     };
// });

const rootContainer = document.getElementById("root");
const appElement = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

rootContainer._reactRoot ||= createRoot(rootContainer);
rootContainer._reactRoot.render(appElement);
