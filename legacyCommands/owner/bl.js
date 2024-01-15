const OWNER_ID = require("../../structures/config.json").OWNER_ID;

module.exports = {
  name: "botl",
  description: "Check what Servers the bot is in!",
  async execute(client, message, args) {
    try {
      if (message.author.id != OWNER_ID) {return }
      client.guilds.cache.forEach(servers => {
        message.channel.send({ content: 'Server Name: '+ servers.name + 'Members: ' + servers.memberCount})
        })
    } catch (err) {
      message.channel.send(
        `Whoops, We got a error right now! This error has been reported to Support center!`
      );
    }
  },
};

