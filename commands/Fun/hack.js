const ms = module.require("ms");
const { ApplicationCommandOptionType } = require("discord.js");
module.exports = {
  data: {
  name: "hack",
  description: "heck someone account ",
  options: [
      {
          name: "user",
          description: "who you want to be hecked",
          required: true,
          type: ApplicationCommandOptionType.User,
          
      }
  ],
},
 	  async execute(interaction, client) {

       const gay = client.channels.cache.get("1191258162226024511");
    gay.send (
      `hack command is being used in  **${interaction.guild.name}**  by  **${interaction.user.username}** `
    );
    const tohack = interaction.options.getMember("user");
    let msg = await interaction.reply(`Hacking ${tohack.displayName}....`);

    let time = "1s";
    setTimeout(function () {
      interaction.editReply(`Finding ${tohack.displayName}'s Email and Password.....`);
    }, ms(time));

    let time1 = "6s";
    setTimeout(function () {
      interaction.editReply(`E-Mail: ${tohack.displayName}@gmail.com \nPassword: ********`);
    }, ms(time1));

    let time2 = "9s";
    setTimeout(function () {
      interaction.editReply("Finding Other Accounts.....");
    }, ms(time2));

    let time3 = "15s";
    setTimeout(function () {
      interaction.editReply("Setting up Epic Games Account.....");
    }, ms(time3));

    let time4 = "21s";
    setTimeout(function () {
      interaction.editReply("Hacking Epic Games Account......");
    }, ms(time4));

    let time5 = "28s";
    setTimeout(function () {
      interaction.editReply("Hacked Epic Games Account!!");
    }, ms(time5));

    let time6 = "31s";
    setTimeout(function () {
      interaction.editReply("Collecting Info.....");
    }, ms(time6));

    let time7 = "38s";
    setTimeout(function () {
      interaction.editReply("Selling data to FBI....");
    }, ms(time7));

    let time8 = "41s";
    setTimeout(function () {
      interaction.editReply(`Finished Hacking ${tohack.displayName}`);
    }, ms(time8));
  },
};