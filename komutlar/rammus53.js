const Discord = require("discord.js"); // BU KOMUT RİDENLİVE TARAFINDAN EDİTLENMİŞTİR.

module.exports.run = async (bot, message, args) => {
  


    let replies = ["https://i.postimg.cc/k5jqCV65/12312.jpg","https://i.postimg.cc/LXwSqrVK/12321.jpg,","https://i.postimg.cc/DZYDjLWq/12f.jpg","https://i.postimg.cc/QC9zRC5v/12fds.jpg","https://i.postimg.cc/C532Y0s5/12-hsa.jpg","https://i.postimg.cc/TPfZpRMW/1fdas.jpg","https://i.postimg.cc/cC3SfXDK/21321ds.jpg","https://i.postimg.cc/bYZNzRRf/21fds.jpg","https://i.postimg.cc/XNtNXy2G/21fs.jpg","https://i.postimg.cc/m2ML92qd/21fsa.jpg","https://i.postimg.cc/Hkgp911T/21sfa.jpg","https://i.postimg.cc/rwNqhZqx/21sn.jpg","https://i.postimg.cc/rpyM7Gpb/2312.jpg","https://i.postimg.cc/DZzHPBzv/2qfsa.jpg","https://i.postimg.cc/bJs8wzk9/65723.jpg","https://i.postimg.cc/Vs0mykYY/asd.jpg","https://i.postimg.cc/3JM73QR2/asfassj.jpg","https://i.postimg.cc/kgqmtNW4/asjndas.jpg","https://i.postimg.cc/15pSt7n2/dfg-jghfnd.jpg","https://i.postimg.cc/52gM5Hmm/fdgdh.jpg","https://i.postimg.cc/cJ5yjV2g/fdgndj.jpg","https://i.postimg.cc/W44c52Wc/qewwqh.jpg","https://i.postimg.cc/MTM289Js/qwdsa.jpg","https://i.postimg.cc/SsB0Qcym/qweas.jpg","https://i.postimg.cc/GtGW492G/qweq.jpg","https://i.postimg.cc/L4PKCQT5/qweuhwq.jpg","https://i.postimg.cc/qMdf9cbL/qwewq.jpg","https://i.postimg.cc/sD9FyBbR/saj-hndas.jpg","https://i.postimg.cc/Z5TGqbhv/scashn.jpg","https://i.postimg.cc/cLXVgps9/sdsaa.jpg","https://i.postimg.cc/pdr3Dsr2/vcnsa.jpg","https://i.postimg.cc/mrnJV717/wq2e.jpg","https://i.postimg.cc/Y9mVPjQZ/wqejw.jpg","https://i.postimg.cc/x8vZ07xP/wqjmeq.jpg",];

    let result = Math.floor((Math.random() * replies.length));

    let gifembed = new Discord.RichEmbed()
        .setTitle("Fotoğrafın! <a:heart:553341691822866442>")
        .setColor("RED")
        .setFooter(`wtcN Fotoğraf!`, message.author.avatarURL)
        .setFooter(`RidenLive Tarafından Editlenmiştir.`, message.author.avatarURL)
        .setImage(replies[result]);
  


    message.channel.send(gifembed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['rammus','rammus53','ramus'],
  permLevel: 0
};

exports.help = {
  name: 'rammus53',
  description: 'Rastgele Rammus53 fotoğrafları atar.',
  usage: 'rammus53'
}; 