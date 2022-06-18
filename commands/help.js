const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("A little help with the Cineminha :popcorn:!"),
  async execute(interaction) {
    const Embed = {
      color: "#6DE0FF",
      title: "Help",
      description: "A little help with the Cineminha :popcorn:!",
      fields: [
        {
          name: "\u200b",
          value: "\u200b",
        },
        {
          name: `\`/add\``,
          value: "Add a movie to the list!",
        },
        {
          name: `\`/movies\``,
          value: "Show all movies!",
        },
        {
          name: `\`/watched\``,
          value: "Show the watched movies!",
        },
        {
          name: `\`/unwatched\``,
          value: "Show the unwatched movies!",
        },
        {
          name: `\`/raffle\``,
          value: "Raffle an unwatched movie!",
        },
        {
          name: `\`/update\``,
          value: "Update a movie from the list!",
        },
        {
          name: `\`/delete\``,
          value: "Delete a movie from the list!",
        },
      ],
      timestamp: new Date(),
    };

    try {
      await interaction.reply({ embeds: [Embed] });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  },
};
