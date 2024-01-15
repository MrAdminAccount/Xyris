const { ButtonInteraction, Client, EmbedBuilder } = require("discord.js");
const DB = require("../../structures/schemas/GiveawayDB");

module.exports = {
    name: "interactionCreate",
    /**
     * @param {ButtonInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        if (!interaction.isButton()) return;
        if (interaction.customId !== "giveaway-join") return;

        const embed = new EmbedBuilder();
        const data = await DB.findOne({
            GuildID: interaction.guild.id,
            ChannelID: interaction.channel.id,
            MessageID: interaction.message.id
        });

        if (!data) {
            embed
            .setColor("#2F3136")
                .setDescription("There is no data in the database");
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (data.Entered.includes(interaction.user.id)) {
            embed
            .setColor("#2F3136")
                .setDescription("You have already joined the giveaway");
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (data.Paused === true) {
            embed
            .setColor("#2F3136")
                .setDescription("This giveaway is paused");
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (data.Ended === true) {
            embed
            .setColor("#2F3136")
                .setDescription("This giveaway has ended");
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        await DB.findOneAndUpdate({
            GuildID: interaction.guild.id,
            ChannelID: interaction.channel.id,
            MessageID: interaction.message.id
        }, {
            $push: { Entered: interaction.user.id }
        }).then(() => {
            embed
            .setColor("#2F3136")
                .setDescription("You have joined the giveaway");
            return interaction.reply({ embeds: [embed], ephemeral: true });
        });
    }
};