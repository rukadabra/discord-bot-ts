import { Message } from "discord.js";


export type CommandTypes = {
    command: string;
    args: string;
    Message: Message
}

export type selectedCommand = {
    args: string;
    Message: Message
}

export type CommandDetails = {
    command: string[],
    description: string,
    usage: string
}