const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } = require("discord.js");
const fetch = require("node-fetch");

let color = "#2F3136";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("urban")
    .setDescription("Get the urban dictionary definition of a word")
    .addStringOption((option) =>
      option
        .setName("word")
        .setDescription("The word to define")
        .setRequired(true)
    ),

  async execute(interaction) {
    const { options, member } = interaction;
    const word = options.getString("word");

    try {
      const response = await fetch(
        `https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(
          word
        )}`
      );
      const data = await response.json();

      if (!data.list.length) {
        interaction.reply({
          content: `No definition found for "${word}"`,
          ephemeral: true,
        });
        return;
      }

      const definition = data.list[0].definition.slice(0, 1024);

      const embed = new EmbedBuilder()
        .setColor(color)
        .setDescription(`Here is the definition of "${word}":`)
        .setThumbnail(`https://cdn.discordapp.com/attachments/877804343976394772/935229997071867944/ud-logo.png`)
        .addFields({
          name: "Definition:",
          value: definition,
        });

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("urban-retry")
          .setLabel("Retry")
          .setStyle(ButtonStyle.Secondary)
      );

      interaction.reply({
        embeds: [embed],
        components: [row],
      });

      const filter = (i) =>
        i.customId === "urban-retry" && i.user.id === member.id;
      const collector = interaction.channel.createMessageComponentCollector({
        filter,
        time: 15000,
      });

      collector.on("collect", async (i) => {
        try {
          const response = await fetch(
            `https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(
              word
            )}`
          );
          const data = await response.json();

          const retryDefinition = data.list[0].definition.slice(0, 1024);

          const retryEmbed = new EmbedBuilder()
            .setColor(color)
            .setDescription(`Here is the definition of "${word}":`)
            .setThumbnail(`https://cdn.discordapp.com/attachments/877804343976394772/935229997071867944/ud-logo.png`)
            .addFields({
              name: "Definition:",
              value: retryDefinition,
            });

          i.update({
            embeds: [retryEmbed],
            components: [row],
          });
        } catch (err) {
          console.error(err);
          i.update({
            content: "Something went wrong. Please try again later.",
            components: [],
            ephemeral: true,
          });
        }
      });

      collector.on("end", async () => {
        await row.components[0].setDisabled(true);
      });
    } catch (err) {
      console.error(err);
      interaction.reply({
        content: "Something went wrong. Please try again later.",
        ephemeral: true,
      });
    }
  },
};
