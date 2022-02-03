module.exports = {
    name: "ping",
    description: "ping",
    alias: ["ping"],
    permLevel : 0,
    run: async (client, message, args) => {
        message.reply("`Pong! " + client.ws.ping + "ms`");
    }
}
