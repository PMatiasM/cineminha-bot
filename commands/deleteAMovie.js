const { SlashCommandBuilder } = require("@discordjs/builders");
const MovieModel = require("../models/MovieModel");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("delete")
    .setDescription("Delete a movie from the list!")
    .addStringOption((option) =>
      option.setName("movie").setDescription("Movie name").setRequired(true)
    ),
  async execute(interaction) {
    const movie = {
      name: interaction.options.get("movie").value,
    };

    await MovieModel.deleteOne(interaction, movie);
  },
};
