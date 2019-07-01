const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

let botid = ('') //bu yere botun id'sini yapıştırın.
//eğer botunuz dbl(discord bot list) de yoksa Bota Oy Ver (Vote) olmucaktır.

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
        .setAuthor(`${client.user.username} `, client.user.avatarURL)
        .setColor('0x36393E')
        .setTitle(`${client.user.username} - Komutlar`)
        .setDescription(`:white_small_square: | **${ayarlar.prefix}yetkili** Moderasyon Komutları.\n :white_small_square: | **${ayarlar.prefix}kullanıcı** Kullanıcıya Komutları.\n :white_small_square: |  **${ayarlar.prefix}eğlence** Eğlence Komutları.\n :white_small_square: | **${ayarlar.prefix}ekstra** Ekstra Komutları.\n :white_small_square: | **${ayarlar.prefix}preimum**  BAKIMDA ! \n`)
        .setThumbnail(client.user.avatarURL)
        .addField(`» Linkler`, `[Bot Davet Linki](https://discordapp.com/oauth2/authorize?client_id=594977847613849640&scope=bot&permissions=2146958847) **|** [Destek Sunucusu](https://discord.gg/V3jgrXD) **|** [Bota Oy Ver (Bakımda)](https://discordbots.org/bot/${botid}/vote) **|** [Web Sitesi](Bakımda)`)//websiteniz yoksa  **|** [Web Sitesi]() yeri silebilirsiniz
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.avatarURL)
    return message.channel.sendEmbed(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['help'],
  permLevel: 0,
};

exports.help = {
  name: 'yardım',
  description: '',
  usage: ''
};