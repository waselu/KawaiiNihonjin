
function answer(message, args, cache)
{
	let expected = cache.get("expectedAnswer" + message.author.id);
	if (expected == undefined) {
		message.channel.send('What exactly are you answering? xD');
		return;
	}

	if (args[0] == expected['index']) {
		message.channel.send('✅ This hiragana is indeed ' + expected['hiragana']);
	} else {
		message.channel.send('❌ This hiragana is ' + expected['hiragana']);
	}
}

module.exports = {
	name: 'answer',
	description: 'Answer any question asked by かわいい日本人',
	execute(message, args, cache) {
		if (args.length == 0) {
			message.channel.send('No answer provided');
			return;
		}
		answer(message, args, cache);
	}
}