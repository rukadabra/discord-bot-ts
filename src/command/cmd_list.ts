import { CommandDetails } from "../types";
import { joinVoiceRoomCommandDetails } from "./joinVoiceRoomCommand";
import { pingCommandDetails } from "./pingCommand";
import { gifCommandDetails } from "./randomGifCommand";
import { randomQuoteCommandDetails } from "./randomQuoteCommand";

export const commandList: { cmd: string, details: CommandDetails }[] = [
    { cmd: 'pingCommand', details: pingCommandDetails },
    { cmd: 'randomGifCommand', details: gifCommandDetails },
    { cmd: 'randomQuoteCommand', details: randomQuoteCommandDetails },
    { cmd: "joinVoiceRoomCommand", details: joinVoiceRoomCommandDetails }
]