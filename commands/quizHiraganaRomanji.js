
const { MessageEmbed } = require('discord.js');
const randomGenerator = require('../utils/randomNumber');
const getRandom = require('../utils/getRandom');
const utils = require('../utils/utils');

function askHiraganaRomanji(message, args, cache) {
	let chosenHiraganas = getRandom.get10HiraganasSameSource();
	let guessHiraganaIndex = randomGenerator.random(0, 9);
	let guessHiragana = chosenHiraganas[guessHiraganaIndex];

	let embed = new MessageEmbed()
		.setTitle(guessHiragana['romanji'])
		.setDescription('What hiragana is this ?')
		.setFooter('Use the :answer command to answer')

	let emojiArray = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

	let noIndex = false;
	if (!(args.length == 1 && args[0] == 'hidden')) {
		chosenHiraganas.map(function(c, index) {
			embed.addField(":" + emojiArray[index] + ": " + c['kata'], '‎', true)
		})
	} else {
		noIndex = true;
	}

	cache.set("expectedAnswer" + message.author.id, {"index": noIndex ? null : guessHiraganaIndex, "romanji": null, "kata": guessHiragana['kata'], "quiz": "quizHiraganaRomanji", "args": args}, 3600);
	utils.sendBotMessage(message, embed);
}

module.exports = {
	name: 'quizhiraganaromanji',
	description: 'Launch a quiz to practice hiragana',
	nbArgsMax: 0,
	execute(message, args, cache) {
		askHiraganaRomanji(message, args, cache);
	}
}