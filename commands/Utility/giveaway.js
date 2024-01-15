const { ChatInputCommandInteraction, Client, EmbedBuilder, TextInputBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType, ModalBuilder, PermissionsBitField, TextInputStyle } = require("discord.js");
const DB = require("../../structures/schemas/GiveawayDB");
const { endGiveaway } = require("../../utils/GiveawayFunctions");

module.exports = {
    data: {
    name: "giveaway",
    description: "Create or manage a giveaway",
    dmPermission: false,
    botPermissions: ["SendMessages"],
    options: [
        {
            name: "create",
            description: "Create a giveaway",
            type: ApplicationCommandOptionType.Subcommand,
        },
        {
            name: "manage",
            description: "Manage a giveaway",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "toggle",
                    description: "Provide an option to manage",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    choices: [
                        { name: "End", value: "end" },
                        { name: "Pause", value: "pause" },
                        { name: "Unpause", value: "unpause" },
                        { name: "Reroll", value: "reroll" },
                        { name: "Delete", value: "delete" },
                    ]
                },
                {
                    name: "message_id",
                    description: "Provide the message ID of the giveaway",
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        }
    ],
    },
    userPermissions: ['ManageGuild'],
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const gay = client.channels.cache.get("1191258162226024511");
        gay.send (
          `Giveaway command is being used in  **${interaction.guild.name}**  by  **${interaction.user.username}** `
        );
        const subcommand = interaction.options.getSubcommand();

        switch (subcommand) {
            case "create": {
                const prize = new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setCustomId("giveaway-prize")
                        .setLabel("Prize")
                        .setStyle(TextInputStyle.Short)
                        .setMaxLength(256)
                        .setRequired(true)
                );

                const winners = new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setCustomId("giveaway-winners")
                        .setLabel("Winner Count")
                        .setStyle(TextInputStyle.Short)
                        .setRequired(true)
                );

                const duration = new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setCustomId("giveaway-duration")
                        .setLabel("Duration")
                        .setStyle(TextInputStyle.Short)
                        .setPlaceholder("Example: 1 day")
                        .setRequired(true)
                );
                
                const modal = new ModalBuilder()
                    .setCustomId("giveaway-options")
                    .setTitle("Create a Giveaway")
                    .setComponents(prize, winners, duration);

                await interaction.showModal(modal);
            }
            break;

            case "manage": {
                const embed = new EmbedBuilder();
                const messageId = interaction.options.getString("message_id");
                const toggle = interaction.options.getString("toggle");

                const data = await DB.findOne({
                    GuildID: interaction.guild.id,
                    MessageID: messageId
                });
                if (!data) {
                    embed
                    .setColor("#2F3136")
                        .setDescription("Could not find any giveaway with that message ID");
                    return interaction.reply({ embeds: [embed], ephemeral: true });
                }

                const message = (await interaction.guild.channels.cache.get(data.ChannelID).messages.fetch(messageId));
                if (!message) {
                    embed
                    .setColor("#2F3136")
                        .setDescription("This giveaway doesn't exist");
                    return interaction.reply({ embeds: [embed], ephemeral: true });
                }

                if (["end", "reroll"].includes(toggle)) {
                    if (data.Ended === (toggle === "end" ? true : false)) {
                        embed
                        .setColor("#2F3136")
                            .setDescription(`This giveaway has ${toggle === "end" ? "already ended" : "not ended"}`);
                        return interaction.reply({ embeds: [embed], ephemeral: true });
                    }

                    if (toggle === "end" && data.Paused === true) {
                        embed
                        .setColor("#2F3136")
                            .setDescription("This giveaway is paused. Unpause it before ending the giveaway");
                        return interaction.reply({ embeds: [embed], ephemeral: true });
                    }

                    endGiveaway(message, (toggle === "end" ? false : true));

                    embed
                    .setColor("#2F3136")
                        .setDescription(`The giveaway has ${toggle === "end" ? "ended" : "been rerolled"}`);
                    return interaction.reply({ embeds: [embed], ephemeral: true });
                }

                if (["pause", "unpause"].includes(toggle)) {
                    if (data.Ended) {
                        embed
                        .setColor("#2F3136")
                            .setDescription("This giveaway has already ended");
                        return interaction.reply({ embeds: [embed], ephemeral: true });
                    }

                    if (data.Paused === (toggle === "pause" ? true : false)) {
                        embed
                        .setColor("#2F3136")
                            .setDescription(`This giveaway is already ${toggle === "pause" ? "paused" : "unpaused"}`);
                        return interaction.reply({ embeds: [embed], ephemeral: true });
                    }

                    const button = ActionRowBuilder.from(message.components[0]).setComponents(ButtonBuilder.from(message.components[0].components[0]).setDisabled(toggle === "pause" ? true : false));

                    const giveawayEmbed = EmbedBuilder.from(message.embeds[0]).setColor(toggle === "pause" ? "Yellow" : "#156789");

                    await DB.findOneAndUpdate({
                        GuildID: interaction.guild.id,
                        MessageID: message.id
                    }, { Paused: toggle === "pause" ? true : false });
                    
                    await message.edit({ content: `🎉 **Giveaway ${toggle === "pause" ? "Paused" : "Started"}** 🎉`, embeds: [giveawayEmbed], components: [button] });

                    embed
                    .setColor("#2F3136")
                        .setDescription(`The giveaway has been ${toggle === "pause" ? "paused" : "unpaused"}`);
                    interaction.reply({ embeds: [embed], ephemeral: true });

                    if (toggle === "unpause" && (data.EndTime * 1000) < Date.now()) endGiveaway(message);
                }

                if (toggle === "delete") {
                    await DB.deleteOne({
                        GuildID: interaction.guild.id,
                        MessageID: message.id
                    });

                    await message.delete();
                    embed
                    .setColor("#2F3136")
                        .setDescription("The giveaway has been deleted");
                    interaction.reply({ embeds: [embed], ephemeral: true });
                }
            }
            break;
        }
    },
};