//Listens for messages from the content script and sends a message back to the content script if the URL is a YouTube video link.

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "URL" && request.url.includes("https://www.youtube.com/watch?")) {
        chrome.tabs.sendMessage(sender.tab.id, { type: "URL", url: request.url });
    }

    if (request.type === "SEND") {
        sendParameters(request.url);
    }
});

const sendParameters = (url) => {
    fetch("http://localhost:43214/_yt_", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            url: url
        })
    });
};
