const Weather = require("weather-js");
const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "weather",
    emoji: "☁️",
    description: "Displays the current weather for a specified location.",
    options: [
      {
        name: "location",
        description: "The city name or zip code to get the weather for.",
        type: ApplicationCommandOptionType.String,
        required: true
      }
    ]
  },
  execute(interaction, client) {
    const gay = client.channels.cache.get("1191258162226024511");
    gay.send (
      `weather command is being used in  **${interaction.guild.name}**  by  **${interaction.user.username}** `
    );
    const location = interaction.options.getString("location").trim();
    if (!location) return interaction.reply("Please provide a city name or zip code.");

    Weather.find({ search: location, degreeType: "C" }, (err, result) => {
      if (err) return interaction.reply(`I couldn't find weather information for "${location}". Please check your input and try again.`);
      if (!result || !result.length) return interaction.reply(`I couldn't find weather information for "${location}". Please check your input and try again.`);

      const data = result[0];

      const temperature = data.current.temperature;
      const humidity = data.current.humidity;
      const windSpeed = data.current.windspeed;
      const description = data.current.skytext;

      const embed = new EmbedBuilder()
        .setTitle(`Weather for ${data.location.name}`)
        .setThumbnail("https://cdn.discordapp.com/attachments/877804343976394772/1072130324135424060/google-weather-icon-8.png")
        .addFields({
               name: "Temperature", 
               value: `${temperature}°C`})
        .addFields({
            name: "Humidity", 
            value:`${humidity}%`})
        .addFields({name: "Wind Speed", value: `${windSpeed} m/s`})
        .addFields({name:"Description", value:  `${description}`})
        .setColor("#2F3136");

        interaction.reply({ embeds: [embed] })
    });
  }
};
