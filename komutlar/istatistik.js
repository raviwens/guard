const Discord = require('discord.js');
const moment = require('moment');
const { version } = require("discord.js");
const os = require('os');
let cpuStat = require("cpu-stat");
const { stripIndents } = require('common-tags');
require('moment-duration-format');

var ayarlar = require('../ayarlar.json');

exports.run = (bot, message, args) => {
    let cpuLol;
    cpuStat.usagePercent(function(err, percent, seconds) {
        if (err) {
            return console.log(err);
        }
        const duration = moment.duration(bot.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
        const embedStats = new Discord.RichEmbed()
            .setAuthor(bot.user.username + " | İstatistikler", bot.user.avatarURL)
            .setColor('RANDOM')
            .addField(":wave:  Bellek Kullanımı", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`)
            .addField(":white_check_mark: Çalışma Süresi ", `${duration}`)
            .addField(":thumbsup: Bot İstatistikleri", stripIndents`
            :white_check_mark: Kullanıcı: ${bot.users.size.toLocaleString()}
            :white_check_mark: Sunucu: ${bot.guilds.size.toLocaleString()}
            :white_check_mark: Kanal: ${bot.channels.size.toLocaleString()}
            :white_check_mark: Ping: ${Math.round(bot.ping)}ms.
            `)
            .addField(":thumbsup:Versiyonlar", stripIndents`
            :white_check_mark: Discord.js: v${version}
            :white_check_mark: Node.js: ${process.version}
            `)
            .addField(":cyclone: CPU", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
            .addField(":cyclone: CPU Kullanımı", `\`${percent.toFixed(2)}%\``)
            .addField(":cyclone: Bit", `\`${os.arch()}\``, true)
            .addField(":cyclone: İşletim Sistemi", `\`\`${os.platform()}\`\``) 
        message.channel.send(embedStats)
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['i'],
    permLevel: `Yetki gerekmiyor. (${0})`
  };
  
  exports.help = {
    name: 'istatistik',
    category: "bot",
    description: 'Botun istatistiklerini gösterir.',
    usage: 'istatistik'
  };