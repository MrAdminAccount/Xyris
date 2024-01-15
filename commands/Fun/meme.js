const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } = require("discord.js");
const fetch = require("node-fetch");

let color = "#2F3136";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("meme")
    .setDescription("Get a random meme from r/memes"),

  async execute(interaction) {
    try {
      const response = await fetch(
        "https://www.reddit.com/r/dankmemes/random/.json"
      );
      const [post] = await response.json();

      if (!post.data) {
        interaction.reply({
          content: "No memes found. Please try again later.",
          ephemeral: true,
        });
        return;
      }

      const { title, url, ups, downs, num_comments } = post.data.children[0].data;

      const embed = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setURL(url)
        .setImage(url)
        .setFooter({
            text: `👍 ${ups} | 👎 ${downs} | 💬 ${num_comments}`});

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("meme-retry")
          .setEmoji("<:reload:1075749803700539392>")
          .setStyle(ButtonStyle.Secondary)
      );

      interaction.reply({
        embeds: [embed],
        components: [row],
      });

      const filter = (i) => i.customId === "meme-retry";
      const collector = interaction.channel.createMessageComponentCollector({
        filter,
      });

      collector.on("collect", async (i) => {
        try {
          const response = await fetch(
            "https://www.reddit.com/r/dankmemes/random/.json"
          );
          const [post] = await response.json();

          const { title, url, ups, downs, num_comments } = post.data.children[0].data;

          const retryEmbed = new EmbedBuilder()
            .setColor(color)
            .setTitle(title)
            .setURL(url)
            .setImage(url)
            .setFooter({ text: `👍 ${ups} | 👎 ${downs} | 💬 ${num_comments}`});

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
