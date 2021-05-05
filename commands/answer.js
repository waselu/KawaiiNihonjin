
const quizHiragana = require('./quizHiragana');
const quizHiraganaRomanji = require('./quizHiraganaRomanji');

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
		message.channel.send('✅ This hiragana is indeed ' + expected[displayAttribute]);
	} else {
		message.channel.send('❌ This hiragana is ' + expected[displayAttribute]);
	}
	quizzes[expected['quiz']].execute(message, expected['args'], cache);
}

module.exports = {
	name: 'answer',
	description: 'Answer any question asked by かわいい日本人',
	execute(message, args, cache) {
		if (args.length == 0) {
			message.channel.send('No answer provided');
			return;
		} else if (args.length != 1) {
			message.channel.send('Too many answers provided');
			return;
		}
		answer(message, args, cache);
	}
}