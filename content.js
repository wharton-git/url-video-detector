const cr = chrome.runtime
const notifier = document.createElement("div");
const btnDown = document.createElement("div");
const closeBtn = document.createElement("div");
const leftContainer = document.createElement("div");
const rightContainer = document.createElement("div");
const txt = document.createElement("div");
const urlText = document.createElement("div");
const parametersConfPanel = document.createElement("div");
const confPanel = document.createElement("div");
const confPanelS = confPanel.style;
const parametersConfPanelS = parametersConfPanel.style;
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

confPanelS.width = "max-content";
confPanelS.height = "max-content";
confPanelS.backgroundColor = "white";
confPanelS.borderRadius = "5px";
confPanelS.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
confPanelS.padding = "10px";

parametersConfPanelS.position = "fixed";
parametersConfPanelS.display = "flex";
parametersConfPanelS.justifyContent = "center";
parametersConfPanelS.alignItems = "center";
parametersConfPanelS.zIndex = "19999";
parametersConfPanelS.top = "0";
parametersConfPanelS.left = "0";
parametersConfPanelS.width = "100vw";
parametersConfPanelS.height = "100vh";
parametersConfPanelS.backgroundColor = "rgba(0, 0, 0, 0.8)";


//Elements DOM events
closeBtn.addEventListener("click", () => {
    notifier.remove();
});

btnDown.addEventListener("click", () => {

    confPanel.innerHTML = `Choisi la qualité de la video à télécharger :`

    parametersConfPanel.appendChild(confPanel);
    document.body.appendChild(parametersConfPanel);
});

parametersConfPanel.addEventListener("click", () => {
    parametersConfPanel.remove();
});

//Send current URL to background script
cr.sendMessage({
    type: "URL",
    url: window.location.href
});

cr.onMessage.addListener((request, sender, sendResponse) => {
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
})

var lastUrl = window.location.href
// Listen for changes in the URL
setInterval(() => {
    // Check if the URL has changed
    if (window.location.href !== lastUrl) {
        lastUrl = window.location.href;
        // Send the new URL to the background script
        cr.sendMessage({
            type: "URL",
            url: lastUrl
        });
    }
}
    , 1000); // Check every second

