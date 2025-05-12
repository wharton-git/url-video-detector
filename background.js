// Écoute les messages du content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "URL" && request.url.includes("https://www.youtube.com/watch?")) {
        chrome.tabs.sendMessage(sender.tab.id, { type: "URL", url: request.url });
    }

    if (request.type === "SEND") {
        sendParameters(request.url)
            .then((data) => {
                sendResponse({ success: true, data: data });
            })
            .catch((error) => {
                sendResponse({ success: false, error: error.message });
            });
        return true; // Indique que sendResponse sera appelé de manière asynchrone
    }
});

const sendParameters = async (url) => {
    const response = await fetch("http://localhost:43214/_yt_", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            url: url
        })
    });

    if (!response.ok) {
        throw new Error("Erreur réseau");
    }

    const data = await response.json();
    return data.message;
};