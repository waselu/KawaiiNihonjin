
const utils = require('../utils/utils');
const wanakana = require('wanakana');

function toHiragana(message, args, cache)
{
    let sentence = args.join('  ').replace(/ô/g, 'ou').replace(/â/g, 'aa').replace(/û/g, 'uu').replace(/î/g, 'ii');
    let hiraganas = wanakana.toHiragana(sentence);
    if (!wanakana.isJapanese(hiraganas.replace(/ /g, ''))) {
        utils.sendBotMessage(message, 'Your message could not be transcribed into hiragana, please check your spelling');
        return;
    }
	utils.sendBotMessage(message, hiraganas);
}

module.exports = {
	name: 'tohiragana',
	description: '',
	nbArgsMin: 1,
	execute(message, args, cache) {
		toHiragana(message, args, cache);
	}
}