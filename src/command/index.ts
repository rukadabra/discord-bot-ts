import { CommandTypes, selectedCommand } from "../types/index"
import { commandList } from "./cmd_list";
import { helpTemplate } from "./help_template";
export const commandHandler = async ({ Message, args, command, client }: CommandTypes) => {
    console.log("🚀 ~ commandHandler ~ args : ", args, " | command : ", command)
    if (command === "help") return commandHandlerHelper({ Message, client });

    const commandEntry = commandList.find(cmd => cmd.details.command.includes(command));
    if (!commandEntry) return Message.reply(`Command not found, please check ${String(process.env.PREFIX)}help`);
    const commandModule = await import(`./${commandEntry.cmd}/index`);
    commandModule.default({ Message, args, client });
}
const commandHandlerHelper = async ({ Message }: selectedCommand) => {
    const listCommand = commandList.map(command => helpTemplate(command.details))
    return (await Message.reply(listCommand.join("\n")))
} 
