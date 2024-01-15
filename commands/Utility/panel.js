const rrSchema = require("../../structures/schemas/ReactionRoles");
const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("panel")
        .setDescription(" reaction role panel.")
        .setDMPermission(false),
        userPermissions: ['ManageRoles'],
    async execute(interaction) {
        const { guildId, channel } = interaction;

        try {
            const data = await rrSchema.findOne({ GuildID: guildId });

            if (!data || !data.roles || data.roles.length === 0) {
                return interaction.reply({ content: "This server does not have any data or roles.", ephemeral: true });
            }

            const panelEmbed = new EmbedBuilder()
                .setDescription("Select roles below!")
                .setColor("#235ee7");

            const options = data.roles.map(x => ({
                label: x.roleDescription,
                value: x.roleId,
                emoji: x.roleEmoji || undefined
            }));

            options.push({
                label: 'Clear Roles',
                value: 'clear-roles',
                emoji: '🗑️'
            });

            const menuComponents = [
                new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('reaction-roles')
                        .setMaxValues(options.length)
                        .addOptions(options),
                ),
            ];

            await channel.send({ embeds: [panelEmbed], components: menuComponents });

            return interaction.reply({ content: "Successfully sent your panel.", ephemeral: true });
        } catch (err) {
            console.error("Error in executing panel command:", err);

            if (err.code === 50013) {
                return interaction.reply({ content: "I don't have permissions to do that.", ephemeral: true });
            }

            return interaction.reply({ content: "An error occurred while processing your request.", ephemeral: true });
        }
    }
};
