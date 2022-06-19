const { SlashCommandBuilder } = require("@discordjs/builders");
const MovieModel = require("../models/MovieModel");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("raffle")
    .setDescription("Raffle an unwatched movie!"),
  async execute(interaction) {
    MovieModel.raffleOne(interaction);
  },
};
