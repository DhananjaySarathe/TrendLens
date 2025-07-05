chrome.runtime.onInstalled.addListener(() => {
  console.log("Chart Pattern Detector installed.");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received:", message);
  sendResponse({ status: "Message received" });
});