const {
    inspect
  } = require("util");
  const OWNER_ID = require("../../structures/config.json").OWNER_ID;
  const {
    Client,
    Message,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
  } = require("discord.js");
  
  module.exports = {
    name: 'eval',
    async execute(client, message, args) {
      if (message.author.id != OWNER_ID) {
        return}
  
        const code = args.join(" ");
        if (!code) return message.reply ("man where tf is the code?")
        try {
            let output = eval(code);
            if (typeof output !== "string") output = require("util").inspect(output);
            const row = new ActionRowBuilder().addComponents(
              new ButtonBuilder()
                .setCustomId("button-danger-eval")
                .setEmoji("<:delete:932294809652187266>")
                .setStyle(ButtonStyle.Danger),
           
              new ButtonBuilder()
                .setCustomId("save")
                .setEmoji("<:save:932295111520428032>")
                .setStyle(ButtonStyle.Secondary)
  
                );
                 
                const outputembed = new EmbedBuilder()
                    .setColor('#2F3136')
                    .setTitle(`<:Check:1100766121591840859> Evaluation Successful`)
                    .setDescription('**Input**\n\`\`\`js\n' + code + '\`\`\`\n**Output**\n\`\`\`' + output + '\`\`\`')
                    .addFields({
                      name: 'TypeOf',
                      value: `\`\`\`${typeof (code)}\`\`\``
                    })
                  
                 
            const col = await message.channel.send({
              embeds: [outputembed], components: [row] });
  
            const filter = (interaction) => {
              if (interaction.user.id === OWNER_ID) return true;
              return interaction.reply({ content: "Only For My Owner", ephemeral: true })
            }
  
            const collector = col.createMessageComponentCollector({
              filter
            })
  
            collector.on("collect", async(interaction) => {
              interaction.deferUpdate();
              if (interaction.customId === "save") {
                client.channels.cache.get("1194590317966532608").send({ embeds: [new EmbedBuilder()
                  .setTitle("New code :3")
                  .setColor("#2F3136")
                  .setTitle("<:Check:1100766121591840859> Evaluation was saved")
                  .setDescription('**Input**\n\`\`\`js\n' + code + '\`\`\`\n**Output**\n\`\`\`' + output + '\`\`\`')] });
              }
              else if (interaction.customId === "button-danger-eval") {
                col.delete()
              }
            })
       
        } catch (error) {
            const errorEmbed = new EmbedBuilder()
                .setTitle(`<:Check:1100766121591840859> An Error Occurred!`)
                .setColor('#2F3136')
                .setDescription(`\`\`\`${error}\`\`\``)
              message.channel.send({ embeds: [errorEmbed] })
              console.log(error)
        }
    }
  }