const Discord = require('discord.js');
const fs = require('fs')
const { prefix, hiraganas } = require('./config.json');
const NodeCache = require("node-cache");
const cache = new NodeCache();

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandAliases = {
	'qh': 'quizhiragana',
	'qhr': 'quizhiraganaromanji',
	'a': 'answer'
}

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

for (let [alias, commandName] of Object.entries(commandAliases)) {
	client.commands.set(alias, client.commands.get(commandName))
}

//Mandatory
//toHiragana command
//toRomanji command
//quizRomanjiHirgana command
//answer call last quiz instead of quizhiragana

client.on('ready', function() {
	console.log(`logged in as ${client.user.tag}`);
});

client.on('message', function(message) {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!client.commands.has(commandName)) return;

	const command = client.commands.get(commandName);

	command.execute(message, args, cache);
})

client.login('ODM3NjYwODEwOTU1OTgwODAw.YIvybA.UJONzPgw5lVb_iFGObVgEOX-rjg');