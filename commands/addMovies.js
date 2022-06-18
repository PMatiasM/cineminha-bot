const { SlashCommandBuilder } = require("@discordjs/builders");
const MovieController = require("../controllers/MovieCrontroller");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add")
    .setDescription("Add a movie to the list!")
    .addStringOption((option) =>
      option.setName("movie").setDescription("Movie name").setRequired(true)
    )
    .addBooleanOption((option) =>
      option
        .setName("watched")
        .setDescription("Have you watched the movie?")
        .setRequired(false)
    ),
  async execute(interaction) {
    const newMovie = {
      name: interaction.options.get("movie").value,
      watched: interaction.options.get("watched")
        ? interaction.options.get("watched").value
        : false,
    };

    await MovieController.create(interaction, newMovie);

    // https://autocode.com/tools/discord/command-builder/
    // https://developers.themoviedb.org/3/movies/get-movie-videos

    // const links = await yt.search(
    //   `${interaction.options.get("movie").value} trailer`
    // );
  },
};
