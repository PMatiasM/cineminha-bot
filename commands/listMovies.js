const { SlashCommandBuilder } = require("@discordjs/builders");
const MovieModel = require("../models/MovieModel");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("movies")
    .setDescription("Show all movies!"),
  async execute(interaction) {
    await MovieModel.readAll(interaction, false, true, true);
  },
};
