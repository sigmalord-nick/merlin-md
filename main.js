require('dotenv').config();
const { default: makeWASocket, useSingleFileAuthState, DisconnectReason } = require('@adiwajshing/baileys');
const { Boom } = require('@hapi/boom');
const fs = require('fs');
const { SESSION_ID } = require('./config');

// Path for Baileys single-file session
const SESSION_FILE_PATH = './session.json';
const { state, saveState } = useSingleFileAuthState(SESSION_FILE_PATH);

// If session.json doesn't exist and SESSION_ID is provided, create the file
if (!fs.existsSync(SESSION_FILE_PATH) && SESSION_ID) {
    try {
        const decoded = Buffer.from(SESSION_ID, 'base64').toString('utf-8');
        fs.writeFileSync(SESSION_FILE_PATH, decoded);
        console.log('Session file created from SESSION_ID');
    } catch (e) {
        console.error('Failed to decode or write session:', e);
    }
}

async function startMerlin() {
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,
        browser: ['MerlinBot', 'Safari', '1.0.0']
    });

    sock.ev.on('creds.update', saveState);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
            console.log('Connection closed. Reason:', reason);
        } else if (connection === 'open') {
            console.log('Merlin MD connected to WhatsApp!');
        }
    });

    // Your plugin loader or commands can go here
    // require('./plugins')(sock) etc.
}

startMerlin();
