const commandLoader = require('../../functions/commandHandler.js');
const chalk = require('chalk');
const types =require("../../utils/types")

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {

   

    console.log(chalk.magenta(`Ready! Logged in as ${client.user.tag}`));
    client.user.setActivity('/help', { type: types.activityType.Playing });
    client.user.setPresence({
        status: "idle",
    })
    
    commandLoader.load(client);
    commandLoader.loadAdmin(client);
  },
};
