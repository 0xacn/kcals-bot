const discord = require ('discord.js');
const client = new discord.Client();

client.on("ready", () => {
  client.user.setStatus("idle")
  client.user.setActivity("Bedwars")
});


client.login('NzkzMTc2NTQ2NTQyMDkyMjkw.X-odOQ._LgoLLCa7xxMMd-7GT092yaYYn4')