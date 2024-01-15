const permissionChecker = require("../../functions/permissionChecker.js");
const blacklist = require("../../structures/schemas/blacklist");
const adminChecker = require("../../functions/adminChecker.js");
const { EmbedBuilder } = require("discord.js");
const { isUserPremium } = require("../../functions/codeFunction");
const rrSchema = require("../../structures/schemas/ReactionRoles");

module.exports = {
  name: "interactionCreate",

  async execute(interaction, client) {
    blacklist.findOne({ id: interaction.user.id }, async (err, data) => {
      if (err) throw err;
      if (data) {
        const blist = new EmbedBuilder()
          .setColor("#2F3136")
          .setDescription(
            "**<:no:1100766396385861763>| You are prohibited from using the bot. **"
          );
        return interaction.reply({ embeds: [blist] });
      }

      if (interaction.isSelectMenu()) {
        if (interaction.customId === "reaction-roles") {
          const member = interaction.member; 
          const values = interaction.values;

       
          if (values.includes("clear-roles")) {
            const guildId = interaction.guild.id;
            const rolesData = await rrSchema.findOne({ GuildID: guildId });
            if (!rolesData || !rolesData.roles || rolesData.roles.length === 0) {
              return interaction.reply({
                content: "This server does not have any data.",
                ephemeral: true,
              });
            }

            const rolesToRemove = rolesData.roles.map(x => x.roleId);

            member.roles.remove(rolesToRemove);

            return interaction.reply({ content: "Roles cleared.", ephemeral: true });
          }

          for (let i = 0; i < values.length; i++) {
            const roleId = values[i];
            const hasRole = member.roles.cache.has(roleId);

            switch (hasRole) {
              case true:
                member.roles.remove(roleId);
                break;
              case false:
                member.roles.add(roleId);
                break;
            }
          }

          return interaction.reply({ content: "Roles updated.", ephemeral: true });
        }
      }

      if (!interaction.isChatInputCommand()) return;

      const allCommands = client.commands.concat(client.adminCommands);
      const command = allCommands.get(interaction.commandName);
      const isPremium = await isUserPremium(interaction.user.id);
      console.log(isPremium);

      if (command.premiumOnly && !isPremium) {
        return interaction.reply({
          content: "Sorry, this command is only available to premium users.",
          ephemeral: true,
        });
      }

      if (await adminChecker.check(interaction, client)) return;
      if (await permissionChecker.user(interaction, command)) return;
      if (await permissionChecker.bot(interaction)) return;

      return command.execute(interaction, client);
    });
  },
};
