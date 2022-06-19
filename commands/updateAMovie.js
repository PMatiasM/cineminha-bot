const { SlashCommandBuilder } = require("@discordjs/builders");
const MovieModel = require("../models/MovieModel");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("update")
    .setDescription("Update a movie from the list!")
    .addStringOption((option) =>
      option.setName("movie").setDescription("Movie name").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("new-name")
        .setDescription("New movie name")
        .setRequired(false)
    )
    .addBooleanOption((option) =>
      option
        .setName("watched")
        .setDescription("Have you watched the movie?")
        .setRequired(false)
    ),
  async execute(interaction) {
    const movie = {
      name: interaction.options.get("movie").value,
      newName: interaction.options.get("new-name")
        ? interaction.options.get("new-name").value
        : null,
      watched: interaction.options.get("watched")
        ? interaction.options.get("watched").value
        : null,
    };

    await MovieModel.updateOne(interaction, movie);
  },
};
