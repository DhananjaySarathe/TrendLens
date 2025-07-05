import React from "react";
import ReactDOM from "react-dom";

const App: React.FC = () => {
  const activateSelection = async (): Promise<void> => {
    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (tab.id) {
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["content/overlay.js"],
        });
      }
    } catch (error) {
      console.error("Error activating selection:", error);
    }
  };

  return (
    <div className="p-4 font-sans">
      <h3 className="text-lg font-semibold mb-4">📊 Chart Pattern Detector</h3>
      <button
        onClick={activateSelection}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Activate Selection
      </button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
