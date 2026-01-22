let activityLog = [];
let clickCount = 0;
const CLICK_THRESHOLD = 10;

const logContainer = document.getElementById("activityLog");
const warningMsg = document.getElementById("warningMsg");

/* Utility function to add activity */
function logActivity(type, details, phase) {
    const activity = {
        type: type,
        details: details,
        phase: phase,
        time: new Date().toLocaleTimeString()
    };

    activityLog.push(activity);
    displayActivity(activity);
}

/* Display activity in DOM */
function displayActivity(activity) {
    const div = document.createElement("div");
    div.textContent =
        `[${activity.time}] ${activity.type} - ${activity.details} (${activity.phase})`;
    logContainer.appendChild(div);
    logContainer.scrollTop = logContainer.scrollHeight;
}

/* Click event */
document.addEventListener("click", function (event) {
    clickCount++;
    logActivity("Click", `Target: ${event.target.tagName}`, "Bubbling");

    if (clickCount > CLICK_THRESHOLD) {
        warningMsg.textContent = "⚠ Suspicious Activity: Too many clicks!";
    }
}, false);

/* Click event (capturing) */
document.addEventListener("click", function (event) {
    logActivity("Click", `Target: ${event.target.tagName}`, "Capturing");
}, true);

/* Key press event */
document.addEventListener("keydown", function (event) {
    logActivity("Key Press", `Key: ${event.key}`, "Bubbling");
});

/* Focus event */
document.addEventListener("focusin", function (event) {
    logActivity("Focus", `Focused on: ${event.target.tagName}`, "Bubbling");
});

/* Reset log */
function resetLog() {
    activityLog = [];
    clickCount = 0;
    logContainer.innerHTML = "";
    warningMsg.textContent = "";
}

/* Export log */
function exportLog() {
    let text = "USER ACTIVITY LOG\n\n";
    activityLog.forEach((a, index) => {
        text += `${index + 1}. [${a.time}] ${a.type} - ${a.details} (${a.phase})\n`;
    });

    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "activity_log.txt";
    link.click();
}