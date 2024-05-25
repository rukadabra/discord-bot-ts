import { CommandDetails, selectedCommand } from "../../types";
import { helpTemplate } from "../help_template";


const pingCommandDetails: CommandDetails = {
    command: ["ping", "p", "latency"],
    description: "Returns a response with the ping message, showing the latency of the bot.",
    usage: "ping [message] - Returns a response with the ping message, showing the latency of the bot. The latency is the time it takes for the bot to process the message and send a response. Example: !ping - Returns a response with the ping message, showing the latency of the bot."
}

export const pingCommand = async ({ Message, args }: selectedCommand) => {

    if (args.length === 0) return;

    if (args === "help") {
        const createMessage = helpTemplate(pingCommandDetails)
        return (await Message.reply(createMessage))
    }

    Message.reply(`Pong! ${args}`);
} 
