const rrSchema = require("../../structures/schemas/ReactionRoles");
const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("addrole")
        .setDescription("Add custom reaction role.")
        .setDMPermission(false)
        .addRoleOption(option =>
            option.setName("role")
                .setDescription("Role to be assigned")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("description")
                .setDescription("Description of the role.")
                .setRequired(false)
        )
        .addStringOption(option =>
            option.setName("emoji")
                .setDescription("Emoji for the role.")
                .setRequired(false)
        ),
    userPermissions: ['ManageRoles'],
    botPermissions: ['ManageRoles'],
    async execute(interaction) {
        const { options, guildId, member } = interaction;

        const role = options.getRole("role");
        const description = options.getString("description");
        const emoji = options.getString("emoji");

        try {
            // Check if the bot's role position is lower than the specified role's position
            if (role.position >= member.roles.highest.position) {
                return interaction.reply({ content: "I don't have permissions for that.", ephemeral: true });
            }

            const data = await rrSchema.findOne({ GuildID: guildId });

            const newRole = {
                roleId: role.id,
                roleDescription: description || "No description.",
                roleEmoji: emoji || "",
            }

            if (data) {
                let roleData = data.roles.find((x) => x.roleId === role.id);

                if (roleData) {
                    roleData = newRoleData;
                } else {
                    data.roles = [...data.roles, newRole]
                }

                await data.save();
            } else {
                await rrSchema.create({
                    GuildID: guildId,
                    roles: newRole,
                });
            }

            return interaction.reply({ embeds:[new EmbedBuilder().setDescription(`Created new role **${role.name}**`).setColor("#235ee7").setTimestamp()], ephemeral: true });

        } catch (err) {
            console.log(err);
        }
    }
}
