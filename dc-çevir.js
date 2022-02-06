/**
 *  @description Geliştirilmeye devam eden 'Doğruluk-Cesaretlik' oyun komutu.
 *  @author rootcf
 */


const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
    

const dogruluk = [
    "Yemeğini başkaları ile paylaşır mısın?",
    "Para için arkadaşlarını satar mısın?"
]
const cesaret = [
    "İnternet geçmişindeki son 5 sayfayı söyle.",
    "Kedi gibi miyavla"
]

module.exports = {
    name: "dc-çevir",
    description: "Dc oyunu",
    alias: ["dc-çevir"],
    permLevel: 0,
    run: async (client, message, args) => {
        const u_voiceChannel = message.member.voice.channelId;
        const users = []
        if (!u_voiceChannel) return message.reply("`Öncelikle bir ses kanalına girmen gerek!`");

        message.member.voice.channel.members.each(member => {
            if (member.user.bot == true) return;

            users.push(member.user.username);
      
        })
        if (users.length != 2) return message.reply("`Ses kanalında minimum 2 kişi bulunmalı!`")

        
   
        var player_1 = users[Math.floor(Math.random() * users.length)]
        var player_2 = users[Math.floor(Math.random() * users.length)]
        provide();
        state_1();
        function provide() {
            player_1 = users[Math.floor(Math.random() * users.length)]
            player_2 = users[Math.floor(Math.random() * users.length)]
            if (player_1 == player_2) {
                provide();
            }
            else {
                
            }
       }
        function state_1() {
            const d_row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('dogru')
                        .setLabel('D')
                        .setStyle('SUCCESS'),
                    new MessageButton()
                        .setCustomId('cesaret')
                        .setLabel('C')
                        .setStyle('DANGER')
                );
            const d_filter = i => i.customId === 'dogru'
            const d_collector = message.channel.createMessageComponentCollector({ d_filter, time: 15000 });

            const c_filter = i => i.customId === 'cesaret'
            const c_collector = message.channel.createMessageComponentCollector({ c_filter, time: 15000 });

            message.delete()
            message.channel.send({
                embeds: [new MessageEmbed()
                    .setTitle(`${player_2}, kurbanın ${player_1}!`)
                    .addField(player_1, "(D)Doğruluk mu? (C)Cesaret mi?")
                    .setColor("#4101fd")

                ], components: [d_row]
            })
                
            d_collector.on('collect', async i => {
                if (i.customId === 'dogru' && i.user.username == player_1) {
                    i.message.delete();
                    return state_2_d();
                }
             
            });
            d_collector.on('end', collected => {
                    return          
            })
            c_collector.on('collect', async i => {
                if (i.customId === 'cesaret' && i.user.username == player_1) {
                    i.message.delete();
                    return state_2_c();
                }
             
            });
           c_collector.on('end', collected => {
                    return     
            })
                
        }
        
        

        function state_2_d() {
            message.channel.send({
                embeds: [new MessageEmbed()
                    .setTitle(`Pekala ${player_1},`)
                    .setColor("#4101fd")

                    .setDescription(`[${dogruluk[Math.floor(Math.random() * dogruluk.length)]}](https://github.com/plasebo-bot)`)
                ]
            })
        }
        function state_2_c() {
            message.channel.send({
                embeds: [new MessageEmbed()
                    .setTitle(`Pekala ${player_1},`)
                    .setColor("#4101fd")

                    .setDescription(`[${cesaret[Math.floor(Math.random() * cesaret.length)]}](https://github.com/plasebo-bot)`)
                ]
            })
        }
      
    }
}
