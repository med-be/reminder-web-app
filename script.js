document.addEventListener('DOMContentLoaded', function () {
    const clockElement = document.getElementById('clock');
    const setReminderButton = document.getElementById('setReminderButton');
    const reminderTimeInput = document.getElementById('reminderTime');
    const soundSelector = document.getElementById('soundSelector');
    const reminderSound = document.getElementById('reminderSound');
    const reminderList = document.getElementById('reminderList');
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

    // Play the selected sound immediately when changed
    soundSelector.addEventListener('change', function () {
        reminderSound.src = soundSelector.value;
        reminderSound.play();
    });

    // Function to set a reminder
    setReminderButton.addEventListener('click', function () {
        const time = reminderTimeInput.value;
        if (time) {
            const [hours, minutes] = time.split(':');
            reminderTime = { hours, minutes };
            reminderSound.src = soundSelector.value;

            // Display the reminder time on the screen
            const listItem = document.createElement('li');
            listItem.textContent = `Reminder set for ${hours}:${minutes} with sound: ${soundSelector.selectedOptions[0].text}`;
            reminderList.appendChild(listItem);

            // alert(`Reminder set for ${hours}:${minutes} with sound: ${soundSelector.selectedOptions[0].text}`);
        } else {
            alert('Please select a valid time.');
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
