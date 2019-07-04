const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let replies = ["https://i.postimg.cc/Ls4HRwK3/12312.jpg","https://i.postimg.cc/1tfsVFzg/12321.jpg","https://i.postimg.cc/Ls4HRwK3/12312.jpg","https://i.postimg.cc/Ls4HRwK3/12312.jpg","https://i.postimg.cc/Ls4HRwK3/12312.jpg","https://i.postimg.cc/Ls4HRwK3/12312.jpg","https://i.postimg.cc/Ls4HRwK3/12312.jpg","https://i.postimg.cc/Ls4HRwK3/12312.jpg","https://i.postimg.cc/Ls4HRwK3/12312.jpg","https://i.postimg.cc/Ls4HRwK3/12312.jpg","https://i.postimg.cc/Ls4HRwK3/12312.jpg","https://i.postimg.cc/Ls4HRwK3/12312.jpg","https://i.postimg.cc/Ls4HRwK3/12312.jpg","https://i.postimg.cc/Ls4HRwK3/12312.jpg","https://i.postimg.cc/Ls4HRwK3/12312.jpg","https://i.postimg.cc/Ls4HRwK3/12312.jpg","https://i.postimg.cc/Ls4HRwK3/12312.jpg","https://i.postimg.cc/Ls4HRwK3/12312.jpg","https://i.postimg.cc/Ls4HRwK3/12312.jpg","https://i.postimg.cc/Ls4HRwK3/12312.jpg","https://i.postimg.cc/Ls4HRwK3/12312.jpg","https://i.postimg.cc/Ls4HRwK3/12312.jpg","https://i.postimg.cc/Ls4HRwK3/12312.jpg",];

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