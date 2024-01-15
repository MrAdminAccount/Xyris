const { ButtonStyle, ChannelType, ApplicationCommandType, ApplicationCommandOptionType, ActivityType, InteractionType, PermissionFlagsBits } = require('discord.js');

/* types for the new types */

module.exports = {
    buttonStyles: global.ButtonStyle = ButtonStyle,
    commandOptionType: global.ApplicationCommandOptionType = ApplicationCommandOptionType,
    channelType: global.ChannelType = ChannelType,
    commandType: global.ApplicationCommandType = ApplicationCommandType,
    activityType: global.ActivityType = ActivityType,
    interactionType: global.InteractionType = InteractionType,
    permissionFlagBits: global.PermissionFlagBits = PermissionFlagsBits
};