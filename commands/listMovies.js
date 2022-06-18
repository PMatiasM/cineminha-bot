const { SlashCommandBuilder } = require("@discordjs/builders");
const MovieController = require("../controllers/MovieCrontroller");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("movies")
    .setDescription("Show all movies!"),
  async execute(interaction) {
    await MovieController.readAll(interaction, false, true, true);
  },
};
