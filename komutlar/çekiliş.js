const Discord = require('discord.js');
exports.run = function(client, message, args) {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);



    const çekiliş = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle("Çekiliş!", true)
    .addField("Çekilişi Yapan:", `<@${message.author.id}>`, true)
    .addField("Çekilişin Yapıldığı Kanal:", message.channel)
    .addField("Çekilişin Yapıldığı Zaman:", message.createdAt)
    .addField(`Çekilişi Kazanan:`, `<@${message.guild.members.random().id}>`, true)
    .setColor("RANDOM")
    .setDescription('')
    return message.channel.sendEmbed(çekiliş);
    
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["çekilişyap"],
  permLevel: 4
};

exports.help = {
  name: 'çekilişyap',
  description: 'Çekiliş yapar.',
  usage: 'çekilişyap'
};