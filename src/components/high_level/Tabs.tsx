import React, { useContext, useState } from "react";
import "./tabs.css";
import { ImageContext } from "../../App";
import { applyCurrentImage } from "../../utils/image_state_manager";
import Modal from "../Modal";
import { colors } from "../../constants/theme";

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
      {/* Tabs */}
      <div className="tab-group" style={{ background: colors.secondary }}>
        {tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => setSelectedTab(index)}
            className={`tab ${selectedTab === index ? "active-tab" : ""}`}
            style={{
              color:
                selectedTab === index ? colors.secondary : colors.textPrimary,
              backgroundColor:
                selectedTab === index ? colors.primary : "transparent",
                boxShadow: selectedTab === index ? `0 4px 6px ${colors.primary}` : "",
            }}
          >
            {tab.icon}
            <div className="tooltip">{tab.label}</div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div
        className="content-container"
        style={{
          scrollbarColor: `${colors.primary} transparent`,
          backgroundColor: colors.secondary,
        }}
      >
        <div className="content">{tabs[selectedTab].content}</div>

        {imageState?.state.currentImage && (
          <div className="commit-panel">
            <button
              className="apply-button"
              onClick={() => setModalState(true)}
            >
              Apply
            </button>
            <button className="revert-button">Revert</button>
          </div>
        )}
      </div>

      {modalState ? (
        <Modal closeModal={closeModal} onApply={applyChanges} />
      ) : null}
    </div>
  );
};

export default VerticalTabs;
