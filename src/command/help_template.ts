import { codeBlock } from "discord.js";
import { CommandDetails } from "../types";

export const helpTemplate = ({ command, description, usage }: CommandDetails) => {
    const commandList = command ? `Command: ${command.join(", ")}` : "No command provided";
    const commandDesc = description ? `Description: ${description}` : "No description provided";
    const commandUsage = usage ? `Usage: ${usage}` : "No usage provided";
    const commandHelp = [commandList, commandDesc, commandUsage]
    const createMessage = codeBlock("md", commandHelp.join("\n\n"));
    return createMessage
}
