
const quizHiragana = require('./quizHiragana');
const quizHiraganaRomanji = require('./quizHiraganaRomanji');
const utils = require('../utils/utils');

const quizzes = {
	"quizHiragana": quizHiragana,
	"quizHiraganaRomanji": quizHiraganaRomanji
}

function answer(message, args, cache)
{
	let expected = cache.get("expectedAnswer" + message.author.id);
	if (expected == undefined) {
		message.channel.send('What exactly are you answering? xD');
		return;
	}

	found = false;
	displayAttribute = '';

	if (expected['romanji'] != null) {
		displayAttribute = 'romanji';
		texts = expected['romanji'][0].trim().split(',');
		texts.map(function(text) {
			if (text.trim() == args[0].trim()) {
				found = true;
			}
		})
	}

	if (expected['kata'] != null) {
		displayAttribute = 'kata';
		if (expected['kata'] == args[0].trim()) {
			found = true;
		}
	}

	if (args[0] == expected['index'] || found) {
		utils.sendBotMessage(message, '✅ This hiragana is indeed ' + expected[displayAttribute]);
	} else {
		utils.sendBotMessage(message, '❌ This hiragana is ' + expected[displayAttribute]);
	}
	quizzes[expected['quiz']].execute(message, expected['args'], cache);
}

module.exports = {
	name: 'answer',
	description: 'Answer any question asked by かわいい日本人',
	nbArgsMin: 1,
	nbArgsMax: 1,
	execute(message, args, cache) {
		answer(message, args, cache);
	}
}