const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const db = require ('quick.db')
const moment = require('moment');
const express = require('express');
const app = express();
const http = require('http');
const eco = require('discord-economy');
const jimp = require('jimp');
require('./util/eventLoader')(client);
var prefix = ayarlar.prefix;

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

const settings = {
  prefix: '.',
  token: '',
  admin:["338316550442450954"]
}

 

client.on('message', async message => {
 
  
  var command = message.content.toLowerCase().slice(settings.prefix.length).split(' ')[0];
 
  
  var args = message.content.split(' ').slice(1);
 
  
  
  if (!message.content.startsWith(settings.prefix) || message.author.bot) return;
 
  if (command === 'cüzdan') {
 
    var output = await eco.FetchBalance(message.author.id)
    message.channel.send(`Hey ${message.author.tag}! Cüzdanında ${output.balance}TL var.`);
  }
 
  if (command === 'günlükpara') {
 
    var output = await eco.Daily(message.author.id)
    //output.updated bize üyenin günlük parasını alıp almadığını söyler
 
    if (output.updated) {
 
      var profile = await eco.AddToBalance(message.author.id, 100)
      message.reply(`İşte Günlük 100TL Artık ${profile.newbalance}TL ya sahipsin!`);
 
    } else {
      message.channel.send(`Üzgünüm, zaten günlük paranı aldın!\n Ama üzülme, ${output.timetowait} sonra tekrar alabilirsin!`)
    }
 
  }

  
  if (command === 'liderliktablosu') {

 
    //Eğer birini etiketlerseniz kullanıcının sıralamda kaçıncı olduğunu gösterir
    if (message.mentions.users.first()) {
 
      var output = await eco.Leaderboard({
        filter: x => x.balance > 50,
        search: message.mentions.users.first().id
      })
      message.channel.send(`${message.mentions.users.first().tag}, liderlik tablosunda ${output} sırada!`);   
 
    } else {
 
      eco.Leaderboard({
        limit: 3, 
        filter: x => x.balance > 50 
      }).then(async users => { 
 
        if (users[0]) var firstplace = await client.fetchUser(users[0].userid) 
        if (users[1]) var secondplace = await client.fetchUser(users[1].userid) 
        if (users[2]) var thirdplace = await client.fetchUser(users[2].userid) 
 
        message.channel.send(`Liderlik Tablosu:
 
1 - ${firstplace && firstplace.tag || 'Kişi Yok'} : ${users[0] && users[0].balance || 'Para yok'}
2 - ${secondplace && secondplace.tag || 'Kişi Yok'} : ${users[1] && users[1].balance || 'Para yok'}
3 - ${thirdplace && thirdplace.tag || 'Kişi Yok'} : ${users[2] && users[2].balance || 'Para yok'}`)
 
      })
 
    }
  }
 
    if (command === 'transfer') {
 
    var user = message.mentions.users.first()
    var amount = args[1]
 
    if (!user) return message.reply('Para göndermek istediğiniz kullanıcıyı etiketleyin!')
    if (!amount) return message.reply('Ödemek istediğiniz tutarı belirtin!')
 
    var output = await eco.FetchBalance(message.author.id)
    if (output.balance < amount) return message.reply('Transfer etmek istediğiniz miktardan daha az para var!')
 
    var transfer = await eco.Transfer(message.author.id, user.id, amount)
    message.reply(`Para transferleri başarıyla yapıldı!\n Gönderen Kişi:${message.author.tag} \n Gönderen Kişinin Yeni Bakiye Durumu ${transfer.FromUser}\n Gonderilen Kişi: ${user.tag} \n Para Gönderilen Kişinin Yeni Bakiye Durumu: ${transfer.ToUser}`);
    }
  
  if (command === 'kumar') {
 
    var roll = args[0] 
    var amount = args[1] 
 
    if (!roll || ![1, 2, 3, 4, 5, 6].includes(parseInt(roll))) return message.reply('Lütfen 1-6 arası bir sayı belirtin! Doğru kullanım: **-zar <1-6> <para miktarı>**')
    if (!amount) return message.reply('Lütfen oynayacağınız miktarı belirtin! Doğru kullanım: **&zar <1-6> <para miktarı>**')
 
    var output = eco.FetchBalance(message.author.id)
    if (output.balance < amount) return message.reply('Belirttiğiniz miktardan daha az paran var. Maalesef Kumar Oynayamazsınız!')
 
    var gamble = await eco.Dice(message.author.id, roll, amount).catch(console.error)

    
    if (gamble.output === "lost") {
    message.reply(`Zar ${gamble.dice} atıldı. Yani kaybettin! Artık cüzdanında ${gamble.newbalance}TL var`)
    } else if (gamble.output === "won"){
    message.reply(`Zar ${gamble.dice} atıldı. Yani kazandın! Artık cüzdanında ${gamble.newbalance}TL var`)
    }
    
   
 
  }
});



client.on("message", msg => {
  
  
  db.fetch(`kufur_${msg.guild.id}`).then(i => {
    if (i == 'acik') {
        const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "amq",];
        if (kufur.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();
                          
                      return msg.reply('Bu Sunucuda Küfür Filtresi Aktiftir. Küfür Etmene İzin Veremem !').then(msg => msg.delete(3000));
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    else if (i == 'kapali') {  
    }
    if (!i) return;
  })
    });

  client.on(`guildMemberAdd`, async member => {
  const e = new Discord.RichEmbed()
    .setColor(`RANDOM`)
    .setImage(`https://media.giphy.com/media/l4JyOCNEfXvVYEqB2/giphy.gif`)
    .addField(`***Sunucumuza Geldiğin İçin Teşekkürler.!***`, `Yasuo Bot İyi Eğlenceler diler`)
    .addField(`Davet Linkleri;`, `[Botu Sunucuna Eklemek için Tıkla](BOT DAVET)\n[Botun Destek Sunucusu](https://discord.gg/9FuVpwT)`)
    .setFooter(`Bu Sunucu 7/24 Alpha tarafından korunuyor.`)
  member.send(e);
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

const activities_list = [
    "h!site Sitemizi Atar.", // Sadece Tırnak Yani " İşareti İçinde Yazmakta Olan Mesajları Değiştirin.
    "h!talep Sistemi Aktif.", // Sadece Tırnak Yani " İşareti İçinde Yazmakta Olan Mesajları Değiştirin.
    "h!tavsiye Sistemi Aktif.", // Sadece Tırnak Yani " İşareti İçinde Yazmakta Olan Mesajları Değiştirin.
    "3.000+ Kullanıcıya Hizmet Vermekte.", // Sadece Tırnak Yani " İşareti İçinde Yazmakta Olan Mesajları Değiştirin.
    "Sizin Geleceğiniz İçin Çalışıyoruz.", // Sadece Tırnak Yani " İşareti İçinde Yazmakta Olan Mesajları Değiştirin.
    ]; 

client.on('ready', () => {
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // Bu Kısımları Ellemeyin
        client.user.setActivity(activities_list[index]); // Bu Kısımları Ellemeyin.
    }, 2000); // Selam 1 Saniye = 1000 MiliSaniye Yapar - Kısacası Böyle Bırakırsan - 3 Saniyede 1 Değişir. 
});



client.on("guildMemberAdd", async member => {
   const fs = require('fs');
    let gkanal = JSON.parse(fs.readFileSync("./ayarlar/glog.json", "utf8"));
    const gözelkanal = member.guild.channels.get(gkanal[member.guild.id].resim)
    if (!gözelkanal) return;
     let username = member.user.username;
        if (gözelkanal === undefined || gözelkanal === null) return;
        if (gözelkanal.type === "text") {
            const bg = await jimp.read("https://cdn.discordapp.com/attachments/450693709076365323/473184528148725780/guildAdd.png");
            const userimg = await jimp.read(member.user.avatarURL);
            var font;
            if (member.user.tag.length < 15) font = await jimp.loadFont(jimp.FONT_SANS_128_WHITE);
            else if (member.user.tag.length > 15) font = await jimp.loadFont(jimp.FONT_SANS_64_WHITE);
            else font = await jimp.loadFont(jimp.FONT_SANS_32_WHITE);
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
                        const bg = await jimp.read("https://cdn.discordapp.com/attachments/450693709076365323/473184546477572107/guildRemove.png");
            const userimg = await jimp.read(member.user.avatarURL);
            var font;
            if (member.user.tag.length < 15) font = await jimp.loadFont(jimp.FONT_SANS_128_WHITE);
            else if (member.user.tag.length > 15) font = await jimp.loadFont(jimp.FONT_SANS_64_WHITE);
            else font = await jimp.loadFont(jimp.FONT_SANS_32_WHITE);
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

client.on('message', async msg => {
  let ozelkomut = await db.fetch(`sunucuKomut_${msg.guild.id}`);
  let ozelkomutYazi;
  if (ozelkomut == null) ozelkomutYazi = 'Burayı silme yoksa hatalı olur'
  else ozelkomutYazi = ''+ ozelkomut +''
  if (msg.content.toLowerCase() === `${ozelkomutYazi}`) {
      let mesaj = await db.fetch(`sunucuMesaj_${msg.guild.id}`);
  let mesajYazi;
  if (mesaj == null) mesajYazi = 'Burayı silme yoksa hatalı olur'
  else mesajYazi = ''+ mesaj +''
    msg.channel.send(mesajYazi)
  }
});

client.on("message", msg => {
  db.fetch(`reklam_${msg.guild.id}`).then(i => {
    if (i == 'acik') {
        const reklam = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", "discord.gg",];
        if (reklam.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();
                    return msg.reply('Bu Sunucuda Reklam Engelleme Filtresi Aktiftir. Reklam Yapmana İzin Veremem !').then(msg => msg.delete(3000));
    

  msg.delete(3000);                              

            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    else if (i == 'kapali') {
      
    }
    if (!i) return;
  })
    });


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

client.on('message', async (msg, member, guild) => {
  let i = await  db.fetch(`saas_${msg.guild.id}`)
      if(i === 'açık') {
        if (msg.content.toLowerCase() === 'sa') {
        msg.reply('Aleyküm Selam Knk Hoşgeldin');      
      } 
      }
    }); 

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});
  


  
client.login(ayarlar.token)