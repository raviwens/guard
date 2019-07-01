const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const Jimp = require('jimp');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);
const snekfetch = require('snekfetch');
let linkEngel = JSON.parse(fs.readFileSync("././jsonlar/linkEngelle.json", "utf8"));

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://gamert.glitch.me/`);
}, 280000);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on("message", msg => { 
if (!linkEngel[msg.guild.id]) return;
if (linkEngel[msg.guild.id].linkEngel === "kapali") return;
    if (linkEngel[msg.guild.id].linkEngel === "acik") {
    var regex = new RegExp(/(discord.gg|http|.gg|.com|.net|.org|invite|İnstagram|Facebook|watch|Youtube|youtube|facebook|instagram)/)
    if (regex.test(msg.content)== true) {
    if (!msg.member.hasPermission("ADMINISTRATOR")) {
      msg.delete()
       msg.channel.send(`<@${msg.author.id}>`).then(message => message.delete(5000));
        var e = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor("Link Engeli!")
        .setDescription(`Bu sunucuda linkler **${client.user.username}** tarafından engellenmektedir! Link atmana izin vermeyeceğim!`)
        msg.channel.send(e).then(message => message.delete(5000));
    }
}
    }
});

const { Command } = require('discord.js-commando');
var yazılar = new Set();
yazılar.add("evet");
yazılar.add("hayır");
module.exports = class LogCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'reklam-engelle',
            aliases: ['reklamengelle', 'reklamkapa'],
            group: 'ayarlar',
            memberName: 'reklam-engelle',
            description: 'Sunucunuz için reklam engellemeyi açar/kapatır.',
            examples: ['reklamengelle evet', 'reklam-engelle hayır'],
            guildOnly: true,
            args: [
                {
                    key: 'yazı',
                    label: 'değer',
                    prompt: 'Reklamlar engellensin mi? (**evet** ya da **hayır** yazınız.)',
                    type: 'string',
                    validate: val => {
                        if (!yazılar.has(val)) return "Evet ya da hayır şeklinde cevap veriniz.";
                        return true;
                    }
                }
            ]
        });    
    }

    hasPermission(msg){
        return msg.member.hasPermission('ADMINISTRATOR');
    }

    run(msg, args) {
        var str = args.yazı;
        const prevch = this.client.provider.get(msg.guild, 'reklam-engelle')
        if (str === "evet") {
            msg.reply(`Reklam engelleme artık aktif!`);
            this.client.provider.set(msg.guild, 'reklam-engelle', true);
            if(prevch && prevch === true) return msg.reply(`Reklam engelleme zaten aktif!`);
        }
        if (str === "hayır") {
            this.client.provider.set(msg.guild, 'reklam-engelle', false);
            msg.reply(`Reklam engelleme artık de-aktif!`);
            if(prevch && prevch === false) return msg.reply(`Reklam engelleme zaten de-aktif!`);
        }
    }
};


    client.on('message', async msg => {
  if (msg.content.toLowerCase() === 'sa') {
    await msg.react('🇦');
    msg.react('🇸');
  }
});


    client.on('message', async msg => {
  if (msg.content.toLowerCase() === 'Selamun Aleyküm') {
    await msg.react('🇦');
    msg.react('🇸');
  }
});

var f = [];
function factorial (n) {
  if (n == 0 || n == 1)
    return 1;
  if (f[n] > 0)
    return f[n];
  return f[n] = factorial(n-1) * n;
};
function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}


////////////////////////

client.elevation = message => {
  if(!message.guild) {
    return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'kullanıcıbilgim')
    if (msg.channel.type !== "group") {
        var Durum = msg.author.presence.status;
        var Durm = (Durum == "online" ? (0x00AE86) : (Durum == "offline" ? (0x808080) : (Durum == "idle" ? (0xFFFF00) : (Durum == "dnd" ? (0xFF0000) : (0x00AE86)))))
        var durm = (Durum == "online" ? ("Çevrimiçi") : (Durum == "offline" ? ("Çevrimdışı") : (Durum == "idle" ? ("Boşta") : (Durum == "dnd" ? ("Rahatsız Etmeyin") : ("Bilinmiyor/bulunamadı.")))))
      const kullanicibilgimk = new Discord.RichEmbed()
      .setAuthor(msg.author.username, msg.author.avatarURL)
      .setColor(Durm)
      .setTimestamp()
      .addField('Ad:', msg.author.username + '#' + msg.author.discriminator)
      .addField('ID:', msg.author.id)
      .addField('Kayıt tarihi:', msg.author.createdAt)
      .addField('Durum:', durm)
      .addField('Şu an oynadığı oyun:', msg.author.presence.game ? msg.author.presence.game.name : 'Şu an oyun oynamıyor')
      .addField('BOT mu?', msg.author.bot ? '\n Evet' : 'Hayır')
      console.log("!kullanıcıbilgim komutu " + msg.author.username + " tarafından kullanıldı.")
      return msg.channel.sendEmbed(kullanicibilgimk);
  }
});

client.on('message', msg => {
  if (msg.content === 'Selamun Aleyküm') {
    msg.reply('Aleyküm Selam!');
  }
});

client.on('message', msg => {
  if (msg.content === 'Sea') {
    msg.reply('Aleyküm Selam!');
  }
});

client.on('message', msg => {
  if (msg.content === 'Selam') {
    msg.reply('Aleyküm Selam!');
  }
});

client.on('message', msg => {
  if (msg.content === 'Sa') {
    msg.reply('Aleyküm Selam!');
  }
});


////////////////////////

client.login(ayarlar.token);