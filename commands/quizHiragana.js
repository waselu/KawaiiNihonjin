
const randomGenerator = require('../utils/randomNumber');
const { MessageEmbed } = require('discord.js');

const getRandom = require('../utils/getRandom');

function askHiragana(message, args, cache) {
	let chosenHiraganas = getRandom.get10HiraganasSameSource();
	let guessHiraganaIndex = randomGenerator.random(0, 9);
	let guessHiragana = chosenHiraganas[guessHiraganaIndex];

	let embed = new MessageEmbed()
		.setTitle(guessHiragana['kata'])
		.setDescription('What is this hiragana ?')
		.setFooter('Use the :answer command to answer')

	let emojiArray = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

	let noIndex = false;
	if (!(args.length == 1 && args[0] == 'hidden')) {
		chosenHiraganas.map(function(c, index) {
			embed.addField(":" + emojiArray[index] + ": " + c['romanji'], '‎', true)
		})
	} else {
		noIndex = true;
	}

	cache.set("expectedAnswer" + message.author.id, {"index": noIndex ? null : guessHiraganaIndex, "romanji": guessHiragana['romanji'], "quiz": "quizHiragana", "args": args}, 3600);
	message.channel.send(embed);
}

module.exports = {
	name: 'quizhiragana',
	description: 'Launch a quiz to practice hiragana',
	execute(message, args, cache) {
		askHiragana(message, args, cache);
	}
}