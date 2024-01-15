const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
let color = "#2F3136";
const client = require("../../structures/index")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Kick a user from the discord server.")
        .addUserOption(option =>
            option.setName("target")
                .setDescription("User to be kicked.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("Reason for the kick.")
        ),

        userPermissions: ['KickMembers'],
        botPermissions: ['KickMembers'],

    async execute(interaction) {
        const but = client.channels.cache.get("1191258162226024511");
		but.send(
			`kick command is being used in  **${interaction.guild.name}**  by  **${interaction.user.username}** `
		);
        const { channel, options } = interaction;

        const user = options.getUser("target");
        const reason = options.getString("reason") || "No reason provided";

        const member = await interaction.guild.members.fetch(user.id);

        const errEmbed = new EmbedBuilder()
            .setDescription(`You can't take action on ${user.username} since they have a higher role.`)
            .setColor(color)

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });

        await member.kick(reason);

        const embed = new EmbedBuilder()
            .setTitle(`Kicked a Member!`)
            .setDescription(`Succesfully kicked ${user} with reason: ${reason}`)
            .setColor(color);

        await interaction.reply({
            embeds: [embed],
        });
    }
}