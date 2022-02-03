module.exports = {
    name: "ping",
    description: "ping",
    alias: ["ping"],
    owneronly: 1,
    run: async (client, message, args) => {
        message.reply("`Pong! " + client.ws.ping + "ms`");
    }
}