import { codeBlock, italic } from "discord.js";
import { CommandDetails, selectedCommand } from "../../types";

export const randomQuoteCommandDetails: CommandDetails = {
    command: ["random-quote", "rq", "quote"],
    description: "Returns a random quote.",
    usage: "random-quote - Returns a random quote."
}
const randomQuoteCommand = async ({ Message }: selectedCommand) => {
    const url: string = "https://zenquotes.io/api/random";
    try {
        const res = await fetch(url);
        const json = await res.json();
        const quote = json[0];

        const createMessage = codeBlock("md", quote.q + "\n\n" + italic(quote.a) ?? '');

        Message.channel.send(createMessage);
    } catch (err) {
        console.log(err);
        return Message.reply("An error occurred while searching for the quote");
    }
}

export default randomQuoteCommand