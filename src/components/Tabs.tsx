import React, { useState } from "react";
import "./tabs.css";

interface Tab {
    label: string;
    content: JSX.Element;
    icon: JSX.Element;
}

const VerticalTabs: React.FC<{ tabs: Tab[] }> = ({ tabs }) => {
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <div
            style={{
                display: "flex",
                height: "100vh",
                backgroundColor: "#2A2A40", // Dark mode background
                color: "#FFFFFF",
                fontFamily: "Arial, sans-serif",
            }}
        >
            {/* Content */}
            <div
                style={{
                    flex: 1,
                    padding: "20px",
                    overflowY: "auto",
                }}
            >
                {tabs[selectedTab].content}
            </div>

            {/* Tabs */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    // width: "80px", // Default width for icons
                    backgroundColor: "#1E1E2E", // Slightly lighter dark for the tab section
                    padding: "10px",
                    paddingTop: "20px",
                    boxShadow: "-2px 0px 10px rgba(0, 0, 0, 0.5)",
                    alignItems: "center",
                    position: "relative",
                }}
            >
                {tabs.map((tab, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedTab(index)}
                        className="tab"
                        style={{
                            position: "relative",
                            padding: "15px 10px",
                            marginBottom: "20px",
                            cursor: "pointer",
                            borderRadius: "8px",
                            backgroundColor:
                                selectedTab === index ? "#3B82F6" : "transparent", // Highlight selected tab
                            color: selectedTab === index ? "#FFFFFF" : "#A0AEC0", // Text color
                            transition: "all 0.3s ease",
                            boxShadow:
                                selectedTab === index
                                    ? "0 4px 6px rgba(59, 130, 246, 0.3)"
                                    : "none", // Cool shadow for selected tab
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {tab.icon}
                        <div
                            style={{
                                position: "absolute",
                                top: "50%",
                                right: "140%",
                                transform: "translateY(-50%)",
                                backgroundColor: "#3B82F6",
                                color: "#FFFFFF",
                                padding: "5px 15px",
                                borderRadius: "8px",
                                whiteSpace: "nowrap",
                                pointerEvents: "none",
                                transition: "opacity 0.3s ease",
                                fontSize: "14px",
                                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                            }}
                            className="tooltip"
                        >
                            {tab.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VerticalTabs;
