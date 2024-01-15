const { ApplicationCommandOptionType, Client, CommandInteraction } = require("discord.js");
const schema = require("../../structures/schemas/join-to-create")

module.exports = {
    data: {
    name: "jointocreate",
    description: "setup join to create channel",
   
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    },
    userPermissions: ["ManageGuild", "Connect"],
    botPermissions: ["ManageGuild", "ManageChannels"],
    async execute(interaction, client) {
        const but = client.channels.cache.get("1191258162226024511");
		but.send(
			`jointocreate command is being used in  **${interaction.guild.name}**  by  **${interaction.user.username}** `
		);
        const channel = interaction.member.voice.channelId
        if (!channel) return interaction.reply(`**${interaction.member}** Join the voice channel you wanna convert to **join to create** vc`);

        let data = await schema.findOne({ Guild: interaction.guild.id })
        if (!data) {
            data = new schema({
                Guild: interaction.guild.id,
                Channel: channel
            }).save()
        } else {
            data.Channel = channel
            data.save()
        }

        interaction.reply({
            content: `<#${channel}> has been set to "join to create vc"`
        })
    }
}

