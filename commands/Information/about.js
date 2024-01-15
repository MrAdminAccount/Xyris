const {
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ChatInputCommandInteraction,
	ComponentType,
	ButtonStyle
} = require("discord.js");
const os = require("os");
const core = os.cpus()[0];
const {
	utc
} = require("moment");
const {
	version: discordjsVersion
} = require('discord.js');

module.exports = {
	data: {
		name: 'about',
		description: `About Xyris`,
		emoji: "<:Moderator:906110598725640212>",
	},
	async execute(interaction, client) {
		const but = client.channels.cache.get("1191258162226024511");
		but.send(
			`About command is being used in  **${interaction.guild.name}**  by  **${interaction.user.username}** `
		);
		let totalSeconds = (client.uptime / 1000);
		let days = Math.floor(totalSeconds / 86400);
		totalSeconds %= 86400;
		let hours = Math.floor(totalSeconds / 3600);
		totalSeconds %= 3600;
		let minutes = Math.floor(totalSeconds / 60);
		let seconds = Math.floor(totalSeconds % 60);
		let uptime = `**${days}** days, **${hours}** hours, **${minutes}** minutes, **${seconds}** seconds`
		const homo = new ActionRowBuilder().addComponents(

			new ButtonBuilder()
			.setCustomId("general")
			.setLabel("General")
			.setStyle(ButtonStyle.Primary),
			new ButtonBuilder()
			.setCustomId("other")
			.setLabel("Other")
			.setStyle(ButtonStyle.Success),
			new ButtonBuilder()
			.setCustomId("privacy")
			.setLabel("Privacy policy")
			.setStyle(ButtonStyle.Danger),
			new ButtonBuilder()
			.setCustomId("Xyris")
			.setLabel("Xyris")
			.setStyle(ButtonStyle.Secondary),
			new ButtonBuilder()
            .setLabel("Support server")
            .setURL("https://discord.gg/RxJ9P2MT9g")
            .setStyle(ButtonStyle.Link),


		)
		const gay = new EmbedBuilder()
			.setColor("#2F3136")
			.setTitle(`Heya i'm Xyris`)
			.setThumbnail(client.user.displayAvatarURL({
				dynamic: true
			}))
			.addFields({
				name: "**Guild Count** <:Server:1193199113815199834>",

				value: `${client.guilds.cache.size} guilds`,
			})
			.addFields({
				name: `**User(s) Count** <:users:1100778945298825346> `,

				value: `${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} users`,
			})
			.addFields({
				name: '**Commands** <:slashcommands:1100779239508279357> ',

				value: `${client.commands.size} Commands`,
			})
			.addFields({
				name: '**Node** <:node:1100779442919440427>',
				value: `${process.version} on ${process.platform} ${process.arch}`,

			})
			.addFields({
				name: '**Cached Data** <:paper:1100779703138267177> ',
				value: `${client.emojis.cache.size} emojis`,
			})
			.addFields({
				name: '**Discord.js** <:djs:1193199885055430727>',
				value: `${discordjsVersion}`,
			})

			.addFields({
				name: "\u200c",
				value: (" • [Invite](https://discord.com/oauth2/authorize?client_id=1103245198173163520&scope=bot&permissions=112150186033151) `|`  •  [Support Server](https://discord.gg/RxJ9P2MT9g) `|` <:upvote:1100786331052937278> [Vote](https://top.gg/bot/1005886760154312724)"),
				inline: true
			}, )
			.setThumbnail(client.user.avatarURL())

			.setColor("#2F3136")


		const msg = await interaction.reply({
			fetchReply: true,
			embeds: [gay],
			components: [homo]
		});

		const userWhoRequested = interaction.user.id; // Store the user ID

		const filter = async (interaction) => {
			if (interaction.user.id !== userWhoRequested) {
				await interaction.reply({
					content: "<:AngryEyes:1196042941731442748> It's not your button smh",
					ephemeral: true,
				});
				return false;
			}
			return true;
		};
		
		const collector = msg.createMessageComponentCollector({
			filter,
			componentType: ComponentType.Button
		})

		collector.on("collect", async (interaction) => {
			if (interaction.customId === "other") {
				interaction.deferUpdate()

				const gay = new EmbedBuilder()
					.setColor("#2F3136")
					.setTitle(`Heya i'm Xyris`)
					.setThumbnail(client.user.displayAvatarURL({
						dynamic: true
					}))
					.addFields({
						name: '**Uptime** <:uptime:1100780660576227328>',

						value: `${uptime}`,
					})
					.addFields({
						name: '**Ping** <:ping:1100780871885279283> ',
						value: `${client.ws.ping}ms`,
					})
					.addFields({
						name: '**Creation Date** <:birth:1100782270593368124>',
						value: ` ${utc(client.user.createdTimestamp).format(
								"Do MMMM YYYY HH:mm:ss"
							  )}`
					})
					.addFields({
						name: '**Memory** <:ramm:1100784720662515782>',
						value: `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB Heap`,
					})
				await msg.edit({
					embeds: [gay]
				})

			}
			if (interaction.customId === "general") {
				interaction.deferUpdate()
				const gay = new EmbedBuilder()
					.setColor("#2F3136")
					.setTitle(`Heya i'm Xyris`)
					.setThumbnail(client.user.displayAvatarURL({
						dynamic: true
					}))
					.addFields({
						name: "**Guild Count** <:Server:1193199113815199834>",

						value: `${client.guilds.cache.size} guilds`,
					})
					.addFields({
						name: `**User(s) Count** <:users:1100778945298825346> `,

						value: `${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} users`,
					})
					.addFields({
						name: '**Commands** <:slashcommands:1100779239508279357> ',

						value: `${client.commands.size} Commands`,
					})
					.addFields({
						name: '**Node** <:node:1100779442919440427>',
						value: `${process.version} on ${process.platform} ${process.arch}`,

					})
					.addFields({
						name: '**Cached Data** <:paper:1100779703138267177> ',
						value: `${client.emojis.cache.size} emojis`,
					})
					.addFields({
						name: '**Discord.js** <:djs:1193199885055430727>',
						value: `${discordjsVersion}`,
					})

					.addFields({
						name: "\u200c",
						value: (" • [Invite](https://discord.com/oauth2/authorize?client_id=1103245198173163520&scope=bot&permissions=112150186033151) `|`  • [Support Server](https://discord.gg/RxJ9P2MT9g) `|` <:upvote:1100786331052937278>[Vote](https://top.gg/bot/1005886760154312724)"),
						inline: true
					}, )
					.setThumbnail(client.user.avatarURL())

					.setColor("#2F3136")
				await msg.edit({
					embeds: [gay]


				})
			

				}
				if (interaction.customId === "Xyris") {
					interaction.deferUpdate()
					const gay = new EmbedBuilder()
						.setTitle(`About the Devs`)
						.setThumbnail(`https://cdn.discordapp.com/attachments/1100734933334503446/1193203628161376326/QrO3Coj.png?ex=65abdc79&is=65996779&hm=6668983bc0bb17f81ec11d538857bd0c5abc22d8baf0f9a10331145e20cb8fc9&`)
						.setDescription(`
					My first bot, Xyris, is still in testing. A fun bot, that one.

					Weekly updates from Xyris.`)
						.addFields({
							name: `Developer/Creator:`,
							value: `
						| onyx1728
						`
						})
						.setThumbnail(client.user.avatarURL())

						.setColor("#2F3136")
					await msg.edit({
						embeds: [gay]


					})

			}
			if (interaction.customId === "privacy") {
				interaction.deferUpdate()
				const gay = new EmbedBuilder()
				.setTitle("Xyris Privacy Policy")
				.setDescription(`By using the bot you agree to our privacy policy\nRequested by: ${interaction.user}`)
				.addFields([
				  {
				  name: "**WHAT DATA DO WE STORE?**",
				  value: `
			  We do not collect any personal information relating your account like Passwords or any other Credentials. The data we collect includes the User IDs, Server IDs, Channel IDs and Some Role IDs. The bot never requests for any personal data of the users and any act that breaks the Tos of Discord is discouraged by us!`
				  },
				  {
				  name: "**WHY WE NEED THIS DATA?**",
				  value: `
			  The data is required for the proper functioning of the bot features like Logging and Blacklisting. Without this data, our bot will not be able to perform these activities and thus making the features inaccessible for users`
				  },
				  {
				  name: "**HOW DO WE USE THIS DATA?**",
				  value: `
			  The data is used for the proper functioning like User IDs are used to identify the users`
				  },
				  {
				  name: `**HOW LONG DO WE STORE YOUR DATA?**`,
				  value: `
			  The data is stored as long as the bot is in your Server and as soon as the bot is kicked or removed from the Server, the data is deleted and is no longer to accessable to anyone`
				  },
				  {
				  name: "**WHO DO WE SHARE THE DATA WITH**?",
				  value: `
			  We never share your data with anyone except for [MongoDB Inc](https://mongodb.com) whom is a DataBase Company and all the data for our Bot is stored on the MongoDB Servers and According to MongoDB Inc. the data is only accessable by us.`
				  },
				  {
				  name: "**GOT CONCERNS OR QUERIES?**",
				  value: `
			  If you have any concerns or queries relating our privacy policy or our bot or if you want your data to be removed, You can contact [onyx1728](https://discord.com/users/1100663113226928221) directy on our [Support Server](https://discord.gg/RxJ9P2MT9g)!`
				  }
				])
				.setColor("#2F3136");

				await msg.edit({
					embeds: [gay]


				})


			}
			

		})
	}

}