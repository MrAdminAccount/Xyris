const blacklist = require("../../structures/schemas/blacklist");
const {EmbedBuilder} = require('discord.js');
const OWNER_ID = require("../../structures/config.json").OWNER_ID;

module.exports = {
    name : 'blacklist',
    async execute(client, message, args) {
        if (message.author.id != OWNER_ID) {return}
    
        const User = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!User) return message.reply('<:Check:1100766121591840859>| Please provide a valid user!')

        blacklist.findOne({ id : User.user.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
                message.reply(`<:Check:1100766121591840859> | ${User.user.tag} is already Blacklisted!`)
            } else {
                data = new blacklist({ id : User.user.id })
                data.save()
                .catch(err => console.log(err))
                const yay = new EmbedBuilder()
                .setColor("#2F3136")
                .setDescription(`**<:Check:1100766121591840859> | ${User.user.tag} has been blacklisted!**`)
            message.channel.send({embeds : [yay]})
            }
           
        })
    }
}