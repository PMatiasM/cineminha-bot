module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
    client.user.setActivity("/help", { type: "WATCHING" });
    setInterval(
      () => client.user.setActivity("/help", { type: "WATCHING" }),
      7200000
    );
  },
};
