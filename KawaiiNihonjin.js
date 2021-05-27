const Discord = require('discord.js');
const fs = require('fs')
const { prefix } = require('./config.json');
const commandManager = require('./utils/commandManager');
const NodeCache = require("node-cache");
const cache = new NodeCache();
require('discord-reply');

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
//toRomanji command (do not check output integrity)
//Rework alias array (in config file, command name as key instead of alias, like elsword list manager)

client.on('ready', function() {
	console.log(`logged in as ${client.user.tag}`);
});

client.on('message', function(message) {
	commandManager.commandManager(message, client, cache)
})

client.login('ODM3NjYwODEwOTU1OTgwODAw.YIvybA.UJONzPgw5lVb_iFGObVgEOX-rjg');