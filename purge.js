module.exports = {
    name  : "purge",
    description: "Purge channel",
    alias: ["cls"],
    permLevel : 1,
    run: async (client, message, args) => {
        
        let count = message.content.split(' ');
        if (!count[1]) return;
        if (count[2]) return;
        
        let amount = parseInt(count[1])
        if (!amount) return message.reply("`Please specify the amount of messages you want me to delete`")
        if (amount > 100 || amount < 1) return message.reply("`Please select a number *between* 100 and 1`")
         
        
        message.channel.bulkDelete(amount).catch(err => {
            message.channel.send('`:x: Due to Discord Limitations, I cannot delete messages older than 14 days`')
        })

        let msg = await message.reply("`Deleted "+amount+" messages!`")
        setTimeout(() => {
            msg.delete()
        }, 2000)
        
  
        
    }
    
}