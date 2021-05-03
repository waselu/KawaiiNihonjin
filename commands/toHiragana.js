module.exports = {
	name: 'tohiragana',
	description: 'Transcribe a romanji message to hiragana',
	execute(message, args) {
		if (!args.length) {
			return message.channel.send('You have not provided any text to transcribe');
		} else {
			transcribed = ""
			args.map(function(arg) {
				transcribed += ' ' + arg
			})
			message.channel.send(transcribed)
		}
	}
}