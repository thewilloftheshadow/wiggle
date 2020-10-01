require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.js");
const fs = require("fs");

client.once("ready", () => {
  console.log(
    `${client.user.username} is online in ${client.guilds.cache.size} guilds`
  );
  client.user.setPresence({
    activity: { name: "wiggle", type: "WATCHING" },
    status: "idle",
  });
  client.guilds.cache.forEach((x) =>
    console.log(`  -${x.name} - ${x.id} (${x.members.cache.size} members)`)
  );
});

let wiggle = `wiggle\nwiggle\n wiggle\n  wiggle\n   wiggle\n    wiggle\n     wiggle\n      wiggle\n       wiggle\n        wiggle\n        wiggle\n       wiggle\n      wiggle\n     wiggle\n    wiggle\n   wiggle\n  wiggle\n wiggle\nwiggle \nwiggle\n wiggle\n  wiggle\n   wiggle\n    wiggle\n     wiggle\n      wiggle\n       wiggle\n        wiggle\n        wiggle\n       wiggle\n      wiggle\n     wiggle\n    wiggle\n   wiggle\n  wiggle\n wiggle\nwiggle\n`;

client.on("message", async (message) => {
  //console.log(`${message.author.tag} - ${message.content}`)
  if (message.author.bot) return;
  if (config.blacklist.includes(message.channel.id)) return;
  if (config.blacklist.includes(message.author.id)) return;
  if (config.blacklist.includes(message.guild.id)) return;

  if (message.content.toLowerCase().includes("wiggle"))
    message.channel.send(wiggle);

  if (message.content == ";;ping") {
    let m = await message.channel.send("Pinging...");
    let botLatency = Math.abs(m.createdTimestamp - message.createdTimestamp),
      ping = client.ws.ping,
      memory = (process.memoryUsage().heapUsed / (1024 * 1024)).toFixed(2);

    let embed = new Discord.MessageEmbed()
      .setTitle(`Wiggle Wiggle`)
      .setThumbnail(
        client.user.avatarURL({ format: "png", dynamic: true, size: 1024 })
      )
      .addField("Bot Latency", `${botLatency}ms`, true)
      .addField("Ping", `${Math.round(ping)}ms`, true)
      .setTimestamp();

    m.delete();
    await message.channel.send(embed);
  }
});

client.login(process.env.TOKEN);
