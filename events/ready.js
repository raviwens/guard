const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

module.exports = client => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Aktif, Komutlar yüklendi!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} ismi ile giriş yapıldı!`);
  client.user.setStatus("online");
   var oyun = [
     "/yardım", // Sadece Tırnak Yani " İşareti İçinde Yazmakta Olan Mesajları Değiştirin.
    "/sunucu-kur Hazır Sunucu Kurar.!", // Sadece Tırnak Yani " İşareti İçinde Yazmakta Olan Mesajları Değiştirin.
    "Serverinizi Korumaktadır.!", // Sadece Tırnak Yani " İşareti İçinde Yazmakta Olan Mesajları Değiştirin.
    "Sizlere En İyi Hizmeti Vermekte.", // Sadece Tırnak Yani " İşareti İçinde Yazmakta Olan Mesajları Değiştirin.
    "Sizin Geleceğiniz İçin Çalışıyoruz.", // Sadece Tırnak Yani " İşareti İçinde Yazmakta Olan Mesajları Değiştirin.
    ];

    setInterval(function() {

        var random = Math.floor(Math.random()*(oyun.length-0+1)+0);

        client.user.setGame(oyun[random]);
        }, 12500);
}