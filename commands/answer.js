
const quizHiragana = require('./quizHiragana');

function answer(message, args, cache)
{
	let expected = cache.get("expectedAnswer" + message.author.id);
	if (expected == undefined) {
		message.channel.send('What exactly are you answering? xD');
		return;
	}

	texts = expected['text'][0].trim().split(',');
	found = false;
	texts.map(function(text) {
		if (text.trim() == args[0].trim()) {
			found = true;
		}
	})

	if (args[0] == expected['index'] || found) {
		message.channel.send('✅ This hiragana is indeed ' + expected['text']);
	} else {
		message.channel.send('❌ This hiragana is ' + expected['text']);
	}
	quizHiragana.execute(message, args, cache);
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