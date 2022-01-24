const emojiFile = require('../config/emoji.json');

const emoji = (string, type = 'swrpg') => emojiFile[type][string];

module.exports = emoji;
