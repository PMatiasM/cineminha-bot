const { SlashCommandBuilder } = require("@discordjs/builders");
const MovieModel = require("../models/MovieModel");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("watched")
    .setDescription("Show the watched movies!"),
  async execute(interaction) {
    await MovieModel.readAll(interaction, true);
  },
};
