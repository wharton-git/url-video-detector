const notifier = document.createElement("div");
const btnDown = document.createElement("div");
const closeBtn = document.createElement("div");
const leftContainer = document.createElement("div");
const rightContainer = document.createElement("div");
const txt = document.createElement("div");
const urlText = document.createElement("div");
const link = document.createElement("link");

//Add CSS to the page
link.rel = "stylesheet";
link.href = chrome.runtime.getURL("notifier.css");
document.head.appendChild(link);

//Add classes to the elements
notifier.className = "notifier";
closeBtn.className = "close-btn";
btnDown.className = "download-btn";
leftContainer.className = "left-container";
rightContainer.className = "right-container";

//Elements DOM events
closeBtn.addEventListener("click", () => {
    notifier.remove();
});

btnDown.addEventListener("click", () => {
    sendParameters();
});

//Send current URL to background script
chrome.runtime.sendMessage({
    type: "URL",
    url: window.location.href
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "URL") {
        txt.innerHTML = `<strong>Video Detected :</strong>`;
        urlText.innerHTML = request.url;
        btnDown.innerHTML = `D`;
        closeBtn.innerHTML = `X`;

        notifier.appendChild(leftContainer);
        notifier.appendChild(rightContainer);
        leftContainer.appendChild(txt);
        leftContainer.appendChild(urlText);
        rightContainer.appendChild(btnDown);
        rightContainer.appendChild(closeBtn);
        document.body.appendChild(notifier);
    }
});

var lastUrl = window.location.href;
// Listen for changes in the URL
setInterval(() => {
    // Check if the URL has changed
    if (window.location.href !== lastUrl) {
        lastUrl = window.location.href;
        // Send the new URL to the background script
        chrome.runtime.sendMessage({
            type: "URL",
            url: lastUrl
        });
    }
}
    , 1000); // Check every second


const sendParameters = async () => {
    await fetch("http://localhost:43214/_yt_", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            url: window.location.href,
        })
    });
};

