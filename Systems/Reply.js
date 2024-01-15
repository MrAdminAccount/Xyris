const { EmbedBuilder } = require("discord.js");

/**
 * @param {*} interaction - client interaction from Command Interaction
 * @param {*} emoji - emoji for the reply
 * @param {String} description - description for the reply
 * @param {Boolean} type - type of reply, ephemeral true or false
 */
function Reply(interaction, emoji, description, type) {
  interaction.reply({
    embeds: [
      new EmbedBuilder()
      .setColor("#2F3136")
        .setDescription(`<:Check:1100766121591840859>  ${description}`),
    ],
    ephemeral: type,
  });
}

module.exports = Reply;