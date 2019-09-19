// For loading environment variable from .env file
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    token: process.env.BOT_TOKEN, // Envrionment variable BOT_TOKEN = bot_token_here
    member_flag: process.env.MEMBER_FLAG, // Member flag for joining server
    prefix: '!', // Command prefix
    perms: ['@everyone', 'Member', 'Mod', 'Admin'], // Index corresponds to rank level
    timeout: 3000, // Time to wait before deleting messages
    flag : '🚩' // Flag emoji
};
