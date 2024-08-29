document.addEventListener('DOMContentLoaded', function () {
    const clockElement = document.getElementById('clock');
    const setReminderButton = document.getElementById('setReminderButton');
    const reminderTimeInput = document.getElementById('reminderTime');
    const soundSelector = document.getElementById('soundSelector');
    const reminderSound = document.getElementById('reminderSound');
    const reminderList = document.getElementById('reminderList');
    let reminderTime = null;
    let editingItem = null;

    // Function to update the clock
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;

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

    // Function to set or update a reminder
    function setReminder(time, sound, item) {
        const [hours, minutes] = time.split(':');
        reminderTime = { hours, minutes };
        reminderSound.src = sound;

        if (item) {
            // Update existing item
            item.querySelector('.reminder-time').textContent = `Reminder set for ${hours}:${minutes}`;
            item.querySelector('.reminder-sound').textContent = `Sound: ${soundSelector.selectedOptions[0].text}`;
        } else {
            // Create new item
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span class="reminder-time">Reminder set for ${hours}:${minutes}</span>
                <button class="btn-edit">Edit</button>
                <button class="btn-delete">Delete</button>
            `;
            listItem.querySelector('.btn-edit').addEventListener('click', function () {
                reminderTimeInput.value = time;
                soundSelector.value = sound;
                editingItem = listItem;
            });
            listItem.querySelector('.btn-delete').addEventListener('click', function () {
                reminderList.removeChild(listItem);
            });
            reminderList.appendChild(listItem);
        }
    }

    // Function to handle setting or updating a reminder
    setReminderButton.addEventListener('click', function () {
        const time = reminderTimeInput.value;
        const sound = soundSelector.value;
        if (time) {
            if (editingItem) {
                setReminder(time, sound, editingItem);
                editingItem = null;
            } else {
                setReminder(time, sound);
            }
            // alert(`Reminder set for ${time} with sound: ${soundSelector.selectedOptions[0].text}`);
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
