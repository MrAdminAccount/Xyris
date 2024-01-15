const {
    EmbedBuilder,
    SlashCommandBuilder
} = require("discord.js");
const client = require("../../structures/index")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("membercount")
    .setDescription("Shows you the membercount of the server."),


    async execute(interaction) {
        const but = client.channels.cache.get("1191258162226024511");
		but.send(
			`membercount command is being used in  **${interaction.guild.name}**  by  **${interaction.user.username}** `
		);
        const { guild } = interaction;
        const { members } = guild;
        
        const botCount = members.cache.filter(member => member.user.bot).size;

        interaction.reply({ embeds: [
            new EmbedBuilder()
                .setColor("#2F3136")
                .setTitle(`${guild.name}'s Membercount`)
                .setThumbnail(guild.iconURL({ size: 1024 }))
                .setImage(guild.bannerURL({ size: 1024 }))
                .addFields(
                    {
                        name: `User (${guild.memberCount})`,
                        value: [
                            `<:users:1100778945298825346> **Member** ${guild.memberCount - botCount}`,
                            `<:Fun:1100767839536828457> **Bots** ${botCount}`
                        ].join("\n"),
                        inline: true
                    }
                )
        ] });
    }
}