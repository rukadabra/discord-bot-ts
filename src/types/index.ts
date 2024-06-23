import { Client, Message } from "discord.js";


export type CommandTypes = {
    command: string;
    args: string;
    Message: Message
    client: Client
}

export type selectedCommand = {
    args?: string;
    Message: Message
    client: Client
}

export type CommandDetails = {
    command: string[],
    description: string,
    usage: string
}