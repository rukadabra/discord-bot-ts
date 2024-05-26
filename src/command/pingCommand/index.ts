import { codeBlock } from "discord.js";
import { CommandDetails, selectedCommand } from "../../types";
import { helpTemplate } from "../help_template";
export const pingCommandDetails: CommandDetails = {
    command: ["ping", "p", "latency"],
    description: "Returns a response with the ping message, showing the latency of the bot.",
    usage: "ping [message] - Returns a response with the ping message, showing the latency of the bot. The latency is the time it takes for the bot to process the message and send a response. Example: !ping - Returns a response with the ping message, showing the latency of the bot."
}
const pingCommand = async ({ Message, args, client }: selectedCommand) => {
    const date = new Date();

    if (args?.length === 0) return Message.reply(codeBlock('md', `Latency is:  ${date.getTime() - Message.createdAt.getTime()}ms. || API Latency  ${Math.round(client.ws.ping)}ms.`));

    if (args === "help") {
        const createMessage = helpTemplate(pingCommandDetails)
        return (await Message.reply(createMessage))
    }
    return Message.reply(`Pong! ${args}`);
}

export default pingCommand;