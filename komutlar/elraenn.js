const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let replies = ["https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjajryO1JvjAhVPL1AKHUrhBEAQjRx6BAgBEAU&url=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUC51-ljNFrvY5ZmV0C_61XcA&psig=AOvVaw29GV-VpEG-BWqRtwZ8PEen&ust=1562343184416751"];

    let result = Math.floor((Math.random() * replies.length));

    let gifembed = new Discord.RichEmbed()
        .setTitle("Fotoğrafın! <a:heart:553341691822866442>")
        .setColor("RED")
        .setFooter(`Ezhel Fotoğraf!`, message.author.avatarURL)
        .setImage(replies[result]);

    message.channel.send(gifembed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ezhel','ezhel'],
  permLevel: 0
};

exports.help = {
  name: 'ezhel',
  description: 'Rastgele Ezhel fotoğrafları atar.',
  usage: 'ezhel'
}; 