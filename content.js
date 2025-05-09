const cr = chrome.runtime
const currentLocation = window.location.href
const notifier = document.createElement("div");
const notifierS = notifier.style;

//Send current URL to background script
cr.sendMessage({
    type: "URL",
    url: currentLocation
});

var lastUrl = currentLocation
// Listen for changes in the URL
setInterval(() => {
    // Check if the URL has changed
    if (currentLocation !== lastUrl) {
        lastUrl = currentLocation;
        // Send the new URL to the background script
        cr.sendMessage({
            type: "URL",
            url: currentLocation
        });
    }
}
    , 1000); // Check every second

cr.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "URL") {
        notifierS.position = "fixed";
        notifierS.bottom = "20px";
        notifierS.right = "20px";
        notifierS.color = "white";
        notifierS.zIndex = "9999";
        notifierS.borderRadius = "5px";
        notifierS.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
        notifier.innerHTML = `
            <div style="
                padding: 10px; 
                background-color: black;
            ">
                <strong>Video detected : </strong> ${request.url}
            </div>
        `;
        document.body.appendChild(notifier);
    }
})