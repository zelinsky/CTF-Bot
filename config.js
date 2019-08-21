const dotenv = require('dotenv')
dotenv.config()
module.exports = {
    token: process.env.BOT_TOKEN,
    prefix: '!',
    perms: ['@everyone', 'Member', 'Mod', 'Admin'],
    timeout: 3000
}
