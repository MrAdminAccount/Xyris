const { EmbedBuilder, CommandInteraction } = require("discord.js");

/**
 * @param {CommandInteraction} interaction - client interaction from Command Interaction
 * @param {*} emoji - emoji for the reply
 * @param {String} description - description for the reply
 */
function EditReply(interaction, emoji, description) {
  interaction.editReply({
    embeds: [
      new EmbedBuilder()
      .setColor("#2F3136")
        .setDescription(`<:Check:1100766121591840859> ${description}`),
    ],
  });
}

module.exports = EditReply;