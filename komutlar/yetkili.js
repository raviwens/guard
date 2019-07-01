const Discord = require('discord.js');

let botid = ('') //bu yere botun id'sini yapıştırın.
//eğer botunuz dbl(discord bot list) de yoksa Bota Oy Ver (Vote) olmucaktır.

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`${client.user.username} Yetkili Komutları`)
    .addField('/çekiliş', 'Çekiliş Yapmanı Sağlar') ('/link-engelle <aç/kapat>', 'LinkEngelleme Açıp Kapatmanızı Sağlar.') ('/küfür-engelle <aç/kapat> ', 'Küfür Engelini Açıp Kapatmanızı Sağlar.') ('/temizle <sayı>', 'Sohbeti Temizlemenizi Sağlar.') ('/kilitle <sayı> <zaman>', 'Örneğin /kilitle 5 sec Kanalı Bu Süreliğine Kilitler.') ('/giriş-çıkış-ayarla #kanal', 'Giriş Çıkış Kanalını Ayarlar')//ne kadar yetkili komutunuz varsa o kadar .addField('prefix+komut', 'açıklama/kullanım amacı') koyun
    .addField(`» Linkler`, `[Bot Davet Linki](https://discordapp.com/oauth2/authorize?client_id=${botid}&scope=bot&permissions=8) **|** [Destek Sunucusu](https://discord.gg/BAĞLANTI) **|** [Bota Oy Ver (Vote)](https://discordbots.org/bot/${botid}/vote) **|** [Web Sitesi]()`)//websiteniz yoksa  **|** [Web Sitesi]() yeri silebilirsiniz
    message.channel.sendEmbed(embed);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: 'yetkili',
  description: '',
  usage: ''
};