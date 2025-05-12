const notifier = document.createElement("div");
const btnDown = document.createElement("div");
const closeBtn = document.createElement("div");
const leftContainer = document.createElement("div");
const rightContainer = document.createElement("div");
const txt = document.createElement("div");
const urlText = document.createElement("div");
const link = document.createElement("link");

// Add CSS to the page
link.rel = "stylesheet";
link.href = chrome.runtime.getURL("notifier.css");
document.head.appendChild(link);

// Add classes to the elements
notifier.className = "notifier";
closeBtn.className = "close-btn";
btnDown.className = "download-btn";
leftContainer.className = "left-container";
rightContainer.className = "right-container";

// Check if URL is HTTPS
const isHTTPS = (url) => {
    return url.startsWith("https://");
};

// Initialize notifier UI
const initNotifier = (url) => {
    txt.innerHTML = `<strong>Video Detected :</strong>`;
    urlText.textContent = url; // Use textContent instead of innerHTML for security
    btnDown.textContent = `D`;
    closeBtn.textContent = `X`;

    notifier.appendChild(leftContainer);
    notifier.appendChild(rightContainer);
    leftContainer.appendChild(txt);
    leftContainer.appendChild(urlText);
    rightContainer.appendChild(btnDown);
    rightContainer.appendChild(closeBtn);
    document.body.appendChild(notifier);
};

// Close notifier
closeBtn.addEventListener("click", () => {
    notifier.remove();
});

// Download button click handler
btnDown.addEventListener("click", () => {
    if (isHTTPS(window.location.href)) {
        chrome.runtime.sendMessage(
            { type: "SEND", url: window.location.href },
            (response) => {
                if (chrome.runtime.lastError) {
                    alert(`Error: ${chrome.runtime.lastError.message}`);
                    return;
                }
                if (response?.success) {
                    alert("Reponse :" + response.data);
                } else {
                    alert(response?.error || "Unknown error");
                }
            }
        );
    } else {
        alert("Only HTTPS URLs are allowed for security reasons.");
    }
});

// Send current URL to background script when YouTube video is detected
const sendUrlToBackground = () => {
    if (window.location.href.includes("https://www.youtube.com/watch?")) {
        chrome.runtime.sendMessage({ type: "URL", url: window.location.href });
    }
};

// Initial check
sendUrlToBackground();

// Listen for URL changes using MutationObserver (more efficient than setInterval)
let lastUrl = window.location.href;
const observeUrlChanges = () => {
    const observer = new MutationObserver(() => {
        if (window.location.href !== lastUrl) {
            lastUrl = window.location.href;
            sendUrlToBackground();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
};

observeUrlChanges();

// Listen for messages from background.js
chrome.runtime.onMessage.addListener((request) => {
    if (request.type === "URL") {
        initNotifier(request.url);
    }
});