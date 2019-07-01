module.exports = member => {
  let guild = member.guild;
  member.send('Sebebi Neydi ki?');
  guild.defaultChannel.sendMessage(`${member.user.username} gitti.`);
};
