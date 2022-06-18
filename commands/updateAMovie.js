const { SlashCommandBuilder } = require("@discordjs/builders");
const MovieController = require("../controllers/MovieCrontroller");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("update")
    .setDescription("Update a movie from the list!")
    .addStringOption((option) =>
      option.setName("movie").setDescription("Movie name").setRequired(true)
    )
    .addBooleanOption((option) =>
      option
        .setName("watched")
        .setDescription("Have you watched the movie?")
        .setRequired(true)
    ),
  async execute(interaction) {
    const movie = {
      name: interaction.options.get("movie").value,
      watched: interaction.options.get("watched").value,
    };

    await MovieController.updateOne(interaction, movie);
  },
};
