const cr = chrome.runtime

//Send current URL to background script
cr.sendMessage({
    type: "URL",
    url: window.location.href
});

cr.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "URL") {

        const notifier = document.createElement("div");
        const notifierS = notifier.style;

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

