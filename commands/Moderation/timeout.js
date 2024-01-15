const {
	SlashCommandBuilder,
	ApplicationCommandOptionType,
	EmbedBuilder,
    ChatInputCommandInteraction
} = require('discord.js');
const ms = require('ms');
let color = "#2F3136";
const client = require("../../structures/index")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('timeout')
		.setDescription('Timeout a User!')
		.addUserOption(option => option.setName('user').setDescription('The User you want to mute').setRequired(true))
		.addStringOption(option => option.setName('duration').setDescription('The Duration of this Users timeout').setRequired(true)
        .addChoices({
				name: '60 Seconds',
				value: '60 Seconds'
			}, 
            {
				name: '5 Minutes ',
				value: '5 Minutes'
			}, 
            {
				name: '10 Minutes',
				value: '10 Minutes'
			}, 
            {
				name: '1 Hour',
				value: '1 Hour'
			}, 
            {
				name: '1 Day',
				value: '1 Day'
			}, 
            {
				name: '1 Week',
				value: '1 Week'
			}

		))
		.addStringOption(option => option.setName('reason').setDescription('The Reason for this timeout').setMaxLength(512)),
	userPermissions: ['Administrator'],
	botpermissions: ['Administrator'],

    /**
     * @param {ChatInputCommandInteraction} interaction
     */
	async execute(interaction, client) {
        const but = client.channels.cache.get("1191258162226024511");
		but.send(
			`timeout command is being used in  **${interaction.guild.name}**  by  **${interaction.user.username}** `
		);
        const user = interaction.options.getUser('user');
        const duration = interaction.options.getString('duration');
        const reason = interaction.options.getString('reason') || 'None Specified!';

        const member = interaction.guild.members.cache.get(user.id);

        if(!member.manageable || !member.moderatable)
            return interaction.reply({ embeds: [
                new EmbedBuilder()
                    .setDescription(`<:no:1100766396385861763> **${member}**, Is not Manageable or not Moderatable!`)
                    .setColor(color)
                ],
                ephemeral: true 
            });

        if(member.roles.highest.position > interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [
                new EmbedBuilder()
                    .setDescription(` <:no:1100766396385861763> **${member}**, Has a higher role than you!`)
                    .setColor(color)
                ],
                ephemeral: true
            });
        
        member.timeout(ms(duration), reason)
            .then(async () => {
                return await interaction.reply({ embeds: [
                    new EmbedBuilder()
                        .setDescription(` <:Check:1100766121591840859> **<@${user.id}>**, Has successfully been timed out for **${ms(ms(duration), { long: true } )}**`)
                        .setColor(color)                
                        .setFooter({ text: reason })
                    ]
                });
            })
            .catch((err) => {
                console.error(err);
            });
 	}
}