const { SlashCommandBuilder, EmbedBuilder, } = require("discord.js");
let color = "#2F3136";
const client = require("../../structures/index")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Ban a user from the discord server.")
        .addUserOption(option =>
            option.setName("target")
                .setDescription("User to be banned.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("Reason for the ban.")
        ),
        userPermissions: ['BanMembers'],
        botPermissions: ['BanMembers'],
    async execute(interaction) {
        const but = client.channels.cache.get("1191258162226024511");
		but.send(
			`ban command is being used in  **${interaction.guild.name}**  by  **${interaction.user.username}** `
		);
        const { channel, options } = interaction;

        const user = options.getUser("target");
        const reason = options.getString("reason") || "No reason provided.";

        const member = await interaction.guild.members.fetch(user.id);

        const errEmbed = new EmbedBuilder()
            .setDescription(`You can't take action on ${user.username} since they have a higher role.`)
            .setColor(color);

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });

        await member.ban({ reason });

        const embed = new EmbedBuilder()
            .setTitle(`Banned a Member!`)
            .setDescription(`Succesfully banned ${user} with reason: ${reason}`)
            .setColor(color)
            .setTimestamp()

        await interaction.reply({
            embeds: [embed]
        });
    }
}