const cr = chrome.runtime
const location = window.location.href
const notifier = document.createElement("div");

//Send current URL to background script
cr.sendMessage({
    type: "URL",
    url: location
});

var lastUrl = location
// Listen for changes in the URL
setInterval(() => {
    // Check if the URL has changed
    if (location !== lastUrl) {
        lastUrl = location;
        // Send the new URL to the background script
        cr.sendMessage({
            type: "URL",
            url: location
        });
    }
}
    , 1000); // Check every second

cr.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "URL") {
        notifier.innerHTML = `
            <div style="
                position: fixed;
                bottom: 20px; 
                right: 20x; 
                background-color: 'black';
                color: 'white'; 
                padding: 10px; 
                z-index: 9999;
                border-radius: 5px;
            ">
                <strong>Video detected : </strong> ${request.url}
            </div>
        `;
        document.body.appendChild(notifier);
    }
})