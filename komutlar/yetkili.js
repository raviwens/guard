const Discord = require('discord.js');
const client = new Discord.Client();

let botid = ('') //bu yere botun id'sini yapıştırın.
//eğer botunuz dbl(discord bot list) de yoksa Bota Oy Ver (Vote) olmucaktır.

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`${client.user.username} Yetkili Komutları`) 
    .addField('/çekiliş', 'Çekiliş Yapar.') 
    .addField('/oylama <yazı>', 'Oylama Yapar.')
    .addField('/temizle <sayı>', 'Yazdığınız Sayı Kadar Mesaj Siler')
    .addField('/küfür-engelle <aç>/<kapat>', 'Küfür Engelini Açar/Kapatır.')
    .addField('/link-engelle <aç/kapat>', 'Link Engelini Açar/Kapatır.')
    .addField('/mod-log-ayarla <#kanal>', 'ModLog Kanalını Ayarlar. Ayarlandığında Kapatılamaz.')
    .addField('/giriş-çıkış-ayarla <#kanal>', 'Giriş Çıkışı Ayarlar.')
    .addField('/kilit <sayı>', 'Odayı İstediğiniz süreyle Kilitler. Örn: /kilit 5 seconds')
    .addField(`» Linkler`, `[Bot Davet Linki](https://discordapp.com/oauth2/authorize?client_id=594977847613849640&scope=bot&permissions=2146958847) **|** [Destek Sunucusu](https://discord.gg/aRmB6CW) **|** [Bota Oy Ver (Bakımda)]() `)//websiteniz yoksa  **|** [Web Sitesi]() yeri silebilirsiniz
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