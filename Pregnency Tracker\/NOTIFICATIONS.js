document.addEventListener('DOMContentLoaded', function() {
    // Request notification permission
    if ("Notification" in window) {
        Notification.requestPermission();
    }

    // Set up reminder interval (5 hours)
    setInterval(checkAndNotify, 5 * 60 * 60 * 1000);
});

function checkAndNotify() {
    if (Notification.permission === "granted") {
        const vitals = JSON.parse(localStorage.getItem('vitals') || '[]');
        const lastEntry = vitals[vitals.length - 1];
        
        // Check if last entry was more than 5 hours ago
        if (!lastEntry || new Date() - new Date(lastEntry.date) > 5 * 60 * 60 * 1000) {
            new Notification("Time to log your vitals!", {
                body: "Stay on top of your health. Please update your vitals now!",
                icon: "https://cdn.jsdelivr.net/npm/feather-icons/dist/icons/heart.svg"
            });
        }
    }
}

// Function to check if it's time for a reminder
function shouldRemind() {
    const lastReminder = localStorage.getItem('lastReminder');
    if (!lastReminder) return true;
    
    const timeSinceLastReminder = new Date() - new Date(lastReminder);
    return timeSinceLastReminder >= 5 * 60 * 60 * 1000; // 5 hours
}

// Update last reminder time
function updateLastReminder() {
    localStorage.setItem('lastReminder', new Date().toISOString());
}
