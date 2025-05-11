const notifier = document.createElement("div");
const btnDown = document.createElement("div");
const closeBtn = document.createElement("div");
const leftContainer = document.createElement("div");
const rightContainer = document.createElement("div");
const txt = document.createElement("div");
const urlText = document.createElement("div");
const txtS = txt.style;
const rightContainerS = rightContainer.style;
const leftContainerS = leftContainer.style;
const closeBtnS = closeBtn.style;
const notifierS = notifier.style;
const btnDownS = btnDown.style;

//Elements styles
notifierS.position = "fixed";
notifierS.display = "flex";
notifierS.flexDirection = "row";
notifierS.alignItems = "center";
notifierS.bottom = "20px";
notifierS.right = "20px";
notifierS.color = "white";
notifierS.zIndex = "9999";
notifierS.borderRadius = "5px";
notifierS.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
notifierS.backgroundColor = "rgba(0, 0, 0, 0.8)";
notifierS.overflow = "hidden";

closeBtnS.backgroundColor = "";
closeBtnS.color = "white";
closeBtnS.padding = "5px";
closeBtnS.width = "50%";
closeBtnS.height = "100%";
closeBtnS.textAlign = "center";
closeBtnS.cursor = "pointer";
closeBtnS.display = "flex";
closeBtnS.alignItems = "center";
closeBtnS.justifyContent = "center";
closeBtnS.borderRadius = "50%";

btnDownS.backgroundColor = "#44B852";
btnDownS.color = "white";
btnDownS.padding = "5px";
btnDownS.width = "50%";
btnDownS.height = "100%";
btnDownS.textAlign = "center";
btnDownS.cursor = "pointer";
btnDownS.display = "flex";
btnDownS.alignItems = "center";
btnDownS.justifyContent = "center";

leftContainerS.width = "80%";
leftContainerS.display = "flex";
leftContainerS.flexDirection = "column";
leftContainerS.alignItems = "flex-start";
leftContainerS.padding = "5px";
leftContainerS.overflow = "hidden";
leftContainerS.textOverflow = "ellipsis";
leftContainerS.whiteSpace = "nowrap";

rightContainerS.width = "20%";
rightContainerS.display = "flex";
rightContainerS.height = "100%";


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