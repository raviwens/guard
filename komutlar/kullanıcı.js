const Discord = require('discord.js');

let botid = ('') //bu yere botun id'sini yapıştırın.
//eğer botunuz dbl(discord bot list) de yoksa Bota Oy Ver (Vote) olmucaktır.

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`${client.user.username} Kullanıcı Komutları`)
    .addField('/oylama <yazı>', 'Oylama Yapmanızı Sağlar.')
    .addField('/sunucubilgi', 'Sunucu Hakkında Bilgi Almanızı Sağlar.')
    .addField('/talep', 'Kendinize Özel Destek Talebi Açar.')
    .addField('/sunucular', 'Botun Hangi Sunucularda Olduğunu Gösterir')
    .addField('/tavsiye <tavsiyeniz>', 'Botun Kurucusuna Tavsiyelerinizi Gönderir.')
    .addField('/elraenn', 'Rasgele Elraenn Fotoğrafları Atar.')
    .addField(`» Linkler`, `[Bot Davet Linki](https://discordapp.com/oauth2/authorize?client_id=594977847613849640&scope=bot&permissions=2146958847) **|** [Destek Sunucusu](https://discord.gg/aRmB6CW) **|** [Bota Oy Ver (Bakımda)]( `)
    message.channel.sendEmbed(embed);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: 'kullanıcı',
  description: '',
  usage: ''
};