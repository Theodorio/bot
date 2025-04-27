const venom = require('venom-bot');

venom.create({
    session: 'my=session',
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

function start(client) {
    client.onMessage(async (message) => {
        console.log('Received message:', message); // Log the incoming message

        // Normalize the message body to lowercase for easier comparison
        const msgBody = message.body.toLowerCase();

        if (msgBody === 'hi' && !message.isGroupMsg) {
            await client.sendText(message.from, 'Hello! How can I help you?');
            await showMenu(client, message.from);
        } else if (msgBody === '1' && !message.isGroupMsg) {
            await trackUserTweets(client, message.from);
        } else if (msgBody === '2' && !message.isGroupMsg) {
            await checkDailyTasks(client, message.from);
        } else if (msgBody === 'menu' && !message.isGroupMsg) {
            await showMenu(client, message.from);
        } else {
            await client.sendText(message.from, 'I\'m sorry, I didn\'t understand that. Type "menu" to see the options.');
        }
    });
}

async function showMenu(client, from) {
    const menuMessage = `
Please choose an option:
1. Track a user tweets
2. Check Daily tasks
Type the number of your choice or type 'menu' to see this again.
`;
    await client.sendText(from, menuMessage);
}

async function trackUserTweets(client, from) {
    // Here you can implement the logic to track user tweets
    // For now, we'll just send a placeholder message
    await client.sendText(from, 'Tracking user tweets is currently not implemented. Please provide a Twitter username to track.');
}

async function checkDailyTasks(client, from) {
    // Here you can implement the logic to check daily tasks
    // For now, we'll just send a placeholder message
    await client.sendText(from, 'Checking daily tasks is currently not implemented. Please check your task list.');
}