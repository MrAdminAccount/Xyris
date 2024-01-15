const { SlashCommandBuilder } = require('discord.js');
const got = require("got");
module.exports = {
    data: new SlashCommandBuilder()
	.setName('nsfw')
	.setDescription('Nsfw commands in 1')
	.addStringOption(option =>
	  option.setName('category')
			.setDescription('Nsfw')
			.setRequired(true)
			.addChoices(
				{ name: '4k', value: '4k' },
				{ name: 'anal', value: 'anal' },
				{ name: 'ass', value: 'ass' },
        { name: 'blowjob', value: 'blowjob' },
        { name: 'cumsluts', value: 'cumsluts'},
        { name: 'milf', value: 'milf'},
        { name: 'pussy', value: 'pussy'},
)),
    async execute(interaction, client) {
        if (interaction.options.getString('category') === '4k') {
            const gay = client.channels.cache.get("1191258162226024511");
            gay.send (
              `4k command is being used in  **${interaction.guild.name}**  by  **${interaction.user.username}** `
            );
                var errMessage = "This is not an NSFW Channel";
                if (!interaction.channel.nsfw) {
                    return interaction.reply(errMessage)
                }
                got("https://www.reddit.com/r/RealGirls/random.json")
                    .then((response) => {
                        let content = JSON.parse(response.body);
                        var title = content[0].data.children[0].data.title;
                        var amazeme = content[0].data.children[0].data.url;
                        interaction.reply(`${amazeme}`)
                
                })
        }
        if (interaction.options.getString('category') === 'anal') {
            try {
                const gay = client.channels.cache.get("1191258162226024511");
                gay.send (
                  `anal command is being used in  **${interaction.guild.name}**  by  **${interaction.user.username}** `
                );
                var errMessage = "This is not an NSFW Channel";
                if (!interaction.channel.nsfw) {
                  
          
                  return interaction.reply(errMessage)
                }
                got("https://www.reddit.com/r/anal/random.json")
                  .then((response) => {
                    let content = JSON.parse(response.body);
                    var amazeme = content[0].data.children[0].data.url;
                    interaction.reply(amazeme)
                  })
                  .catch(console.error);
              } catch (err) {
               console.log(err)
          }
        }
        if (interaction.options.getString('category') === 'ass') {
            try {
                const gay = client.channels.cache.get("1191258162226024511");
                gay.send (
                  `ass command is being used in  **${interaction.guild.name}**  by  **${interaction.user.username}** `
                );
                var errMessage = "This is not an NSFW Channel";
                if (!interaction.channel.nsfw) {
                  return interaction.reply(errMessage)
                }
                got("https://www.reddit.com/r/Asshole/random.json")
                  .then((response) => {
                    let content = JSON.parse(response.body);
                    var amazeme = content[0].data.children[0].data.url;
                    interaction.reply(amazeme);
                  })
              } catch (err) {
              console.log(err) 
          }
        }
        if (interaction.options.getString('category') === 'blowjob') {
            try {
               
                const gay = client.channels.cache.get("1191258162226024511");
                gay.send (
                  `blowjob command is being used in  **${interaction.guild.name}**  by  **${interaction.user.username}** `
                );
                var errMessage = "This is not an NSFW Channel";
                if (!interaction.channel.nsfw) {
                  
          
                  return interaction.reply(errMessage)
                }
                got("https://www.reddit.com/r/Blowjobs/random.json")
                  .then((response) => {
                    let content = JSON.parse(response.body);
                    var amazeme = content[0].data.children[0].data.url;
                    interaction.reply(`${amazeme}`);
                  })
                  .catch(console.error);
              } catch (err) {
              console.log(err)
          }
        }
        if (interaction.options.getString('category') === 'cumsluts') {
            try {
              
                const gay = client.channels.cache.get("1191258162226024511");
                gay.send (
                  `cumslut command is being used in  **${interaction.guild.name}**  by  **${interaction.user.username}** `
                );
                var errMessage = "This is not an NSFW Channel";
                if (!interaction.channel.nsfw) {
                  
          
                  return interaction.reply(errMessage)
                }
                got("https://www.reddit.com/r/cumsluts/random.json")
                  .then((response) => {
                    let content = JSON.parse(response.body);
                    var title = content[0].data.children[0].data.title;
                    var amazeme = content[0].data.children[0].data.url;
          
            
                    interaction.reply(`${amazeme}`)
                  })
                  .catch(console.error);
              } catch (err) {
              console.log(err)
          }
        }
        if (interaction.options.getString('category') === 'milf') {
            try {
              
                const gay = client.channels.cache.get("1191258162226024511");
                gay.send (
                  `milf command is being used in  **${interaction.guild.name}**  by  **${interaction.user.username}** `
                );
                var errMessage = "This is not an NSFW Channel";
                if (!interaction.channel.nsfw) {
                  
          
                  return interaction.reply(errMessage)
                }
                got("https://www.reddit.com/r/milf/random.json")
                  .then((response) => {
                    let content = JSON.parse(response.body);
                    var title = content[0].data.children[0].data.title;
                    var amazeme = content[0].data.children[0].data.url;
                    interaction.reply(`${amazeme}`)
                  })
                  .catch(console.error);
              } catch (err) {
               console.log(err)
              }

        }
         if (interaction.options.getString('category') === 'pussy') {
          try {
          
            const gay = client.channels.cache.get("1191258162226024511");
            gay.send (
              `pussy command is being used in  **${interaction.guild.name}**  by  **${interaction.user.username}** `
            );
            var errMessage = "This is not an NSFW Channel";
            if (!interaction.channel.nsfw) {
              
      
              return interaction.reply(errMessage)
            }
            got("https://www.reddit.com/r/pussy/random.json")
              .then((response) => {
                let content = JSON.parse(response.body);
      
                var amazeme = content[0].data.children[0].data.url;
      
                interaction.reply(amazeme);
              })
              .catch(console.error);
          } catch (err) {
         console.log(err)
          }
         }

}
        
}