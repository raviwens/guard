const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
if (message.channel.type !== 'dm') {
    const ozelmesajkontrol = new Discord.RichEmbed()
    .setColor("RED")
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription('Özelden mesaj gönderdim yenilikleri :warning:');
    message.channel.sendEmbed(ozelmesajkontrol) }
  const pingozel = new Discord.RichEmbed()
    .setTitle("YENİLİKLER")
  .setAuthor("Gnarge | Yenilikler", bot.user.avatarURL)
  .setColor("RANDOM")
  .setDescription("g!düello - İstediğiniz  kişiyle düello yaparsınız\ng!sunucutanıt - Botun destek sunucusunda botunuzu tanıtırsınız\ng!nsfw - NSFW Gönderir :D\ng!reklamtaraması - Yalnızca güncellenmiştir.\ng!talep - Oyuncnular talep açar o sunucuda sadece o oyuncunun görebildiği bir yazı kanalı açılır yetkililer ile  özel sohbet! \n\n**Eklenmesini İstediginiz Komutları g!tavsiye <tavsiyeniz> ile gonderiniz.**")
  .setFooter('Live Security Bot | Beni sunucuna eklemek için /davet | Komut yardım için /yardım', bot.user.avatarURL)
  .setThumbnail(bot.user.avatarURL)
  .setTimestamp()
  .addBlankField(true)
      return message.author.sendEmbed(pingozel)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yetki'],
  permLevel: 0
};

exports.help = {
  name: 'yenilikler',
  description: 'Yeni Eklene Komutları Gösterir',
  usage: '/yenilikler'
};