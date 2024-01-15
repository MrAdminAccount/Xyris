const {
    SlashCommandBuilder,
    EmbedBuilder,
  } = require("discord.js");
  const client = require("../../structures/index")

  module.exports = {
    data: new SlashCommandBuilder()
      .setName("purge")
      .setDescription(
        "purge a specific amount of messages from a target or channel."
      )
      .addSubcommand((subcommand) =>
        subcommand
          .setName("all")
          .setDescription("Remove all Messages.")
          .addIntegerOption((options) =>
            options
              .setName("count")
              .setDescription("input count")
              .setMinValue(1)
              .setRequired(true)
          )
      )
      .addSubcommand((subcommand) =>
        subcommand
          .setName("user")
          .setDescription("Removes all messages from the user given.")
          .addIntegerOption((options) =>
            options
              .setName("count")
              .setDescription("input count")
              .setMinValue(1)
              .setRequired(true)
          )
          .addUserOption((options) =>
            options.setName("user").setDescription("input user").setRequired(true)
          )
      )
      .addSubcommand((subcommand) =>
        subcommand
          .setName("bot")
          .setDescription("Removes a bot user's messages.")
          .addIntegerOption((options) =>
            options
              .setName("count")
              .setDescription("input count")
              .setMinValue(1)
              .setRequired(true)
          )

      ),
      userPermissions: ['ManageMessages'],
      botPermissions: ['ManageMessages'],
    async execute(interaction, client) {
      const but = client.channels.cache.get("1191258162226024511");
		but.send(
			`purge command is being used in  **${interaction.guild.name}**  by  **${interaction.user.username}** `
		);
      let amount = interaction.options.getInteger("count");
      if (amount >= 100) amount = 100;
      if (amount < 1) amount = 1;
      const fetch = await interaction.channel.messages.fetch({ limit: amount });
      const user = interaction.options.getUser("user");
  
      async function results(deletedMessages) {
        const results = {};
        for (const [, deleted] of deletedMessages) {
          const user = `${deleted.author.username}#${deleted.author.discriminator}`;
          if (!results[user]) results[user] = 0;
          results[user]++;
        }
  
        const userMessageMap = Object.entries(results);
  
        const finalResult = `${deletedMessages.size} message${
          deletedMessages.size > 1 ? "s" : ""
        } were removed!\n\n${userMessageMap
          .map(([user, messages]) => `**${user}** : ${messages}`)
          .join("\n")}`;
  
        const msg = await interaction.reply({
          content: `${finalResult}`,
          fetchReply: true,
        });
        setTimeout(() => {
          msg.delete();
        }, 5000);
      }
  
      let filtered;
      let deletedMessages;
  
      switch (interaction.options.getSubcommand()) {
        case "all":
          deletedMessages = await interaction.channel.bulkDelete(fetch, true);
          results(deletedMessages);
          break;
  
        case "bot":
          filtered = fetch.filter((m) => m.author.bot);
          deletedMessages = await interaction.channel.bulkDelete(filtered, true);
          results(deletedMessages);
  
          break;
        case "user":
          filtered = fetch.filter((m) => m.author.id === user.id);
          deletedMessages = await interaction.channel.bulkDelete(filtered, true);
          results(deletedMessages);
      }
    },
  };