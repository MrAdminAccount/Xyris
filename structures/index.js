const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const { token, mongooseConnectionString } = require("./config.json");
const mongoose = require('mongoose');
const config = require('./config.json');
const logs = require("discord-logs");
const client = new Client({
  allowedMentions: {
    parse: ['users', 'roles'],
    repliedUser: false
  },
    partials: [Partials.Channel],
    intents: [
      GatewayIntentBits.GuildInvites,
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildPresences,
      GatewayIntentBits.GuildMessageReactions, 
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers
      
    ],
    
    
});
logs(client, {
  debug: true
});

client.legacyCommands = new Collection()
client.commands = new Collection();
client.adminCommands = new Collection();
client.buttons = new Collection();
client.nowPlaying = new Collection();
client.prefix = config.prefix;
//require("../functions/NQN")(client)
require("../functions/handleLogs").handleLogs(client)
require("../functions/messagehandler")(client);
require("../functions/buttonHandler")(client);
require("../functions/eventHandler")(client);
require("../functions/antiCrash")(client);
require("../functions/codeFunction").isUserPremium(client);
mongoose.connect(mongooseConnectionString).then(() => console.log("Database Connected")).catch(() => console.log("Database Connection Failed"))
module.exports = client;

client.login(token);
