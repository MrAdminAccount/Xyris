const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
let color = "#2F3136";
const client = require("../../structures/index")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unban")
        .setDescription("Unban a user from the discord server.")
        .addStringOption(option =>
            option.setName("userid")
                .setDescription("Discord ID of the user you want to unban.")
                .setRequired(true)
        ),

        userPermissions: ['BanMembers'],
        botPermissions: ['BanMembers'],

    async execute(interaction) {
        const but = client.channels.cache.get("1191258162226024511");
		but.send(
			`unban command is being used in  **${interaction.guild.name}**  by  **${interaction.user.username}** `
		);
        const { channel, options } = interaction;

        const userId = options.getString("userid");

        try {
            await interaction.guild.members.unban(userId);

            const embed = new EmbedBuilder()
                .setTitle(`Unbanned a user!`)
                .setDescription(`Succesfully unbanned ${userId} from the guild.`)
                .setColor(color)
                .setTimestamp();

            await interaction.reply({
                embeds: [embed],
            });
        } catch (err) {

            const errEmbed = new EmbedBuilder()
                .setTitle(`Invalid ID`)
                .setDescription(`Please provide a valid member's ID.`)
                .setColor(color);

            interaction.reply({ embeds: [errEmbed], ephemeral: true });
        }
    }
}