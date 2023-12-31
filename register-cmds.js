const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./token-info.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	// const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(foldersPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(foldersPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const rest = new REST().setToken(token);
(async () => {
	try {
		console.log(`I'm Starting to refresh ${commands.length} commands.`);

		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Refresh was successful sir. There was ${data.length} commands.`);
	} catch (error) {
		console.error(error);
	}
})();