//Listens for messages from the content script and sends a message back to the content script if the URL is a YouTube video link.

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "URL" && request.url.includes("https://www.youtube.com/watch?")) {
        chrome.tabs.sendMessage(sender.tab.id, { type: "URL", url: request.url });
    }
});