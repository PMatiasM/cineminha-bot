const { SlashCommandBuilder } = require("@discordjs/builders");
const MovieController = require("../controllers/MovieCrontroller");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("watched")
    .setDescription("Show the watched movies!"),
  async execute(interaction) {
    await MovieController.readAll(interaction, true);
  },
};
