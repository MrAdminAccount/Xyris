const {
 Client, ChatInputCommandInteraction, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, ApplicationCommandOptionType , ComponentType   } = require('discord.js');

const moment = require('moment');
const axios = require("axios")

module.exports = {
  data: {
  name: 'userinfo',
  description: 'userinfo command',
  options: [
    {
      name: "member",
      description: "The member you want information on",
      type: ApplicationCommandOptionType.User,
      required: true,
    }
  ],
},
   
    async execute(interaction, client) {
      const gay = client.channels.cache.get("1191258162226024511");
      gay.send (
        `Userinfo command is being used in  **${interaction.guild.name}**  by  **${interaction.user.username}** `
      );
    const { user } = interaction.options.get("member")

    let flags = user.flags.toArray().join(" ");
    
    let member = interaction.guild.members.cache.get(user.id);
    let nitroBadge = user.displayAvatarURL({ dynamic: true });

    if (!flags) {
      flags = "None";
    }

    flags = flags.replace(
      "HOUSE_BRAVERY",
      "HypeSquad Bravery"
    );
    flags = flags.replace(
      "EARLY_SUPPORTER",
      "Early Supporter"
    );
    flags = flags.replace(
      "VERIFIED_DEVELOPER",
      "Verified Bot Developer"
    );
    flags = flags.replace(
      "EARLY_VERIFIED_DEVELOPER",
      "Verified Bot Developer"
    );
    flags = flags.replace(
      "HOUSE_BRILLIANCE",
      "HypeSquad Brilliance"
    );
    flags = flags.replace(
      "HOUSE_BALANCE",
      "HypeSquad Balance"
    );
    flags = flags.replace(
      "DISCORD_PARTNER",
      "Partner"
    );
    flags = flags.replace(
      "HYPESQUAD_EVENTS",
      "Hypesquad Events"
    );
    flags = flags.replace(
      "DISCORD_CLASSIC",
      "Discord Classic"
    );

    if (nitroBadge.includes("gif")) {
      flags =
        flags +
        "Nitro";
    }

    let safe = user.createdTimestamp;

    if (safe > 604800017) {
      safe = "Not Suspicious";
    } else {
      safe = "Suspicious";
    }

    let userRoles = member.roles.cache
      .map((x) => x)
      .filter((z) => z.name !== "@everyone");

    if (userRoles.length > 100) {
      userRoles = "More than 100 roles";
    }
    
    const avatar = {
      png: user.displayAvatarURL({ format: "png" }),
      jpeg: user.displayAvatarURL({ format: "jpeg" }),
      jpg: user.displayAvatarURL({ format: "jpg" }),
      gif: user.displayAvatarURL({ format: "gif" }),
      webp: user.displayAvatarURL({ format: "webp" }),
      dynamic: user.displayAvatarURL({ dynamic: true })
    }
    let av = `[png](${avatar.png}) | [jpeg](${avatar.jpeg}) | [jpg](${avatar.jpg}) | [gif](${avatar.gif}) | [webp](${avatar.webp})`;

    const devices = member.presence?.clientStatus || {};

    const description = () => {
      const entries = Object.entries(devices).map((value) => `${value[0][0].toUpperCase()}${value[0].slice(1)}`).join(", ") || "None";
      return `${entries}`
    }

    const row = new ActionRowBuilder().addComponents(
		new ButtonBuilder()
			.setCustomId("extra")
			.setLabel("Extra")
			.setStyle(ButtonStyle.Primary),

			new ButtonBuilder()
			.setCustomId("banner")
			.setLabel("Banner")
			.setStyle(ButtonStyle.Secondary),

			new ButtonBuilder()
			.setCustomId("permissions")
			.setLabel("Permissions")
			.setStyle(ButtonStyle.Success)
		)
      const embed1 = new EmbedBuilder()
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .setColor("#2F3136")
        .setTimestamp()
        .setDescription(
          `__**<:users:1100778945298825346> User Info**__
          **ID:** ${user.id}
          **Profile:** ${user}
          **Avatar:** ${av}
          **Bot:** ${user.bot ? "Yes" : "No"}
          **Badges:** ${ flags }
          **Created At:** ${moment(user.createdAt).format(
            "MMMM Do YYYY, H:mm:ss a"
          )}
     
      
      __**<:moderation:1100768120995582043> Member Info**__
      **Joined At:** ${moment(user.joinedAt).format(
    "MMMM Do YYYY, H:mm:ss a"
  )}
      **Suspicious Check:** ${safe}`)
    const msg = await interaction.reply({
			embeds: [embed1],
			components: [row],
            fetchReply: true 
		});
		const collector = msg.createMessageComponentCollector({
            componentType: ComponentType.Button
		})

    collector.on("collect", async (interaction) => {
			if (interaction.customId === "extra") {
			await	interaction.deferUpdate()
				const bruh = new EmbedBuilder()
					.setTitle("Extras")
					.setDescription(`**Roles: (${userRoles.length})** ${userRoles}`)
					.setColor("#2F3136")

				interaction.followUp({
					embeds: [bruh],
					ephemeral: true
				});
			}

      if (interaction.customId === "banner") {
			await 	interaction.deferUpdate()
				axios.get(`https://discord.com/api/users/${user.id}`, {
						headers: {
							Authorization: `Bot ${client.token}`
						},
					})
					.then((res) => {
						const {
							banner,
							accent_color
						} = res.data;

						if (banner) {
							const extension = banner.startsWith("a_") ? ".gif" : ".png";
							const url = `https://cdn.discordapp.com/banners/${user.id}/${banner}${extension}?size=2048`;
							const embed = new EmbedBuilder()
								.setTitle(` The Banner`)
								.setImage(url)
								.setDescription(`so eh`)
								.setColor("#2F3136")

							interaction.followUp({
								embeds: [embed],
								ephemeral: true
							})
						} else {
							if (accent_color) {
                const embed = new EmbedBuilder()
                .setDescription(` ¯\\_(ツ)_/¯ does not have a banner but they have an accent color`, )
                .setColor("#2F3136")
                interaction.followUp({ embeds: [embed],  ephemeral: true })
                } else {
                  interaction.followUp({ content: `does not have a banner nor do they have an accent color.`,   ephemeral: true }) 
                }
								
							}
						}
          )}
      const permissions = interaction.member.permissions.toArray().map(perm => {
        return perm
          .toLowerCase()
          .replace(/_/g, " ") 
          .replace(/\w\S*/g, txt => {
          
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          });
      });


if (interaction.customId === "permissions") {
 await interaction.deferUpdate()
const gay1 = new EmbedBuilder()
  .setTitle("Permissions")
  .setDescription(`${permissions.join(`, `)}`)
  .setColor("#2F3136")
interaction.followUp({
  embeds: [gay1],
  ephemeral: true
})

}})}}