const Discord = require("discord.js");
const OWNER_ID = require("../../structures/config.json").OWNER_ID;
const {ChannelType} = require("discord.js")

module.exports = {
 
    name: "getinvite",
    category: "owner",
    description: "yk",
    usage: " ",
    async execute(client, message, args) {
        if (message.author.id != OWNER_ID) {
            return message.channel.send("Limited to the bot owner only!");
          }
        let guild = client.guilds.cache.find(g => g.id === args.join(" ") || g.name.toLowerCase() === args.join(" ").toLowerCase()) ||
        message.guild

        let invite
        let textChannels = guild.channels.cache.find(c => c.type ===  ChannelType.GuildText  && c.permissionsFor(client.user.id).has("CreateInstantInvite"))
        if(!textChannels) { invite = "No channels" }
        await textChannels.createInvite({
            maxAge: 0,
            maxUses: 0
        }).then((inv) => {
            invite = inv.url
        })

        message.author.send({content: `**Guild:** ${guild.name}\n**Invite:** ||${invite}||`})
        message.delete()
    }
}


 

