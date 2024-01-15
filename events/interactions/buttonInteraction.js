const permissionChecker = require("../../functions/permissionChecker.js");

module.exports = {
  name: "interactionCreate",

  async execute(interaction, client) {
    if (!interaction.isButton()) return;

    const button = client.buttons.get(interaction.customId);

    if (await permissionChecker.user(interaction, button)) return;
    if (await permissionChecker.bot(interaction)) return;

    return button.execute(interaction, client);
  },
};