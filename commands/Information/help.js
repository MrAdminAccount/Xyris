const {
	EmbedBuilder,
	ActionRowBuilder,
	StringSelectMenuBuilder,
	StringSelectMenu,
} = require("discord.js");
const {
	readdirSync
} = require("fs");
let color = "#2F3136";
const prefix = `/`
module.exports = {
	data: {
		name: "help",
		description: "Shows All Commands!",
	},
	async execute(interaction, client) {
		const but = client.channels.cache.get("1191258162226024511");
		but.send(
			`Help command is being used in  **${interaction.guild.name}**  by  **${interaction.user.username}** `
		);
		const row = new ActionRowBuilder().addComponents(
			new StringSelectMenuBuilder({
				placeholder: 'Click me to select a category',
				customId: 'main',
				options: [{
						label: 'Information commands ',
						value: "Option 3",
						emoji: '<:info:1100767087879782430>',
					},
					{
						label: 'Fun commands ',
						value: "Option 2",
						emoji: '<a:fun:896046101503807549>',
					},
					{
						label: 'Moderation commands',
						value: "option 7",
						emoji: "<:Moderator:906110598725640212>"
					},
					{
						label: 'Server utility',
						value: "Option 5",
						emoji: '<:server:915945987334373436>',
					},
					{
						label: 'Other commands ',
						value: "Option 4",
						emoji: '<:NightShadesmug:900784389238165574>',
					},
					{
						label: 'Nsfw commands',
						value: "Option 8",
						emoji: '<:NSFW_4k:917803547117121586>'
					},






				]
			})


		)


		const emo = {

			Fun: "<a:fun:896046101503807549>",
			Other: "<:NightShadesmug:900784389238165574>",
			Information: "<:info:1100767087879782430>",
			Nsfw: "<:Night_nsfw:900786948254347286>",
			Moderation: "<:BanHammer:917803023294677002>",
			Utility: "<:server:915945987334373436>",
		}

		let categories = [];

		let ccate = [];
		readdirSync("./commands/").forEach((dir) => {

			const name = `${emo[dir]} - ${dir}`;

			let nome = dir;

			let cats = new Object();


			cats = {
				name: name,
				value: `_ _`,
				inline: true
			}


			categories.push(cats);
			ccate.push(nome);
		});

		const embed = new EmbedBuilder()
			.setTitle(`Xyris's help page`)
			.setThumbnail(client.user.displayAvatarURL({
				dynamic: true
			}))
			.setColor(color)
			.setDescription(`
		  Hey there ${interaction.user}, your help has arrived!
	  
		  Xyris is a feature-rich, multifunctional Discord bot!
	  
		  **Xyris's command categories**
	  
		  <:reply:1100784754783162369> Information 
		  <:reply:1100784754783162369> Fun 
		  <:reply:1100784754783162369> Moderation
		  <:reply:1100784754783162369> Server utility
		  <:reply:1100784754783162369> Other
		  <:reply:1100784754783162369> Nsfw
	  
		  Choose a category below for Information, Fun, Moderation, Server utility, Other commands and Nsfw!
	  
		  • [Invite Me](https://discord.com/oauth2/authorize?client_id=1103245198173163520&scope=bot&permissions=112150186033151) • [Support Server](https://discord.gg/RxJ9P2MT9g)`)
		let help = await interaction.reply({
			fetchReply: true,
			embeds: [embed],
			components: [row]
		});
		const userWhoRequested = interaction.user.id; // Store the user ID

		const filter = async (interaction) => {
			if (interaction.user.id !== userWhoRequested) {
				interaction.reply({
					content: "<:AngryEyes:1196042941731442748> Don't help other people to select the menu smh",
					ephemeral: true,
				});
				return false;
			}
			return true;
		};
		

		const collector = help.createMessageComponentCollector({
			filter,
			componentType: StringSelectMenu

		})

		collector.on('collect', async (menu) => {
			menu.deferUpdate();

		
				 if (menu.values[0] === 'Option 2') {
				const fireisgay = new EmbedBuilder()
					.setThumbnail(`https://cdn.discordapp.com/emojis/900785173136805909.webp?size=96&quality=lossless`)
					.setColor("#2F3136")
					.setTitle(`**__Fun Commands__**`)
					.addFields({
						name: `${prefix}8ball`,
						value: "Tells you the future "
					})
					.addFields({
						name: `${prefix}hack`,
						value: "Hack someone"
					})
					.addFields({
						name: `${prefix}advice`,
						value: "Get some advice"
					})
					.addFields({
						name: `${prefix}meme`,
						value: `Send's you a *funny* meme, lul`
					})
					.addFields({
						name: `${prefix}ship`,
						value: `Ship someone`
					})
					.addFields({
						name: `${prefix}say`,
						value: "say something"
					})
					.addFields({
						name: `${prefix}quote`,
						value: "Get a random quote to inspire you!"
					})
					.addFields({
						name: `${prefix}motivation`,
						value: "Get a motivational quote to help you power through!"
					})
					.addFields({
						name: `${prefix}Joke`,
						value: "Xyris will do Komeady to make you laugh"
					})
				await help.edit({
					embeds: [fireisgay]
				})

			} else if (menu.values[0] === 'Option 3') {
				const fireisgay = new EmbedBuilder()
					.setThumbnail(`https://cdn.discordapp.com/emojis/906110598725640212.webp?size=44&quality=lossless	`)
					.setColor("#2F3136")
					.setTitle(`**__Information Commands__**`)
					.addFields({
						name: `${prefix}About`,
						value: "Bot's info"
					})
					.addFields({
						name: `${prefix}Help`,
						value: "Yay, You found this one"
					})
					.addFields({
						name: `${prefix}Ping`,
						value: "Ping and stuff"
					})
					.addFields({
						name: `${prefix}Uptime`,
						value: "Bot's uptime"
					})
					.addFields({
						name: `${prefix}Vote`,
						value: `Vote me for :3`
					})
					
					.addFields({
						name: `${prefix}Support`,
						value: "Send's the invite of the Support server"
					})
					.addFields({
						name: `${prefix}invite`,
						value: "Invite Xyris?"
					})
					.addFields({
						name: `${prefix}redeem-code`,
						value: "Redeem a premium code"
					})
					
					
				await help.edit({
					embeds: [fireisgay]
				})

			} else if (menu.values[0] === 'Option 4') {
				const fireisgay = new EmbedBuilder()
					.setThumbnail(`https://cdn.discordapp.com/emojis/917755496184836106.webp?size=96&quality=lossless`)
					.setColor("#2F3136")
					.setTitle(`**__Other Commands__**`)
					.addFields({
						name: `${prefix}Avatar`,
						value: "Avatar look"
					})
					.addFields({
						name: `${prefix}userinfo`,
						value: "Userinfo"
					})
					.addFields({
						name: `${prefix}serverinfo`,
						value: "Serverinfo"
					})
					.addFields({
						name: `${prefix}Bug`,
						value: "Found any bugs? well, report it"
					})
					.addFields({
						name: `${prefix}Suggest`,
						value: "Suggest something to Xyris's development team"
					})
					.addFields({
						name: `${prefix}Membercount`,
						value: "Shows the membercount of the server"
					})
					.addFields({
						name: `${prefix}Weather`,
						value: "The city name or zip code to get the weather for"
					})
					.addFields({
						name: `${prefix}translate`,
						value: "Translate text to another language"
					})
					.addFields({
						name: `${prefix}urban`,
						value: "Get the urban dictionary definition of a word"
					})
				await help.edit({
					embeds: [fireisgay]
				})
			} else if (menu.values[0] === 'Option 8') {
				const fireisgay = new EmbedBuilder()
					.setThumbnail(`https://cdn.discordapp.com/emojis/917803547117121586.webp?size=96&quality=lossless`)
					.setDescription(`The "nsfw commands" now operate differently due to technical considerations, according to my development team. You must enter a "nsfw channel" and enter the command "/nsfw" to access them. All of the NSFW instructions will be displayed to you as "options" in this manner. Any nsfw command can be selected, and then click "Enter".`)
					.setImage(`https://cdn.discordapp.com/attachments/877804343976394772/1040266515787829350/image.png`)
					.setColor(color)
					.setTitle(`**__Nsfw Commands__**`)
					.addFields({
						name: `${prefix}nsfw`,
						value: "Nsfw commands",
					})

				await help.edit({
					embeds: [fireisgay]
				})
			
			} else if (menu.values[0] === 'option 7') {
				const fireisgay = new EmbedBuilder()
					.setThumbnail(`https://cdn.discordapp.com/emojis/917803023294677002.webp?size=96&quality=lossless`)
					.setColor(color)
					.setTitle("**__Moderation commands__**")
					.addFields({
						name: `${prefix}Ban`,
						value: "Ban's a member",
					})
					.addFields({
						name: `${prefix}Kick`,
						value: "Kick's a member"
					})
					.addFields({
						name: `${prefix}Purge`,
						value: "Clear messages from a channel"
					})
					.addFields({
						name: `${prefix}Timeout`,
						value: "Stfu a member"
					})
					.addFields({
						name: `${prefix}Unban`,
						value: "Unban's a banned member from the guild"
					})
					.addFields({
						name: `${prefix}nuke`,
						value: "nuke a channel"
					})
					.addFields({
						name: `${prefix}Warnings`,
						value: "A set of warning commands"
					})
			
			
				await help.edit({
					embeds: [fireisgay]
				})

			} else if (menu.values[0] === 'Option 5') {
				const fireisgay = new EmbedBuilder()
					.setThumbnail(`https://cdn.discordapp.com/emojis/915945987334373436.webp?size=96&quality=lossless`)
					.setColor("#2F3136")
					.setTitle(`**__Server Utility__**`)
					.addFields({
						name: `${prefix}Giveaway`,
						value: "Start a giveaway"
					})
					.addFields({
						name: `${prefix}welcomesystem`,
						value: "Welcome/leave command setup"
					})
					.addFields({
						name: `${prefix}setup-logs`,
						value: "Enable audit logging by setting the channel."
					})
					.addFields({
						name: `${prefix}gtn`,
						value: "Setup the gtn event. (Guess The Number)"
					})
					.addFields({
						name: `${prefix}setup-ticket`,
						value: "Setup a ticket panel in your server"
					})
					.addFields({
						name: `${prefix}jointocreate`,
						value: "Setup a JoinToCreate Vc in your server"
					})
					.addFields({
						name: `${prefix}addrole`,
						value: "Add a role to the reaction role panel"
					})
					.addFields({
						name: `${prefix}removerole`,
						value: "Remove a role to the reaction role panel"
					})
					.addFields({
						name: `${prefix}panel`,
						value: "Reaction role panel"
					})
					
			    	await help.edit({
					 embeds: [fireisgay]
				})

			
			}
			


		})
	}
}