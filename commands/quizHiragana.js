
const randomGenerator = require('../utils/randomNumber');
const { hiragana, tentenHiragana, doubleHiragana } = require('../config.json');
const { MessageEmbed } = require('discord.js');

function askHiragana(message, cache) {
	let choosing = randomGenerator.random(0, Object.keys(hiragana).length + Object.keys(tentenHiragana).length + Object.keys(doubleHiragana).length);

	let chosenHiraganas = [];
	let guessHiraganaIndex = randomGenerator.random(0, 9);
	let guessHiragana = '';
	let hiraganaObject = {};

	if (choosing < Object.keys(hiragana).length) {
		hiraganaObject = hiragana;
	} else if (choosing < Object.keys(hiragana).length + Object.keys(tentenHiragana).length) {
		hiraganaObject = tentenHiragana;
	} else {
		hiraganaObject = doubleHiragana;
	}

	while (chosenHiraganas.length != 10) {
		choosing = randomGenerator.random(0, Object.keys(hiraganaObject).length - 1);
		if (chosenHiraganas.includes(Object.keys(hiraganaObject)[choosing])) {
			continue;
		}
		chosenHiraganas.push(Object.keys(hiraganaObject)[choosing]);
	}

	guessHiragana = chosenHiraganas[guessHiraganaIndex];

	let embed = new MessageEmbed()
		.setTitle(guessHiragana)
		.setDescription('What is this hiragana ?')
		.setFooter('Use the :answer command to answer')

	let emojiArray = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

	chosenHiraganas.map(function(c, index) {
		embed.addField(":" + emojiArray[index] + ": " + hiraganaObject[c], '‎', true)
	})

	message.channel.send(embed);

	cache.set("expectedAnswer" + message.author.id, {"index": guessHiraganaIndex, "text": hiraganaObject[chosenHiraganas[guessHiraganaIndex]]}, 3600);
}

module.exports = {
	name: 'quizhiragana',
	description: 'Launch a quiz to practice hiragana',
	execute(message, args, cache) {
		askHiragana(message, cache);
	}
}