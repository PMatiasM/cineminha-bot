const { SlashCommandBuilder } = require("@discordjs/builders");
const MovieController = require("../controllers/MovieCrontroller");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("raffle")
    .setDescription("Raffle an unwatched movie!"),
  async execute(interaction) {
    MovieController.raffleOne(interaction);
  },
};
