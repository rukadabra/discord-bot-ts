// Require the necessary discord.js classes
import { Client, Events, GatewayIntentBits } from 'discord.js';
import { URL } from 'url';

import dotenv from 'dotenv';
import { commandHandler } from './command';
import { Player } from 'discord-player';
import { commandList } from './command/cmd_list';
dotenv.config();


// Get the custom ffmpeg path from the environment variable
const ffmpegPath = process.env.FFMPEG_PATH;


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ]
});

new Player(client);

client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on("messageCreate", async message => {
    if (message.author.bot) return;
    // Check if the message starts with the command prefix
    if (message.content.startsWith(String(process.env.PREFIX))) {
        // Extract the command and arguments
        if (message.content.startsWith(String(process.env.PREFIX) + ' ')) return message.reply(`Command not found, please check ${String(process.env.PREFIX)}help`);
        const args = message.content.slice(String(process.env.PREFIX).length).trim().split(/ +/);
        const command = args.shift()?.toLowerCase();

        if (!command) return

        commandHandler({
            command,
            args: args.join(' '),
            Message: message,
            client
        })
    }
})
// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);

