const Discord = require('discord.js')
const client = new Discord.Client();
const { prefix } = require('./config.json')

//Mandatory
//TODO: Hiragana/TenTen array
//toHiragana command
//toRomanji command

client.on('ready', function() {
	console.log(`logged in as ${client.user.tag}`)
})

function ping(message) {
	message.channel.send('Command handler works')
}

client.on('message', function(message) {
	if (message.author.id === client.user.id) { return }

	function commands() {
		commands = {
			'ping': ping
		}

		return commands
	}

	commands = commands()
	Object.keys(commands).map(function(key) {
		if (message.content === key) {
			console.log(message.author.id)
			console.log(client.user.id)
			commands[key](message)
		}
	})
})

client.login('ODM3NjYwODEwOTU1OTgwODAw.YIvybA.UJONzPgw5lVb_iFGObVgEOX-rjg')