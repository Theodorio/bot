const express = require('express');
const venom = require('venom-bot');

const app = express();
const PORT = process.env.PORT || 3000;

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Bot is running!');
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// Venom bot setup
venom.create({
    session: 'my-session',
    multidevice: true,
    headless: true,
    chromeFlags: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--window-size=1920,1080'
    ]
})
.then((client) => start(client))
.catch((error) => {
    console.error('Error creating venom client:', error);
});

// Start the WhatsApp bot
function start(client) {
    client.onMessage(async (message) => {
        console.log('Received message:', message); // Log the incoming message

        // Normalize the message body to lowercase for easier comparison
        const msgBody = message.body.toLowerCase();

        if (msgBody === 'hi' && !message.isGroupMsg) {
            await client.sendText(message.from, 'Hello! How can I help you?');
            await showMenu(client, message.from);
        } else if (msgBody === '1' && !message.isGroupMsg) {
            await trackUser Tweets(client, message.from);
        } else if (msgBody === '2' && !message.isGroupMsg) {
            await checkDailyTasks(client, message.from);
        } else if (msgBody === 'menu' && !message.isGroupMsg) {
            await showMenu(client, message.from);
        } else {
            await client.sendText(message.from, 'I\'m sorry, I didn\'t understand that. Type "menu" to see the options.');
        }
    });
}

// Show menu options to the user
async function showMenu(client, from) {
    const menuMessage = `
Please choose an option:
1. Track a user tweets
2. Check Daily tasks
Type the number of your choice or type 'menu' to see this again.
`;
    await client.sendText(from, menuMessage);
}

// Function to track user tweets (placeholder)
async function trackUser Tweets(client, from) {
    await client.sendText(from, 'Tracking user tweets is currently not implemented. Please provide a Twitter username to track.');
}

// Function to check daily tasks (placeholder)
async function checkDailyTasks(client, from) {
    await client.sendText(from, 'Checking daily tasks is currently not implemented. Please check your task list.');
}
