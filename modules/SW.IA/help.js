const { upperFirst } = require('lodash');
const { MessageEmbed } = require('discord.js');
const main = require('../../index');

const help = ({  message, params = [], prefix }) => {
    const embed = new MessageEmbed().setColor('DARK_NAVY');
    switch(params[0]) {
        case 'character':
        case 'char':
        case 'c':
            embed.setTitle('**Character Help**')
                 .addField(`${prefix}char`, 'Simple character stat manager.')
                 .addField(`${prefix}char setup characterName maxWound maxStrain credits`, 'Setup a new character.')
                 .addField(`${prefix}char wound/w characterName +X/-X`, 'Increases/decreases wounds for characterName by x.')
                 .addField(`${prefix}char strain/s characterName +X/-X`, 'Increases/decreases strain for characterName by x.')
                 .addField(`${prefix}char credits/c characterName +X/-X`, 'Increases/decreases credit balance for characterName by x.')
                 .addField(`${prefix}char crit characterName +X/-X`, 'Adds/removes critical injuries for characterName.')
                 .addField(`${prefix}char obligation/o characterName +X/-X obligationName`, 'Adds/removes obligations for characterName.')
                 .addField(`${prefix}char duty/d characterName +X/-X dutyName`, 'Adds/removes duty for characterName.')
                 .addField(`${prefix}char inventory/i characterName +X/-X itemName`, 'Adds/removes inventory items for characterName.')
                 .addField(`${prefix}char modify characterName +X/-X maxStrain/maxWounds`, 'Increases/decreases selected stat for characterName by x.')
                 .addField(`${prefix}char status characterName`, 'Current status for characterName.')
                 .addField(`${prefix}char remove characterName`, 'Removes characterName.')
                 .addField(`${prefix}char list`, 'Displays all characters.')
                 .addField(`${prefix}char reset`, 'Resets all the characters.');
            break;
        case 'roll':
        case 'r':
            embed.setTitle('**Roll Help**')
                 .setDescription(`*${prefix}roll diceIdentifiers "text"*`)
                 .addField(
                     `diceIdentifiers`,
                     `**y/pro** = yellow/proficiency
					**g/a** = green/ability
					**b/boo** = blue/boost
					**blk/k/sb/s** = black/setback
					**r/c** = red/challenge
					**p/diff/d** = purple/difficulty
					**w/f** = white/force
					**success/suc/\***  = success
					**advantage/adv/v** = advantage
					**triumph/tri/!** = triumph
					**failure/fail/-** = failure
					**threat/thr/t** = threat
					**despair/des/$** = despair
					**light/l** = lightpip
					**dark/n** = darkpip`)
                 .addField('text', `assigns a label to the roll. (optional)`)
                 .addField('Examples',
                     `\`\`\`${prefix}roll yyyggbbd\`\`\` (must use single character identifiers)
    				\`\`\`${prefix}roll 1g 1p 1adv\`\`\` (must specify a number before each identifier)`);
            break;
        case 'reroll':
        case 'rr':
            embed.setTitle('**ReRoll Help**')
                 .addField(`${prefix}reroll Same`, 'Rolls the same pool again.')
                 .addField(`${prefix}reroll add diceIdentifiers`, 'Roll additional dice and adds them to the pool.')
                 .addField(`${prefix}reroll remove diceIdentifiers`, 'Remove random dice of the designated color.')
                 .addField(`${prefix}reroll select diceColor/dicePosition`, 'rerolls specified dice.')
                 .addField(`ie ${prefix}reroll select y3 p1`, 'rerolls only the 3rd yellow die and the 1st purple die in the current dice pool.')
                 .addField(`${prefix}reroll fortune show diceColor/dicePosition`,
                     `shows adjacent sides for the specified die.
					\`\`\`${prefix}reroll fortune show y1 p2\`\`\`  (shows the adjacent side for the 1st yellow and 2 purple diceFaces).`)
                 .addField(`${prefix}reroll fortune swap diceColor / dicePosition adjacentFace`, 'swaps the current face for an adjacent one.')
                 .addField(`${prefix}reroll fortune swap y3 2`, 'swaps the current die face on the 2nd yellow with option 3 of the adjacent sides.');
            break;
        case 'polyhedral':
        case 'poly':
        case 'p':
            embed.setTitle('**Polyhedral Roll Help**')
                 .addField(`${prefix}poly`, 'Rolls any combination of polyhedral dice with modifier.')
                 .addField(`Examples`, `\`\`\`${prefix}poly 1d4 2d6+1 1d100-60\`\`\``);
            break;
        case 'prefix':
            embed.setTitle('**Polyhedral Roll Help**')
                 .addField(`${prefix}Prefix`, `Changes the activation prefix for the bot.`)
                 .addField(`Examples`, `\`\`\`${prefix}prefix ^, prefix & \`\`\``)
                 .addField(`NOTE`, `User needs to have a higher role than the bot. See more [here](https://support.discordapp.com/hc/en-us/articles/214836687-Role-Management-101)`);
            break;
        default:
            embed.setTitle('**Help Contents**')
                 .setDescription(`'${prefix}Help [topic]' for further information.`)
                 .addField(`${prefix}swrpg`, 'uses swrpg dice for this channel.')
                 .addField(`${prefix}genesys`, 'uses genesys dice for this channel.')
                 .addField(`${prefix}l5r`, 'uses l5r dice in this channel.')
                 .addField(`${prefix}swia`, 'Uses swia dice for this channel.')
                 .addField(`${prefix}poly`, 'rolls any combination of polyhedral dice.')
                 .addField(`${prefix}ver`, 'displays bot version.')
                 .addField(`${prefix}prefix`, 'changes the prefix to activate the bot (role needs to be higher than the bot).')
                 .addField(`${prefix}help`, 'displays help for topics.')
                 .addField(`${prefix}roll`, 'rolls any combination of SWRPG/GENESYS dice.')
                 .addField(`${prefix}reroll`, 'modifies the previous roll.')
                 .addField(`${prefix}char`, 'simple character stat manager.')
                 .addField('Bot Information', 'For more information or help join the [SkyJedi\'s Bot Emporium](https://discord.gg/G8au6FH)')
                 .addField('Role playing games by Fantasy Flight Games', `[Edge of the Empire](https://www.fantasyflightgames.com/en/products/star-wars-edge-of-the-empire), [Force and Destiny](https://www.fantasyflightgames.com/en/products/star-wars-force-and-destiny), [Age of Rebellion](https://www.fantasyflightgames.com/en/products/star-wars-age-ofrebellion),[Genesys](https://www.fantasyflightgames.com/en/products/genesys), [Legends of the Five Rings](https://www.fantasyflightgames.com/en/legend-of-the-five-rings-roleplaying-game)`);
            break;
    }
    main.sendMessage({ message, embed });

};

module.exports = help;
