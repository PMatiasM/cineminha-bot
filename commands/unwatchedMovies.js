const { SlashCommandBuilder } = require("@discordjs/builders");
const MovieModel = require("../models/MovieModel");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unwatched")
    .setDescription("Show the unwatched movies!"),
  async execute(interaction) {
    await MovieModel.readAll(interaction);
  },
};
