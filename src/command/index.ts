import { CommandTypes } from "../types/index"
export const commandHandler = async ({ Message, args, command }: CommandTypes) => {
    switch (command) {
        case 'ping':
            await import('./ping/index').then(module => module.pingCommand({ Message, args }));
            break;
        default:
            Message.reply("Command not found");
            break;
    }
} 