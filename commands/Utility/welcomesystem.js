const {
    SlashCommandBuilder,
    ChannelType,
    ChatInputCommandInteraction,
    EmbedBuilder,
  } = require("discord.js");
  const leaveSchema = require("../../structures/schemas/leaveSchema");
  const joinSchema = require("../../structures/schemas/joinSchema");

  module.exports = {
    data: new SlashCommandBuilder()
      .setName("welcomesystem")
      .setDescription("Welcome/leave command setup")
      .addSubcommand((subcommand) =>
        subcommand
          .setName("disable")
          .setDescription("disable and delete the data on this guild")
      )
      .addSubcommand((subcommand) =>
        subcommand
          .setName("leave")
          .setDescription("Set or replace the leave message channel.")
          .addChannelOption((option) =>
            option
              .setName("channel")
              .setDescription("Channel to send the leave message to.")
              .addChannelTypes(ChannelType.GuildText)
              .setRequired(true)
          )
      )
      .addSubcommand((subcommand) =>
        subcommand
          .setName("welcome")
          .setDescription("Set or replace the welcome message channel.")
          .addChannelOption((option) =>
            option
              .setName("channel")
              .setDescription("Channel to send the message to.")
              .addChannelTypes(ChannelType.GuildText)
              .setRequired(true)
          )
      ),
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    userPermissions: ['ManageGuild'],
    async execute(interaction, client) {
      const gay = client.channels.cache.get("1191258162226024511");
      gay.send (
        `welcomesystem command is being used in  **${interaction.guild.name}**  by  **${interaction.user.username}** `
      );
      const sub = interaction.options.getSubcommand();
  
      switch (sub) {
        case "leave":
          {
            if (interaction.options.getSubcommand() === "leave") {
              const channel = interaction.options.getChannel("channel");
              const leaveSys = await leaveSchema.findOne({
                guildId: interaction.guild.id,
              });
  
              if (!leaveSys) {
                leaveChannel = new leaveSchema({
                  guildId: interaction.guild.id,
                  channelId: channel.id,
                });
  
                await leaveChannel.save().catch((err) => console.log(err));
                const successEmbed = new EmbedBuilder()
                  .setDescription(`<:Check:1100766121591840859> Enabled leave message in **${channel.name}**!`)
                  .setColor("#2F3136")
                await interaction.reply({
                  embeds: [successEmbed],
                  ephemeral: true,
                });
              }
              if (leaveSys) {
                await leaveSchema.findOneAndUpdate(
                  { guildId: interaction.guild.id },
                  { channelId: channel.id }
                );
                const successEmbed = new EmbedBuilder()
                  .setDescription(`<:Check:1100766121591840859> Updated leave messages to **${channel.name}**!`)
                  .setColor("#2F3136")
  
                await interaction.reply({
                  embeds: [successEmbed],
                  ephemeral: true,
                });
              }
            }
          }
          break;
        case "welcome":
          {
            if (interaction.options.getSubcommand() === "welcome") {
              const channel = interaction.options.getChannel("channel");
              const joinSys = await joinSchema.findOne({
                guildId: interaction.guild.id,
              });
  
              if (!joinSys) {
                joinChannel = new joinSchema({
                  guildId: interaction.guild.id,
                  channelId: channel.id,
                });
  
                await joinChannel.save().catch((err) => console.log(err));
                const successEmbed = new EmbedBuilder()
                  .setDescription(`<:Check:1100766121591840859> Enabled welcome message in **${channel.name}**!`)
                  .setColor("#2F3136")
                await interaction.reply({
                  embeds: [successEmbed],
                  ephemeral: true,
                });
              }
              if (joinSys) {
                await joinSchema.findOneAndUpdate(
                  { guildId: interaction.guild.id },
                  { channelId: channel.id }
                );
                const successEmbed = new EmbedBuilder()
                  .setDescription(`<:Check:1100766121591840859> Updated welcome messages to **${channel.name}**!`)
                  .setColor("#2F3136")
  
                await interaction.reply({
                  embeds: [successEmbed],
                  ephemeral: true,
                });
              }
            }
          }
          break;
        case "disable":
          {
            if (interaction.options.getSubcommand() === "disable") {
              await joinSchema.findOneAndDelete({
                guildId: interaction.guild.id,
              });
              await leaveSchema.findOneAndDelete({
                guildId: interaction.guild.id,
              });
  
              const successEmbed = new EmbedBuilder()
                .setDescription(`<:Check:1100766121591840859> Successfully deleted the data in this guild.`)
                .setColor("#2F3136")
              await interaction.reply({
                embeds: [successEmbed],
                ephemeral: true,
              });
            }
          }
          break;
      }
    },
  };