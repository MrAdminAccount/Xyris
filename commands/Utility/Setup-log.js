const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const logSchema = require("../../structures/schemas/Logs");
const client = require("../../structures/index")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setup-logs")
        .setDescription("Set up your logging channel for the audit logs.")
        .addChannelOption(option =>
            option.setName("channel")
                .setDescription("Channel for logging messages.")
                .setRequired(false)
        ),
        userPermissions: ['ManageGuild'],
    async execute(interaction) {
        const but = client.channels.cache.get("1191258162226024511");
		but.send(
			`setup-logs command is being used in  **${interaction.guild.name}**  by  **${interaction.user.username}** `
		);
        const { channel, guildId, options } = interaction;
        const logChannel = options.getChannel("channel") || channel;
        const embed = new EmbedBuilder();

        logSchema.findOne({ Guild: guildId }, async (err, data) => {
            if (!data) {
                await logSchema.create({
                    Guild: guildId,
                    Channel: logChannel.id
                });
 
                embed.setDescription(`<:Check:1100766121591840859> Now, all of the server's logs will appear in ${logChannel}.`)
                .setColor("#2F3136")
                    .setTimestamp();
            } else if(data) {
                   await data.updateOne({  Channel: logChannel.id })
                } else {
                  await data.create({
                       Guild: guildId,
                       Channel: logChannel.id
                  })
                }

                embed.setDescription(`<:Check:1100766121591840859> Successfully updated the logs channel to ${logChannel}.`)
                .setColor("#2F3136")
                    .setTimestamp();
            

            if (err) {
                embed.setDescription("<:no:1100766396385861763> Something went wrong. Please contact the developers")
                .setColor("#2F3136")
                    .setTimestamp();
            }

            return interaction.reply({ embeds: [embed], ephemeral: true });
        })
    }
}