const { SlashCommandBuilder } = require("@discordjs/builders");
const MovieController = require("../controllers/MovieCrontroller");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unwatched")
    .setDescription("Show the unwatched movies!"),
  async execute(interaction) {
    await MovieController.readAll(interaction);
  },
};
