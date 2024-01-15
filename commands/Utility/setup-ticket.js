const { Client, CommandInteraction, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, AttachmentBuilder, ApplicationCommandOptionType, ChannelType } = require('discord.js');


module.exports = {
    data: {
    name: 'setup-ticket',
    description: "Setup a ticket in your server",
    options: [
        {
            name: "channel",
            description: "provide channel to setup ticket",
            type: ApplicationCommandOptionType.Channel,
            required: true
        },
        {
            name: "category",
            description: "provide category where created ticket will be displayed",
            type: ApplicationCommandOptionType.Channel,
            required: true
        }
    ],
},
userPermissions: ['ManageGuild'],
async execute(interaction, client) {
    const but = client.channels.cache.get("1191258162226024511");
		but.send(
			`setup-ticket command is being used in  **${interaction.guild.name}**  by  **${interaction.user.username}** `
		);
       
        const data = interaction.options.getChannel("channel");
        const data2 = interaction.options.getChannel("category")

        
        const channel = interaction.guild.channels.cache.get(`${data.id}`);
        const category = interaction.guild.channels.cache.get(`${data2.id}`)

      
        if (!channel.viewable) {
            return interaction.reply({
                content: "The provided channel is not visible to me",
                ephemeral: true
            })
        }

       
        if (category.type !== ChannelType.GuildCategory) {
            return interaction.reply({
                content: "The category you provided is invalid",
                ephemeral: true
            })
        }

        
        if (!category.viewable) {
            return interaction.reply({
                content: "The provided category is not visible to me",
                ephemeral: true
            })
        }

        if (!category.permissionsFor(client.user.id).has("ManageChannels")) {
            return interaction.reply({
                content: "The bot is missing manage-channels permissions to create ticket channel",
                ephemeral: true
            })
        }

    
         const embed = new EmbedBuilder()
           .setImage("attachment://ticket.png")
           .setColor("#2f3136")

      
        const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`ticket-setup-${interaction.guild.id}-${category.id}`)
                    .setLabel('Create Ticket')
                    .setStyle(ButtonStyle.Secondary),
            );

    
        const attachments = new AttachmentBuilder()
            .setFile("ticket.png")

        await interaction.reply({
            content: `The ticket has been setup to ${channel} successfully.`,
            ephemeral: true
        })

       
        channel.send({
            embeds: [embed],
            components: [button],
            files: [attachments]
        })
    }
}
