const asyncMysql = require("../infrastructure/asyncConnection");
const yt = require("youtube-search-without-api-key");

class MovieModel {
  static async create(interaction, newMovie) {
    const query = "INSERT INTO movies SET ?";
    try {
      const oldMovies = await this.readAll(interaction, false, false, true);
      if (oldMovies) {
        for (const oldMovie of oldMovies) {
          if (oldMovie.name === newMovie.name) {
            interaction.reply("This movie already exists in the list!");
            return;
          }
        }
      } else {
        return;
      }

      const db = await asyncMysql();
      await db.query(query, newMovie);
      await db.end();
      const movies = await this.readAll(interaction, false, false, true);

      let list = "";

      for (const movie of movies) {
        list = list.concat(
          "\n- ",
          movie.watched ? `${movie.name} :heavy_check_mark:` : movie.name
        );
      }

      const Embed = {
        color: "#6DE0FF",
        title: ":sparkles:Listinha de filmes:sparkles:",
        thumbnail: {
          url: "https://cdn.discordapp.com/attachments/987236444466729020/987576526205767690/unknown.png",
        },
        description: list,
        timestamp: new Date(),
      };

      await interaction.reply({ embeds: [Embed] });
    } catch (error) {
      console.log(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }

  static async readAll(
    interaction,
    watched = false,
    reply = true,
    all = false
  ) {
    const query = watched
      ? "SELECT * FROM movies WHERE watched = 1"
      : all
      ? "SELECT * FROM movies"
      : "SELECT * FROM movies WHERE watched = 0";
    try {
      const db = await asyncMysql();
      const response = await db.query(query);
      await db.end();
      const movies = response[0];

      if (reply) {
        let list = "";

        for (const movie of movies) {
          list = list.concat(
            "\n- ",
            movie.watched ? `${movie.name} :heavy_check_mark:` : movie.name
          );
        }

        const Embed = {
          color: "#6DE0FF",
          title: watched
            ? ":sparkles:Listinha de filmes assistidos:sparkles:"
            : all
            ? ":sparkles:Listinha de filmes:sparkles:"
            : ":sparkles:Listinha de filmes para assistir:sparkles:",
          thumbnail: {
            url: "https://cdn.discordapp.com/attachments/987236444466729020/987576526205767690/unknown.png",
          },
          description: list,
          timestamp: new Date(),
        };

        await interaction.reply({ embeds: [Embed] });
      } else {
        return movies;
      }
    } catch (error) {
      console.log(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
      if (!reply) {
        return false;
      }
    }
  }

  static async readOne(movie) {
    const query = `SELECT * FROM movies WHERE name = "${movie.name}"`;
    const db = await asyncMysql();
    const response = await db.query(query);
    await db.end();
    return response[0];
  }

  static async updateOne(interaction, movie) {
    try {
      const existenceCheck = await this.readOne(movie);
      if (!existenceCheck.length) {
        interaction.reply(
          `There is no movie named "\`${movie.name}\`" in the list!`
        );
        return;
      }

      const newMovie = {};
      if (movie.newName === null && movie.watched === null) {
        interaction.reply(`No changes were made!`);
        return;
      } else {
        if (movie.newName !== null) {
          newMovie.name = movie.newName;
        }
        if (movie.watched !== null) {
          newMovie.watched = movie.watched;
        }
      }

      const query = `UPDATE movies SET ? WHERE id = ${existenceCheck[0].id}`;
      const db = await asyncMysql();
      await db.query(query, newMovie);
      await db.end();
      this.readAll(interaction, false, true, true);
    } catch (error) {
      console.log(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }

  static async deleteOne(interaction, movie) {
    try {
      const existenceCheck = await this.readOne(movie);
      if (!existenceCheck.length) {
        interaction.reply(
          `There is no movie named "\`${movie.name}\`" in the list!`
        );
        return;
      }

      const query = `DELETE FROM movies WHERE id = ${existenceCheck[0].id}`;
      const db = await asyncMysql();
      await db.query(query, movie);
      await db.end();
      this.readAll(interaction, false, true, true);
    } catch (error) {
      console.log(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }

  static async raffleOne(interaction) {
    const unwatchedMovies = await this.readAll(interaction, false, false);

    const movie = Math.floor(Math.random() * unwatchedMovies.length);

    const links = await yt.search(`${unwatchedMovies[movie].name} trailer`);

    try {
      await interaction.reply(
        `:sparkles: E o filminho da vez é: :sparkles:\n\n  :movie_camera:\u0020\u0020\u0020\u0020\u0020${unwatchedMovies[movie].name}\u0020\u0020\u0020\u0020\u0020:movie_camera:  \n\n ${links[0].url}`
      );
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
}

module.exports = MovieModel;
