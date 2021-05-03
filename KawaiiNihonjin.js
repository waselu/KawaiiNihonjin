const Discord = require('discord.js');
const fs = require('fs')
const { prefix } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

//Mandatory
//TODO: Hiragana/TenTen config array
//toHiragana command
//toRomanji command
//quiz command
//practiceHiragana command

client.on('ready', function() {
	console.log(`logged in as ${client.user.tag}`);
});

client.on('message', function(message) {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!client.commands.has(commandName)) return;
	const command = client.commands.get(commandName);

	command.execute(message, args);
})

client.login('ODM3NjYwODEwOTU1OTgwODAw.YIvybA.UJONzPgw5lVb_iFGObVgEOX-rjg');