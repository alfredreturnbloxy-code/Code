require("dotenv").config();
const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");

const app = express();
app.use(express.json());

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once("ready", () => {
  console.log(`Bot online as ${client.user.tag}`);
});

app.post("/username-found", async (req, res) => {
  const { username } = req.body;

  const channel = await client.channels.fetch("YOUR_CHANNEL_ID");

  await channel.send(`🟢 Available Roblox username found: **${username}**`);

  res.sendStatus(200);
});

client.login(process.env.BOT_TOKEN);

app.listen(3000, () => console.log("API running on port 3000"));

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "kick") {
    const user = interaction.options.getMember("user");

    if (!user) return interaction.reply("User not found");

    await user.kick();
    interaction.reply("User kicked");
  }

  if (interaction.commandName === "ban") {
    const user = interaction.options.getMember("user");

    if (!user) return interaction.reply("User not found");

    await user.ban();
    interaction.reply("User banned");
  }
});

