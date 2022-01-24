const config = require('../../config/config.json');
const { diceFaces, order, symbols } = require('./');
const { dice, emoji, sleep, writeData } = require('../');
const { flatten } = require('lodash');
const finalText = (text) => text.length > 1500 ? 'Too many dice to display.' : text;

const roll = async ({ client, message, params=[], channelEmoji, desc, diceResult, diceOrder }) => {
    if (!diceResult) diceResult = initDiceResult();
    if (!params[0]) {
        message.reply('No dice rolled.');
        return;
    }
    //process each identifier and set it into an array
    if (!diceOrder) diceOrder = processType(message, params);
    //rolls each die and begins rollResults
    diceOrder.forEach(die => {
        if (!diceResult.roll[die]) diceResult.roll[die] = [];
        diceResult.roll[die] = diceResult.roll[die].concat(rollDice(die));
    });

    //counts the symbols rolled
    diceResult = countSymbols(diceResult, message, channelEmoji);

    let messageGif, textGif = printAnimatedEmoji(diceOrder, message, channelEmoji);
    if (textGif) messageGif = await message.channel.send(finalText(textGif)).catch(console.error);
    writeData(client, message, 'diceResult', diceResult.roll);
    await sleep(desc.includes('roll') ? 0: 1000);
    printResults(diceResult, message, desc, channelEmoji, messageGif);
    return diceResult;
};

//init diceResult
const initDiceResult = () => {
    return {
        roll: {},
        results: {
            face: '',
            distance: 0,
            hit: 0,
            surge: 0,
            evade: 0,
            block: 0,
            dodge: 0
        }
    };
};

//processes the params and give an array of the type of dice to roll
const processType = (message, params) => {
    if (0 >= params.length) {
        message.reply('No dice rolled.');
        return [];
    }
    if (params.some(param => +(param).replace(/\D/g, '') > +config.maxRollsPerDie)) {
        message.reply('Roll exceeds max roll per die limit of ' + config.maxRollsPerDie + ' . Please try again.');
        return [];
    }

    const diceOrder = (params) => {
        if (params[0].match(/\d+/g)) {
            return flatten(params.map(param => {
                const diceQty = +(param).replace(/\D/g, ''), color = param.replace(/\d/g, '');
                return [...Array(diceQty)].map(() => color);
            }));
        } else return params.join('').split('').map(type => type);
    };

    return diceOrder(params).map(die => {
        switch(die) {
            case 'yellow':
            case 'y':
                return 'yellow';
            case 'green':
            case 'g':
                return 'green';
            case 'blue':
            case 'b':
                return 'blue';
            case 'red':
            case 'r':
                return 'red';
            case 'black':
            case 'blk':
            case 'k':
                return 'black';
            case 'white':
            case 'w':
                return 'white';
            case 'hit':
            case 'h':
                return 'hit';
            case 'surge':
            case 's':
                return 'surge';
            case 'evade':
            case 'e':
                return 'evade';
            case 'block':
                return 'block';
            case 'dodge':
            case 'd':
                return 'dodge';
            case 'distance':
            case 'x':
                return 'distance';
            default:
                return;
        }
    }).filter(Boolean).sort();
};

//rolls one die and returns the results in an array
const rollDice = (die) => {
    //roll dice and match them to a side and add that face to the message
    if (!die) return;
    return dice(Object.keys(diceFaces[die]).length);
};

function countSymbols(diceResult) {
    diceResult.results = {
        face: '',
        hit: 0,
        surge: 0,
        evade: 0,
        block: 0,
        dodge: 0,
        distance: 0
    };
    Object.keys(diceResult.roll).sort((a, b) => order.indexOf(a) - order.indexOf(b)).forEach(color => {
        diceResult.roll[color].forEach(number => {
            let face = diceFaces[color][number].face;
            for(let i = 0; i < face.length; i++) {
                switch (face[i]) {
                    case 'h':
                        diceResult.results.hit++;
                        break;
                    case 's':
                        diceResult.results.surge++;
                        break;
                    case 'e':
                        diceResult.results.evade++;
                        break;
                    case 'b':
                        diceResult.results.block++;
                        break;
                    case 'd':
                        diceResult.results.dodge++;
                        break;
                    case 'x':
                        diceResult.results.distance++;
                        break;
                    default:
                        break;
                }
            }
        });
    });
    return diceResult;
}

const printAnimatedEmoji = (diceOrder, message, channelEmoji) => {
    const text = diceOrder
        .sort((a, b) => order.indexOf(a) - order.indexOf(b))
        .map(die => {
            if (order.slice(0, -8).includes(die)) return emoji(`${die}gif`, channelEmoji);
            return emoji(die, channelEmoji);
        });
    if (text.length > 1500) return 'Too many dice to display.';
    else return text.join('');
};

const printResults = ({ roll, results }, message, desc, channelEmoji, messageGif) => {

    //creates finalCount by cancelling results
    let finalCount = {};
    if (results.hit > 0) finalCount.hit = results.hit;
    if (results.surge > 0) finalCount.surge = results.surge;
    if (results.dodge > 0) finalCount.dodge = results.dodge;
    if (results.evade > 0) finalCount.evade = results.evade;
    if (results.block > 0) finalCount.block = results.block;
    if (results.distance > 0) finalCount.distance = results.distance;

    //prints faces
    const colors = Object.entries(roll)
                         .sort(([a], [b]) => order.indexOf(a) - order.indexOf(b))
                         .filter(([color, numbers]) => numbers.length > 0),
        facesList = flatten(colors.map(([color, numbers]) => numbers.map(number => `${color}${symbols.includes(color) ? '' : diceFaces[color][number].face}`))),
        faces = facesList.map(str => emoji(str, channelEmoji)).join(''),
        response = Object.keys(finalCount)
                         .map(symbol => `${finalCount[symbol]}${emoji(symbol, channelEmoji)}`)
                         .join(' • ');

    if (0 >= faces.length) {
        message.reply('No dice rolled.');
        return;
    }
    if (messageGif) messageGif.edit(finalText(faces)).catch(console.error);
    else message.channel.send(finalText(faces)).catch(console.error);

    if (faces) message.reply(`${desc} results: ${response.length > 0 ? response : 'All dice have cancelled out'}`);
};

exports.roll = roll;
exports.processType = processType;
exports.rollDice = rollDice;
exports.countSymbols = countSymbols;
exports.printResults = printResults;

