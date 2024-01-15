const { 
    EmbedBuilder,
    SlashCommandBuilder, 
    ActionRowBuilder,
	ButtonBuilder,
    ButtonStyle } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("announce")
        .setDescription("Send an annoucement to active Servers")
        .addStringOption((option) => option.setName("message").setDescription("Message to send.").setRequired(true)),

    async execute(interaction, client) {
        try {
            const homo = new ActionRowBuilder().addComponents(

                new ButtonBuilder()
                .setCustomId("Xyris")
                .setLabel("Xyris now has 39,709 users!")
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(true),
                new ButtonBuilder()
                .setCustomId("Xyris2")
                .setLabel("Xyris is in 264 guilds")
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(true),
                new ButtonBuilder()
                .setCustomId("Xyris3")
                .setLabel("Thank you all for the support.")
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(true)
            )
        
        message = interaction.options.getString("message")
        
        client.guilds.cache.forEach((g) => {
            const channel = g.channels.cache.find(ch => ch.type === ChannelType.GuildText && ch.permissionsFor(client.user.id).has(["SendMessages", "EmbedLinks"]));
            if(!channel) return;
            channel.send({  components: [homo], embeds: [
                new EmbedBuilder()
                .setTitle("Alert")
                .setDescription(`**Users, good evening. The developer team is sending you this message. This message is to notify you that a new command has been added, as well as some bug fixes and information about the beta premium system.**`)
                .addFields({
                    name: "Xyris beta premium system",
                    value: "As stated in the previous message, Xyris is currently in beta testing. Certain commands in Xyris are behind a paywall.",
                })
                .addFields({
                    name: "What is the new command?",
                    value: "/automod",
                })
                .addFields({
                    name: "Premium system",
                    value: `It is incredibly cheap. Join the support server and create a ticket for more information  50 rupees for one month, 7 rupees for one day, and 200 rupees for one year. (₹) we're also removed /nsfw from the premium system`,
                })
                .addFields({
                    name: "GPT-4",
                    value: `Many of you may be aware that Chat-GPT 4 is now available, and the good news is that we have already begun to implement it. All we need is authorization to use their API.`,
                })
                .addFields({
                    name: "Bugs and Downtime",
                    value: `There was a significant downtime for the first time since Xyris's creation. We apologise for this, as there were issues with our APIs that prevented Xyris from functioning. We also had problems with our host, so there was a lot of downtime, and normally Xyris's command usage is at least 200 times a day, but during this downtime the command usage dropped to 5-10 times a day, which was really upsetting to see, but unfortunately we haven't been able to fix the problem with our host yet, so you may still see downtime, but we assure you we will be back as soon as possible.`,
                })
                .setColor("#2F3136")]})
          })
          
        }catch (error) {
            console.error(error);
          }
          interaction.reply({ content:` Recieved the announcement`, })
        }}
