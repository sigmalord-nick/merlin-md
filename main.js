const { default: makeWASocket, useMultiFileAuthState, makeWALegacySocket, fetchLatestBaileysVersion, useSingleFileAuthState } = require('@whiskeysockets/baileys');
const { delay } = require('@whiskeysockets/baileys/lib/Utils');
const P = require('pino');

async function startMerlinBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: false,
        logger: P({ level: 'info' }),
        browser: ['MerlinBot', 'Safari', '1.0.0'],
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, pairingCode } = update;

        if (pairingCode) {
            console.log(`\nPair this device with WhatsApp using the code: ${pairingCode}\n`);
        }

        if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== 401;
            console.log('Connection closed. Reconnecting...', shouldReconnect);
            if (shouldReconnect) {
                await delay(2000);
                startMerlinBot();
            }
        } else if (connection === 'open') {
            console.log('Merlin bot connected using pairing code!');
        }
    });

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message) return;
        console.log("Received a message from:", msg.key.remoteJid);
    });
}

startMerlinBot();
