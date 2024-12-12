import React, { useContext, useState } from "react";
import "./tabs.css";
import { ImageContext } from "../../App";
import { applyCurrentImage } from "../../utils/image_state_manager";
import Modal from "../Modal";

interface Tab {
  label: string;
  content: JSX.Element;
  icon: JSX.Element;
}

const VerticalTabs: React.FC<{ tabs: Tab[] }> = ({ tabs }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [modalState, setModalState] = useState(false);

  const imageState = useContext(ImageContext);
  console.log("new image state after apply: ", imageState?.state);

  function closeModal() {
    setModalState(false);
  }

  function applyChanges() {
    if (imageState) {
      applyCurrentImage(imageState.setState);
      setModalState(false);
    }
  }

  return (
    <div className="parent">
      {/* Content */}
      <div className="content">
        {tabs[selectedTab].content}

        {imageState?.state.currentImage && (
          <div className="commit-panel">
            <button
              style={{
                backgroundColor: "#4caf50",
                transition: "background-color 0.3s",
              }}
              onClick={() => setModalState(true)}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#4caf50")}
            >
              Apply
            </button>
            <button
              style={{
                backgroundColor: "#f44336",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#e53935")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#f44336")}
            >
              Revert
            </button>
          </div>
        )}
      </div>

      {modalState ? (
        <Modal closeModal={closeModal} onApply={applyChanges} />
      ) : null}

      {/* Tabs */}
      <div className="tab-group">
        {tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => setSelectedTab(index)}
            className="tab"
            style={{
              backgroundColor:
                selectedTab === index ? "#3B82F6" : "transparent",
              color: selectedTab === index ? "#FFFFFF" : "#A0AEC0",
              boxShadow:
                selectedTab === index
                  ? "0 4px 6px rgba(59, 130, 246, 0.3)"
                  : "none",
            }}
          >
            {tab.icon}
            <div className="tooltip">{tab.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalTabs;
