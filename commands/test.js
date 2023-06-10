const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('nothin ayo.'),
	async execute(interaction) {
		await interaction.reply('HEHEHEHHEHE');
	},
};