chrome.runtime.onInstalled.addListener(() => {
  console.log("Chart Pattern Detector installed.");
});

chrome.runtime.onMessage.addListener(
  (
    message: unknown,
    _sender: chrome.runtime.MessageSender,
    sendResponse: (response?: unknown) => void
  ) => {
    console.log("Message received:", message);
    sendResponse({ status: "Message received" });
  }
);
