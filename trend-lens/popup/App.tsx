import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const GEMINI_KEY_STORAGE = "gemini_api_key";

const App: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [inputKey, setInputKey] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    chrome.storage.local.get([GEMINI_KEY_STORAGE], (result) => {
      if (result[GEMINI_KEY_STORAGE]) {
        setApiKey(result[GEMINI_KEY_STORAGE]);
      }
      setLoading(false);
    });
  }, []);

  const handleSave = () => {
    setError("");
    if (!inputKey.trim()) {
      setError("API key cannot be empty.");
      return;
    }
    chrome.storage.local.set({ [GEMINI_KEY_STORAGE]: inputKey.trim() }, () => {
      setApiKey(inputKey.trim());
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  };

  const handleChangeKey = () => {
    setApiKey("");
    setInputKey("");
    setError("");
  };

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 w-64">
        <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></span>
      </div>
    );
  }

  if (!apiKey) {
    return (
      <div className="p-6 w-72 bg-white rounded-xl shadow-lg flex flex-col items-center">
        <div className="mb-4 text-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Google_Gemini_logo.svg"
            alt="Gemini Logo"
            className="h-10 mx-auto mb-2"
          />
          <h2 className="text-xl font-bold mb-1">Enter Gemini API Key</h2>
          <p className="text-gray-500 text-sm">
            To use TrendLens, please provide your Gemini Vision API key.
          </p>
        </div>
        <input
          type="password"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
          placeholder="Paste your Gemini API key..."
          value={inputKey}
          onChange={(e) => setInputKey(e.target.value)}
        />
        {error && <div className="text-red-500 text-xs mb-2">{error}</div>}
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
        >
          Save Key
        </button>
        {saved && <div className="text-green-600 text-xs mt-2">Key saved!</div>}
        <div className="mt-4 text-xs text-gray-400 text-center">
          Your key is stored securely in your browser and never shared.
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 w-72 bg-white rounded-xl shadow-lg flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span role="img" aria-label="chart">
          📊
        </span>{" "}
        TrendLens
      </h3>
      <button
        onClick={activateSelection}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 transition"
      >
        Activate Selection
      </button>
      <button
        onClick={handleChangeKey}
        className="w-full text-xs text-blue-500 hover:underline mt-2"
      >
        Change Gemini API Key
      </button>
      <div className="mt-4 text-xs text-gray-400 text-center">
        Gemini key is set. You can now use the extension.
      </div>
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
