async function check (interaction, client) {

    const adminCommands = ["announce"];

    if (adminCommands.includes(interaction?.commandName)) {
      const adminCommand = client.adminCommands.get(interaction.commandName);
      if (interaction.user.id !== "1100663113226928221") return interaction.reply({ content: "<:info:1100767087879782430> |  You do not have permission to use this command.", ephemeral: true });
      adminCommand.execute(interaction, client);
      return true;
    }
    
    else return false

}

module.exports = { check };