const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
let color = "#2F3136";
const client = require("../../structures/index")
module.exports = {
    data: new SlashCommandBuilder()
        .setName("suggest")
        .setDescription("Suggest something to Xyris's development team")
        .addStringOption(option =>
            option.setName("name")
                .setDescription("Name your suggestion.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("description")
                .setDescription("Describe your suggestion.")
                .setRequired(true)
        ),

    async execute(interaction) {
        const gay = client.channels.cache.get("1191258162226024511");
        gay.send (
          `suggest command is being used in  **${interaction.guild.name}**  by  **${interaction.user.username}** `
        );
        const { guild, options, member } = interaction;

        const name = options.getString("name");
        const description = options.getString("description");

        const embed = new EmbedBuilder()
            .setColor(color)
            .setDescription(`A suggestion made by ${member}`)
            .addFields(
                { name: "Suggestion", value: `${name}` },
                { name: "Description", value: `${description}` },
            )
            .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true }) });
            const suggestchannel = client.channels.cache.get("1100734933334503446")
            suggestchannel.send({ embeds: [embed],
        }).then((s) => {
            s.react('✅');
            s.react('❌');
        }).catch((err) => {
            throw err;
        });

        interaction.reply({ content: "<:Check:1100766121591840859> | Your suggestion has been Succesfully submitted.", ephemeral: true });
    }
}