import React from "react";
import ReactDOM from "react-dom";

function App() {
  const activateSelection = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content/overlay.js"]
    });
  };

  return (
    <div style={{ padding: '10px', fontFamily: 'Arial' }}>
      <h3>📊 Chart Pattern Detector</h3>
      <button onClick={activateSelection}>Activate Selection</button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
