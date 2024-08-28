# Reminder App

A simple, browser-based Reminder App that allows you to set reminders with ease. The app features a real-time clock display, a user-friendly time picker, and the ability to choose from multiple notification sounds. When the reminder time is reached, a notification is displayed along with a customizable sound alert.

## Features

- **Real-Time Clock**: Displays the current time, updated every second.
- **Time Picker**: Set reminders using an intuitive HTML `<input type="time">` element.
- **Sound Selection**: Choose from a list of preloaded notification sounds (`.wav` files) to be played when the reminder triggers.
- **Desktop Notifications**: Receive a desktop notification when the reminder time arrives (requires user permission).
- **Responsive Design**: Simple and clean UI, designed to be accessible on both desktop and mobile browsers.

## Usage

1. **Set Reminder Time**: Use the time picker to select the desired reminder time.
2. **Choose Notification Sound**: Select a notification sound from the dropdown menu.
3. **Set Reminder**: Click the "Set Reminder" button to activate the reminder.
4. **Receive Notification**: When the time arrives, a desktop notification will be shown and the selected sound will play.

## Requirements

- A modern web browser that supports HTML5, CSS3, and JavaScript.
- Permission to show desktop notifications (the app will prompt for this on first use).

## Setup

1. Clone or download the repository.
2. Place the `.wav` notification sound files in the same directory as the HTML file.
3. Open the `index.html` file in your preferred web browser.

## Files

- **index.html**: Main HTML file containing the app's structure.
- **styles.css**: CSS file for styling the app's UI.
- **script.js**: JavaScript file that handles the clock, reminders, and notifications.
- **notification1.wav**, **notification2.wav**, **notification3.wav**: Example sound files for notification alerts.

## License

This project is open-source and available under the MIT License. Feel free to use, modify, and distribute as you see fit.
