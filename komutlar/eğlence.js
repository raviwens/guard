const Discord = require('discord.js');

let botid = ('') //bu yere botun id'sini yapıştırın.
//eğer botunuz dbl(discord bot list) de yoksa Bota Oy Ver (Vote) olmucaktır.

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`${client.user.username} Eğlence Komutları`)
    .addField('/aşkölçer @kullanıcı', 'Bir Başka Kullanıcı İle Aşkınızı Ölçer.')
    .addField('/espri', 'Bot Espri Yapar')
     .addField('/kaccm', ':D?')
    .addField('/emojiyazı <yazı>', 'Yazınızı Emojiyle Yazar')
    .addField('/sigara', 'Dertli Tim :)')
    .addField('/spoiler <yazı>', 'Bota Spoiler Verdirtir :)')
    .addField(`» Linkler`, `[Bot Davet Linki](https://discordapp.com/oauth2/authorize?client_id=594977847613849640&scope=bot&permissions=2146958847) **|** [Destek Sunucusu](https://discord.gg/aRmB6CW) **|** [Bota Oy Ver (BAKIMDA)]() **|** [Web Sitesi]()`)//websiteniz yoksa  **|** [Web Sitesi]() yeri silebilirsiniz
    message.channel.sendEmbed(embed);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: 'eğlence',
  description: '',
  usage: ''
};