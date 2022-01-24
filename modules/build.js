const fs = require('fs');
const config = require('../config.json');

const l5rDice = [
    'black', 'blacks', 'blackst', 'blacket', 'blacko', 'blackot',
    'white', 'whites', 'whiteso', 'whitest', 'whitee', 'whiteet', 'whiteo',
    'success', 'opportunity', 'explosiveSuccess', 'strife', 'whiteHex',
    'blackgif', 'whitegif'
];
const swiaDice = [
    'yellowhss', 'yellows', 'yellowsxx', 'yellowhxx', 'yellowhsx', 'yellowhhx',
    'greenhhx', 'greenhsx', 'greensx', 'greenhsxx', 'greenhhxx', 'greenhhxxx',
    'bluesxx', 'bluehxx', 'bluehsxxx', 'bluehhxxx', 'bluehhxxxx', 'bluehxxxxx',
    'redh', 'redhhs', 'redhh', 'redhh', 'redhhh', 'redhhh',
    'blacke', 'blackb', 'blackb', 'blackbb', 'blackbb', 'blackbbb',
    'whitez', 'whitee', 'whiteb', 'whiteeb', 'whiteeb', 'whited',
    'hit', 'surge', 'evade', 'block', 'dodge', 'distance',
    'yellowgif','greengif','bluegif','redgif','blackgif','whitegif'
];
const dice = [
    'yellow',
    'yellows',
    'yellowss',
    'yellowa',
    'yellowsa',
    'yellowaa',
    'yellowr',
    'green',
    'greens',
    'greenss',
    'greena',
    'greensa',
    'greenaa',
    'blue',
    'blues',
    'bluesa',
    'blueaa',
    'bluea',
    'red',
    'redf',
    'redff',
    'redt',
    'redft',
    'redtt',
    'redd',
    'purple',
    'purplef',
    'purpleff',
    'purplet',
    'purplett',
    'purpleft',
    'black',
    'blackf',
    'blackt',
    'whiten',
    'whitenn',
    'whitel',
    'whitell',
    'success',
    'advantage',
    'triumph',
    'failure',
    'threat',
    'despair',
    'lightpip',
    'darkpip',
    'lightside',
    'darkside',
    'purplediamond',
    'yellowgif',
    'greengif',
    'bluegif',
    'redgif',
    'purplegif',
    'blackgif',
    'whitegif'
];

const build = async (client) => {
    const swrpg = await getEmoji('swrpg', client, dice);
    const genesys = await getEmoji('genesys', client, dice);
    const swrpgPatreon = await getEmoji('swrpgPatreon', client, dice);
    const genesysPatreon = await getEmoji('genesysPatreon', client, dice);
    const l5r = await getEmoji('l5r', client, l5rDice);
    const l5rPatreon = await getEmoji('l5rPatreon', client, l5rDice);
    const swia = await getEmoji('swia', client, swiaDice);
    fs.writeFile(`./emoji.json`, JSON.stringify({
        swrpg,
        swrpgPatreon,
        genesys,
        genesysPatreon,
        l5r,
        l5rPatreon,
        swia
    }), () => console.log('The file has been saved!'));
};

const getEmoji = async (channelEmoji, client, list) => {
    return await findEmoji({ list, client, channelEmoji });
};

const find = (c, { list, guildID }) => {
    const guild = c.guilds.cache.get(guildID);
    if (!guild) return;
    let final = {};
    list.forEach(emojiName => {
        const emoji = guild.emojis.cache.find(e => e.name === emojiName);
        final[emojiName] = emoji ? `<${emoji.animated ? 'a' : ''}:${emoji.name}:${emoji.id}>` : emojiName;
    });
    return final;
};

const findEmoji = async ({ list, client, channelEmoji }) => {
    const array = await client.shard.broadcastEval(find, { context: { list, guildID: config[channelEmoji] } });
    return array.find(x => x);
};

module.exports = build;
