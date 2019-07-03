const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const client = new Discord.Client();
const db = require ('quick.db');
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const Jimp = require('jimp');
const jinp = require('jimp');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);
const snekfetch = require('snekfetch');
let linkEngel = JSON.parse(fs.readFileSync("././jsonlar/linkEngelle.json", "utf8"));
let kufurEngel = JSON.parse(fs.readFileSync("./jsonlar/kufurEngelle.json", "utf8"));

var prefix = ayarlar.prefix;
var yazılar = new Set();

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};


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

client.on("message", msg => {
    const kzgn = client.emojis.get("512302904141545509");
    const embedlul = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setDescription( msg.author + " Reklam Yasak Bunu Bilmiyormusun!")
    
const embedlulz = new Discord.RichEmbed()
    .setTitle("Sunucunda " + msg.author.tag + " reklam yapıyor!")
      .setColor(0x00AE86)
      .setDescription("?uyar <kişi> komutu ile onu uyarabilir ya da ?kick <kişi> veya ao!ban <kişi> komutlarını kullanarak onu sunucudan uzaklaştırabilirsin!")
    .addField("Kullanıcının mesajı:", "**" + msg.content + "**")

if (msg.content.toLowerCase().match(/(discord.gg|http|.gg|.com|.net|.org|invite|İnstagram|Facebook|watch|Youtube|youtube|facebook|instagram)/) && msg.channel.type === "text" && msg.channel.permissionsFor(msg.guild.member(client.user)).has("MANAGE_MESSAGES")) {
    if(msg.member.hasPermission('BAN_MEMBERS')){
    return;
    } else {
    msg.delete(30).then(deletedMsg => {
     deletedMsg.channel.send(embedlul)
     msg.guild.owner.send(embedlulz).catch(e => {
            console.error(e);
          });
        }).catch(e => {
          console.error(e);
        });
      };
      };
    })
;

client.on("message", msg => {
  if (!msg.guild) return;
  if (!kufurEngel[msg.guild.id]) return;
  if (kufurEngel[msg.guild.id].küfürEngel === 'kapali') return;
    if (kufurEngel[msg.guild.id].küfürEngel=== 'acik') {
      const kufur = ["mk", "amk", "aq", "orospu", "oruspu", "oç", "sikerim", "yarrak", "piç", "amq", "sik", "amcık", "çocu", "sex", "seks", "amına", "orospu çocuğu", "sg", "siktir git"];
  if (kufur.some(word => msg.content.toLowerCase().includes(word)) ) {
    if (!msg.member.hasPermission("ADMINISTRATOR")) {
      msg.delete()
       msg.reply("Küfür filtresi, aktif!").then(message => message.delete(3000));
    }
}
    }
});


client.on("guildMemberAdd", async member => {
   const fs = require('fs');
    let gkanal = JSON.parse(fs.readFileSync("./ayarlar/glog.json", "utf8"));
    const gözelkanal = member.guild.channels.get(gkanal[member.guild.id].resim)
    if (!gözelkanal) return;
     let username = member.user.username;
        if (gözelkanal === undefined || gözelkanal === null) return;
        if (gözelkanal.type === "text") {
            const bg = await Jimp.read("https://cdn.discordapp.com/attachments/450693709076365323/473184528148725780/guildAdd.png");
            const userimg = await Jimp.read(member.user.avatarURL);
            var font;
            if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
            else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
            else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            await bg.print(font, 430, 170, member.user.tag);
            await userimg.resize(362, 362);
            await bg.composite(userimg, 43, 26).write("./img/"+ member.id + ".png");
              setTimeout(function () {
                    gözelkanal.send(new Discord.Attachment("./img/" + member.id + ".png"));
              }, 1000);
              setTimeout(function () {
                fs.unlink("./img/" + member.id + ".png");
              }, 10000);
        }
    })

client.on("guildMemberRemove", async member => {
   const fs = require('fs');
    let gkanal = JSON.parse(fs.readFileSync("./ayarlar/glog.json", "utf8"));
    const gözelkanal = member.guild.channels.get(gkanal[member.guild.id].resim)
    if (!gözelkanal) return;
        let username = member.user.username;
        if (gözelkanal === undefined || gözelkanal === null) return;
        if (gözelkanal.type === "text") {            
                        const bg = await Jimp.read("https://cdn.discordapp.com/attachments/450693709076365323/473184546477572107/guildRemove.png");
            const userimg = await Jimp.read(member.user.avatarURL);
            var font;
            if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
            else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
            else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            await bg.print(font, 430, 170, member.user.tag);
            await userimg.resize(362, 362);
            await bg.composite(userimg, 43, 26).write("./img/"+ member.id + ".png");
              setTimeout(function () {
                    gözelkanal.send(new Discord.Attachment("./img/" + member.id + ".png"));
              }, 1000);
              setTimeout(function () {
                fs.unlink("./img/" + member.id + ".png");
              }, 10000);
        }
    })

client.on('message', async message => {
  const ms = require('ms');
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  let u = message.mentions.users.first() || message.author;
  if (command === "sunucu-kur") {
  if (message.guild.channels.find(channel => channel.name === "Bot Kullanımı")) return message.channel.send(" Bot Paneli Zaten Ayarlanmış.")
  message.channel.send(`Bot Bilgi Kanallarının kurulumu başlatılsın mı? başlatılacak ise **evet** yazınız.`)
      if (!message.member.hasPermission('ADMINISTRATOR'))
  return message.channel.send(" Bu Kodu `Yönetici` Yetkisi Olan Kişi Kullanabilir.");
      message.channel.awaitMessages(response => response.content === 'evet', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
    .then((collected) => {
   message.guild.createChannel('|▬▬|ÖNEMLİ KANALLAR|▬▬|', 'category', [{
  id: message.guild.id,
  deny: ['SEND_MESSAGES']
}])



        
 message.guild.createChannel('「📃」kurallar', 'text', [{
  id: message.guild.id,
  deny: ['SEND_MESSAGES']
}])
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|")));
 message.guild.createChannel('「🚪」gelen-giden', 'text', [{
  id: message.guild.id,
  deny: ['SEND_MESSAGES']
}])
.then(channel =>
       channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|")));
       message.guild.createChannel('「✅」sayaç', 'text', [{
        id: message.guild.id,
        deny: ['SEND_MESSAGES']
      }])
.then(channel =>
             channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|")));
             message.guild.createChannel('「💾」log-kanalı', 'text', [{
              id: message.guild.id,
              deny: ['SEND_MESSAGES']
            }])
            .then(channel => channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|")));
            message.guild.createChannel('「📢」duyuru-odası', 'text', [{
              id: message.guild.id,
              deny: ['SEND_MESSAGES']
            }])
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|")));

       }) 
       .then((collected) => {
        message.guild.createChannel('|▬▬|GENEL KANALLAR|▬▬|', 'category', [{
       id: message.guild.id,
     }]);
             
      message.guild.createChannel(`「💡」şikayet-ve-öneri`, 'text')
     .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|")));
     message.guild.createChannel(`「👥」pre-arama-odası`, 'text')
     .then(channel =>
            channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|")));
     message.guild.createChannel(`「📷」görsel-içerik`, 'text')
     .then(channel =>
                  channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|")));
     message.guild.createChannel(`「🤖」bot-komutları`, 'text')
     .then(channel =>
                  channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|")));
     message.guild.createChannel(`「💬」sohbet`, 'text')
     .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|")));

      message.guild.createChannel(`🏆》Kurucu Odası`, "voice")
      .then(channel =>
        channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|SES KANALLARI|▬▬|")))
      .then(c => {
        let role = message.guild.roles.find("name", "@everyone");
        let role2 = message.guild.roles.find("name", "Kurucu");
        
        c.overwritePermissions(role, {
            CONNECT: false,
        });
        c.overwritePermissions(role2, {
            CONNECT: true,
            
        });
    })

    message.guild.createChannel('|▬▬|SES KANALLARI|▬▬|', 'category', [{
      id: message.guild.id,
    }]);

    message.guild.createChannel(`🏆》Yönetici Odası`, "voice")
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|SES KANALLARI|▬▬|")))
    .then(c => {
      let role = message.guild.roles.find("name", "@everyone");
      let role2 = message.guild.roles.find("name", "Kurucu");
      let role3 = message.guild.roles.find("name", "Yönetici");
      c.overwritePermissions(role, {
          CONNECT: false,
      });
      c.overwritePermissions(role2, {
          CONNECT: true,
      });
      c.overwritePermissions(role3, {
          CONNECT: true,
      });
  })

  message.guild.createChannel(`💬》Sohbet Odası`, "voice")
  .then(channel =>
    channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|SES KANALLARI|▬▬|")))
  .then(c => {
    let role = message.guild.roles.find("name", "@everyone");
    c.overwritePermissions(role, {
        CONNECT: true,
    });
})

message.guild.createChannel('|▬▬|OYUN ODALARI|▬▬|', 'category', [{
  id: message.guild.id,
}]);

message.guild.createChannel(`🎮》LOL`, 'voice')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|")))
 message.guild.createChannel(`🎮》ZULA`, 'voice')
 .then(channel =>
  channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|")))
 message.guild.createChannel(`🎮》COUNTER STRİKE`, 'voice')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|")))
 message.guild.createChannel(`🎮》PUBG`, 'voice')
 .then(channel =>
  channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|")))
  message.guild.createChannel(`🎮》FORTNİTE`, 'voice')
  .then(channel =>
   channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|")))
   message.guild.createChannel(`🎮》MİNECRAFT`, 'voice')
   .then(channel =>
    channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|")))
    message.guild.createChannel(`🎮》ROBLOX`, 'voice')
    .then(channel =>
     channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|")))
     message.guild.createChannel(`🎮》WOLFTEAM`, 'voice')
     .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|")))



      message.guild.createRole({
        name: 'Kurucu',
        color: 'RED',
        permissions: [
            "ADMINISTRATOR",
    ]
      })

      
      message.guild.createRole({
        name: 'Yönetici',
        color: 'BLUE',
        permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES",
            "KICK_MEMBERS"
    ]
      })

      message.guild.createRole({
        name: 'Moderatör',
        color: 'GREEN',
        permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES"
    ]
      })

      message.guild.createRole({
        name: 'V.I.P',
        color: '00ffff',
      })

      message.guild.createRole({
        name: 'Üye',
        color: 'WHITE',
      })

      message.guild.createRole({
        name: 'Bot',
        color: 'ORANGE',
      })

       message.channel.send("Gerekli Odalar Kuruldu!")
     
            })   
    
}
});




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


client.on('guildBanAdd', async (guild, member) => {
    const fs = require('fs');
let gc = JSON.parse(fs.readFileSync("./sunucuyaözelayarlar/log.json", "utf8"));
  
  const hgK = member.guild.channels.get(gc[member.guild.id].gkanal)
    if (!hgK) return;
   const embed = new Discord.RichEmbed()
			.setTitle('Üye yasaklandı.')
			.setAuthor(member.user.tag, member.user.avatarURL)
			.setColor('RANDOM')
			.setDescription(`<@!${member.user.id}>, ${member.user.tag}`)
			.setThumbnail(member.user.avatarURL)
			.setFooter(`Botismi Mod-Log Sistemi | ID: ${member.user.id}`)
			.setTimestamp();
			hgK.send({embed});

		
	})
	
	.on('guildBanRemove', async (guild, member) => {
		    const fs = require('fs');
let gc = JSON.parse(fs.readFileSync("./sunucuyaözelayarlar/log.json", "utf8"));
  
  const hgK = member.guild.channels.get(gc[member.guild.id].gkanal)
    if (!hgK) return;
			var embed = new Discord.RichEmbed()
			.setTitle('Üyenin yasaklaması kaldırıldı.')
			.setAuthor(member.user.tag, member.user.avatarURL)
			.setColor('RANDOM')
			.setDescription(`<@!${member.user.id}>, ${member.user.tag}`)
			.setThumbnail(member.user.avatarURL)
			.setFooter(`Botismi Mod-Log Sistemi | ID: ${member.user.id}`)
			.setTimestamp();
			hgK.send({embed});
		
	})


	.on('messageDelete', async msg => {
		if (!msg.guild) return;
    const fs = require('fs');
let gc = JSON.parse(fs.readFileSync("./sunucuyaözelayarlar/log.json", "utf8"));
  
  const hgK = msg.guild.channels.get(gc[msg.guild.id].gkanal)
    if (!hgK) return;
			var embed = new Discord.RichEmbed()
			.setAuthor(msg.author.tag, msg.author.avatarURL)
			.setColor('RANDOM')
			.setDescription(`<@!${msg.author.id}> tarafından <#${msg.channel.id}> kanalına gönderilen "${msg.content}" mesajı silindi.`)
		.setFooter(`Botismi Mod-Log Sistemi | ID: ${msg.id}`)
			hgK.send({embed});
		
	})

	.on('channelCreate', async channel => {
		if (!channel.guild) return;
    const fs = require('fs');
let gc = JSON.parse(fs.readFileSync("./sunucuyaözelayarlar/log.json", "utf8"));
  
  const hgK = channel.guild.channels.get(gc[channel.guild.id].gkanal)
    if (!hgK) return;		
			if (channel.type === "text") {
				var embed = new Discord.RichEmbed()
				.setColor('RANDOM')
				.setAuthor(channel.guild.name, channel.guild.iconURL)
				.setDescription(`<#${channel.id}> kanalı oluşturuldu. _(metin kanalı)_`)
				.setFooter(`Botismi Mod-Log Sistemi | ID: ${channel.id}`)
				hgK.send({embed});
			};
			if (channel.type === "voice") {
				var embed = new Discord.RichEmbed()
					.setColor('RANDOM')
				.setAuthor(channel.guild.name, channel.guild.iconURL)
				.setDescription(`${channel.name} kanalı oluşturuldu. _(sesli kanal)_`)
			.setFooter(`Botismi Mod-Log Sistemi | ID: ${channel.id}`)
				hgK.send({embed});
			}
		
	})
		
	.on('channelDelete', async channel => {
		    const fs = require('fs');
let gc = JSON.parse(fs.readFileSync("./sunucuyaözelayarlar/log.json", "utf8"));
  
  const hgK = channel.guild.channels.get(gc[channel.guild.id].gkanal)
    if (!hgK) return;
			if (channel.type === "text") {
				let embed = new Discord.RichEmbed()
					.setColor('RANDOM')
				.setAuthor(channel.guild.name, channel.guild.iconURL)
				.setDescription(`${channel.name} kanalı silindi. _(metin kanalı)_`)
				.setFooter(`Botismi Mod-Log Sistemi | ID: ${channel.id}`)
				hgK.send({embed});
			};
			if (channel.type === "voice") {
				let embed = new Discord.RichEmbed()
				.setColor('RANDOM')
				.setAuthor(channel.guild.name, channel.guild.iconURL)
				.setDescription(`${channel.name} kanalı silindi. _(sesli kanal)_`)
			.setFooter(`Botismi Mod-Log Sistemi | ID: ${channel.id}`)
				hgK.send({embed});
			}
		
	})

.on('roleDelete', async role => {
  const fs = require('fs');
let gc = JSON.parse(fs.readFileSync("./sunucuyaözelayarlar/log.json", "utf8"));
  
  const hgK = role.guild.channels.get(gc[role.guild.id].gkanal)
    if (!hgK) return;
  let embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Rol Silindi!`)
        .setThumbnail(role.guild.iconURL)
        .setDescription(`'${role.name}' adlı rol silindi.`, true)
  .setFooter(`Botismi Mod-Log Sistemi | ID: ${role.id}`)
    hgK.send({embed})
})

.on('emojiCreate', async emoji => {
  const fs = require('fs');
let gc = JSON.parse(fs.readFileSync("./sunucuyaözelayarlar/log.json", "utf8"));
  
  const hgK = emoji.guild.channels.get(gc[emoji.guild.id].gkanal)
    if (!hgK) return;
  let embedds9 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Emoji Oluşturuldu!`)
        .setThumbnail(emoji.guild.iconURL)
        .setDescription(`<:${emoji.name}:${emoji.id}> - ${emoji.name} adlı emoji oluşturuldu!`, true)
  .setFooter(`Botismi Mod-Log Sistemi | ID: ${emoji.id}`)
    hgK.send({embedds9})
})

.on('emojiDelete', async emoji => {
  const fs = require('fs');
let gc = JSON.parse(fs.readFileSync("./sunucuyaözelayarlar/log.json", "utf8"));
  
  const hgK = emoji.guild.channels.get(gc[emoji.guild.id].gkanal)
    if (!hgK) return;
  let embedds0 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Emoji Silindi!`)
        .setThumbnail(emoji.guild.iconURL)
        .setDescription(`':${emoji.name}:' adlı emoji silindi!`, true)
  	.setFooter(`Botismi Mod-Log Sistemi | ID: ${emoji.id}`)
   hgK.send(embedds0)
})

.on('roleCreate', async role => {
  const fs = require('fs');
let gc = JSON.parse(fs.readFileSync("./sunucuyaözelayarlar/log.json", "utf8"));
  
  const hgK = role.guild.channels.get(gc[role.guild.id].gkanal)
    if (!hgK) return;
  let embedds0 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Rol Oluşturuldu!`)
        .setThumbnail(role.guild.iconURL)
        .setDescription(`'${role.name}' adlı rol oluşturuldu.`, true)
  .setFooter(`Botismi Mod-Log Sistemi | ID: ${role.id}`)
   hgK.send(embedds0)
})

.on('messageUpdate', async (oldMessage, newMessage) => {
   const fs = require('fs');
let gc = JSON.parse(fs.readFileSync("./sunucuyaözelayarlar/log.json", "utf8"));
   const hgK = oldMessage.guild.channels.get(gc[oldMessage.guild.id].gkanal)
    if (!hgK) return;
      if (oldMessage.author.bot) {
        return false;
    }

    if (!oldMessage.guild) {
        return false;
    }

    if (oldMessage.content == newMessage.content) {
        return false;
    }

    if (!oldMessage || !oldMessage.id || !oldMessage.content || !oldMessage.guild) return;
  let embedds4 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Mesaj Güncellendi!`)
        .setThumbnail(oldMessage.author.avatarURL)
        .addField("Gönderen", oldMessage.author.tag, true)
        .addField("Önceki Mesaj", oldMessage.content, true)
        .addField("Şimdiki Mesaj", newMessage.content, true)
        .addField("Kanal", newMessage.channel.name, true)
  	.setFooter(`Botismi Mod-Log Sistemi | ID: ${oldMessage.id}`)
    hgK.send(embedds4)
})

client.login(ayarlar.token);