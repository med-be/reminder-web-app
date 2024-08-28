document.addEventListener('DOMContentLoaded', function () {
    const clockElement = document.getElementById('clock');
    const setReminderButton = document.getElementById('setReminderButton');
    const reminderSound = document.getElementById('reminderSound');
    let reminderTime = null;

    // Function to update the clock
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;

        // Check if it's time for the reminder
        if (reminderTime && hours === reminderTime.hours && minutes === reminderTime.minutes) {
            sendNotification();
            reminderTime = null; // Reset reminder after it triggers
        }
    }

    // Function to set a reminder
    setReminderButton.addEventListener('click', function () {
        const time = prompt('Set reminder time (HH:MM)');
        if (time && /^([01]\d|2[0-3]):([0-5]\d)$/.test(time)) {
            const [hours, minutes] = time.split(':');
            reminderTime = { hours, minutes };
            alert(`Reminder set for ${hours}:${minutes}`);
        } else {
            alert('Invalid time format. Please enter time as HH:MM.');
        }
    });

    // Function to send a notification with sound
    function sendNotification() {
        if (Notification.permission === 'granted') {
            new Notification('Reminder', {
                body: 'It\'s time!',
                icon: 'https://via.placeholder.com/100',
            });
        }
        reminderSound.play();
    }

    // Request notification permission
    if (Notification.permission !== 'granted') {
        Notification.requestPermission().then(permission => {
            if (permission === 'denied') {
                alert('Please enable notifications to receive reminders.');
            }
        });
    }

    // Update the clock every second
    setInterval(updateClock, 1000);
});
