const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } = require("discord.js");
const translate = require("@iamtraction/google-translate");

let color = "#2F3136";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("translate")
        .setDescription("Translate text to another language")
        .addStringOption(option =>
            option.setName("text")
                .setDescription("The text to be translated")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("to")
                .setDescription("The target language code (e.g. en, es, fr)")
                .setRequired(true)
        ),

    async execute(interaction) {
        const { options, member } = interaction;
        const text = options.getString("text");
        const to = options.getString("to");

        try {
            const result =  await translate(text, { to });

            const embed = new EmbedBuilder()
                .setColor(color)
                .setDescription(`Here is the translation of "${text}" to (${to}):`)
                .addFields({
                    name: 'Original text',
    
                    value: `${text}`,
                })
                .addFields({
                    name: 'Translation:',
    
                    value: result.text,
                })

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId("translate-retry")
                        .setLabel("Retry")
                        .setStyle(ButtonStyle.Secondary)
                );

            interaction.reply({
                embeds: [embed],
                components: [row],
               
            });

            const filter = i => i.customId === "translate-retry" && i.user.id === member.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

            collector.on("collect", async i => {
                try {
                    const retryResult = await translate(text, { to });

                    const retryEmbed = new EmbedBuilder()
                        .setColor(color)
                        .setDescription(`Here is the translation of "${text}" to (${to}):`)
                        .addFields({
                            name: 'Original text',
            
                            value: `${text}`,
                        })
                        .addFields({
                            name: 'Translation:',
            
                            value: retryResult.text,
                        })

                    i.update({
                        embeds: [retryEmbed],
                        components: [row],
                       
                    });
                } catch (err) {
                    console.error(err);
                    i.update({
                        content: "Something went wrong. Please try again later.",
                        components: [],
                        ephemeral: true
                    });
                }
            });

            collector.on("end", async () => {
                await row.components[0].setDisabled(true);
            });

        } catch (err) {
            console.error(err);
            interaction.reply({
                content: "Something went wrong. Please try again later.",
                ephemeral: true
            });
        }
    }
};
