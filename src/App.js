import React, {useState} from "react";
import PublicArea from "./components/PublicArea";
import PrivateArea from "./components/PrivateArea";
import "./App.css";

const tabs = [
    {id: "public", label: "Public"},
    {id: "private", label: "Private"}
];

const App = () => {
    const [activeTab, setActiveTab] = useState("public");

    const handleTabClick = (event, tabId) => {
        event.preventDefault(); // Prevents full page reload
        setActiveTab(tabId);
    };

    return (
        <div className="protected-container">
            {/* Navigation Menu */}
            <nav className="tab-container">
                {tabs.map((tab) => (
                    <a
                        key={tab.id}
                        href="#"
                        className={`tab-link ${activeTab === tab.id ? "active-tab" : ""}`}
                        onClick={(event) => handleTabClick(event, tab.id)}
                    >
                        {tab.label}
                    </a>
                ))}
            </nav>

            {activeTab === "public" && <PublicArea/>}
            {activeTab === "private" && <PrivateArea/>}
        </div>
    );
};

export default App;
