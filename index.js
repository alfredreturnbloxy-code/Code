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

app.post("/send", async (req, res) => {
  const channel = await client.channels.fetch("YOUR_CHANNEL_ID");

  await channel.send(`Username found: ${req.body.username}`);

  res.sendStatus(200);
});

client.login(process.env.BOT_TOKEN);

app.listen(3000, () => console.log("API running"));