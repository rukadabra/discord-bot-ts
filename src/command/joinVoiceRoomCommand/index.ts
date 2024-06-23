// src/commands/joinVoiceRoomCommand.ts
import { joinVoiceChannel, getVoiceConnection, VoiceConnectionStatus, entersState } from "@discordjs/voice";
import { Player, useMainPlayer } from "discord-player";
import { CommandDetails, selectedCommand } from "../../types";

export const joinVoiceRoomCommandDetails: CommandDetails = {
    command: ["join-voice-room", "jv", "joinvoice"],
    description: "Makes the bot join the voice channel and play a song or a playlist.",
    usage: "join-voice-room [url] - Makes the bot join the voice channel and play a song or a playlist. The url parameter is the url of the song or the playlist that the bot will play. Example: join-voice-room https://www.youtube.com/watch?v=dQw4i9Lv3s0 - Makes the bot join the voice channel and play the song."
}

const joinVoiceRoomCommand = async ({ Message, args }: selectedCommand) => {
    if (!Message.guildId || !Message.guild) return;
    if (!Message.member) return;
    if (!Message.member.voice || !Message.member.voice.channelId) return Message.reply("You are not in a voice channel");
    if (args === "leave" || args === "stop") return leaveVoiceChannel(Message.guildId);
    try {
        const connection = joinVoiceChannel({
            channelId: Message.member.voice.channelId,
            guildId: Message.guildId,
            adapterCreator: Message.guild.voiceAdapterCreator,
        });

        const player = useMainPlayer();
        await player.extractors.loadDefault((ext) => ext !== 'YouTubeExtractor');

        const query = String(args);
        const queue = player.nodes.create(Message.guildId);
        queue.createDispatcher(connection as any);

        const { track } = await queue.play(query, {
            nodeOptions: {
                metadata: queue.metadata
            }
        });

        Message.reply(`Now playing: ${track.title} - ${track.url}`);

        connection.on(VoiceConnectionStatus.Disconnected, async () => {
            try {
                await Promise.race([
                    entersState(connection, VoiceConnectionStatus.Signalling, 5_000),
                    entersState(connection, VoiceConnectionStatus.Connecting, 5_000),
                ]);
            } catch (error) {
                connection.destroy();
            }
        });

    } catch (err) {
        console.log(err);
        return Message.reply("An error occurred while joining the voice channel");
    }
}

export default joinVoiceRoomCommand;

const leaveVoiceChannel = async (GID: string) => {
    const connection = getVoiceConnection(GID);
    connection?.destroy();
    return;
}
