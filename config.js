const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

// Utility function
function convertToBool(text, fault = 'true') {
    return text === fault;
}

module.exports = {
    SESSION_ID: process.env.SESSION_ID || "PASTE_YOUR_BASE64_SESSION_HERE",

    AUTO_READ_STATUS: convertToBool(process.env.AUTO_READ_STATUS || "true"),
    MODE: process.env.MODE || "public",

    AUTO_VOICE: convertToBool(process.env.AUTO_VOICE || "false"),
    AUTO_STICKER: convertToBool(process.env.AUTO_STICKER || "false"),
    AUTO_REPLY: convertToBool(process.env.AUTO_REPLY || "false"),

    ALIVE_IMG: process.env.ALIVE_IMG || "https://files.catbox.moe/Imf87b.jpg",
    MENU_IMG: process.env.MENU_IMG || "https://files.catbox.moe/ut7n88.jpg",
    ALIVE_MSG: process.env.ALIVE_MSG || "Hi How Can Merlin Assist You.",

    ANTI_LINK: convertToBool(process.env.ANTI_LINK || "true"),
    ANTI_BAD: convertToBool(process.env.ANTI_BAD || "true"),

    PREFIX: process.env.PREFIX || ".",
    FAKE_RECORDING: convertToBool(process.env.FAKE_RECORDING || "false"),
    FAKE_TYPING: convertToBool(process.env.FAKE_TYPING || "true"),

    ALWAYS_ONLINE: convertToBool(process.env.ALWAYS_ONLINE || "true"),
    CURRENT_STATUS: process.env.CURRENT_STATUS || "Merlin Online!",

    AUTO_REACT: convertToBool(process.env.AUTO_REACT || "false"),
    HEART_REACT: convertToBool(process.env.HEART_REACT || "false"),

    BOT_NAME: process.env.BOT_NAME || "merlin-md",
    OMDB_API_KEY: process.env.OMDB_API_KEY || "76cb7f39" // Example key
};
