const {
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
  } = require("discord.js");
 const { Code } = require("../../structures/schemas/premiumcodes");
  
  const ERROR_MESSAGES = {
    CODE_NOT_FOUND: "The code you entered is invalid. Please try again.",
    CODE_ALREADY_REDEEMED: "The code you entered has already been redeemed.",
    EXPIRATION_DATE_NOT_FOUND:
      "The code you entered has already been redeemed, but there was an issue retrieving the expiration date.",
  };
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("premium-delete-code")
      .setDescription("Delete a premium code")
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
      .addStringOption((option) =>
        option
          .setName("code")
          .setDescription("The premium code to delete")
          .setRequired(true)
      ),
  
    async execute(interaction) {
      try {
        const codeValue = interaction.options.getString("code");
  
        const code = await Code.findOne({ code: codeValue });
  
        if (!code) {
          const embed = new EmbedBuilder()
            .setTitle("Code Deletion Failed")
            .setDescription(ERROR_MESSAGES.CODE_NOT_FOUND)
             .setColor("#2F3136")
          await interaction.reply({ embeds: [embed], ephemeral: true });
          return;
        }
  
        if (code.redeemedBy && code.redeemedBy.username && code.redeemedBy.id) {
          const confirmEmbed = new EmbedBuilder()
            .setTitle("Code Deletion Confirmation")
            .setDescription(
              `Are you sure you want to delete code "${codeValue}"?\n\nType \`!delete ${codeValue}\` to confirm.`
            )
                .setColor("#2F3136")
          const message = await interaction.reply({
            embeds: [confirmEmbed],
            ephemeral: true,
          });
  
          const filter = (msg) =>
            msg.author.id === interaction.user.id &&
            msg.content.toLowerCase() === `!delete ${codeValue}`;
  
          const collector = interaction.channel.createMessageCollector({
            filter,
            time: 10000, // 10 seconds
          });
  
          collector.on("collect", async (msg) => {
            await msg.delete();
            await Code.deleteOne({ _id: code._id });
  
            const embed = new EmbedBuilder()
              .setTitle("Code Deleted")
              .setDescription("The code has been successfully deleted.")
               .setColor("#2F3136")
            await interaction.editReply({ embeds: [embed] });
          });
  
          collector.on("end", async (collected) => {
            if (collected.size === 0) {
              const timeoutEmbed = new EmbedBuilder()
                .setTitle("Code Deletion Failed")
                .setDescription(
                  "The confirmation timed out. Please try again by running the command again."
                )
                 .setColor("#2F3136")
              await interaction.editReply({ embeds: [timeoutEmbed] });
            }
          });
  
          return;
        }
  
        await Code.deleteOne({ _id: code._id });
  
        const embed = new EmbedBuilder()
          .setTitle("Code Deleted")
          .setDescription("The code has been successfully deleted.")
           .setColor("#2F3136")
        await interaction.reply({ embeds: [embed], ephemeral: true });
      } catch (error) {
        console.error(error);
        const embed = new EmbedBuilder()
          .setTitle("Command Execution Failed")
          .setDescription(
            "An error occurred while executing this command. Please try again later."
          )
           .setColor("#2F3136")
        await interaction.reply({ embeds: [embed], ephemeral: true });
      }
    },
  };
  