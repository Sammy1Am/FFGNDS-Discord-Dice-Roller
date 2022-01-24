const functions = require('./');

async function commands({ client, message, params, command, desc, channelEmoji, prefix }) {
    switch(command) {
        //Character Tracker
        case 'character':
        case 'char':
            await functions.char({ client, message, params, channelEmoji });
            break;
        // help module
        case 'help':
        case 'h':
            functions.help({ client, message, params, prefix });
            break;
        // Roll the dice command
        case 'roll':
        case 'r':
            await functions.roll({ client, message, params, channelEmoji, desc }).roll;
            break;
        case 'reroll':
        case 'rr':
            await functions.reroll({ client, message, params, channelEmoji });
            break;
    }
}

module.exports = commands;
