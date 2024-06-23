import { CommandDetails, selectedCommand } from "../../types";
import { helpTemplate } from "../help_template";
export const gifCommandDetails: CommandDetails = {
    command: ["random-gif", "rg", "gif"],
    description: "Returns a random gif based on the search query provided.",
    usage: "random-gif [search query] - Returns a random gif based on the search query provided. The search query is the text used to search for the gif. Example: !random-gif - Returns a random gif."
}
const randomGifCommand = async ({ Message, args }: selectedCommand) => {
    const searchQuery = {
        q: args ?? '',
        limit: 100,
        offset: 0
    }

    if (args === "help") {
        const createMessage = helpTemplate(gifCommandDetails)
        return (await Message.reply(createMessage))
    }

    const url: string = args ? `http://api.giphy.com/v1/gifs/search?q=${searchQuery.q}&api_key=${process.env.GIPHY_API_KEY}&limit=${searchQuery.limit}&offset=${searchQuery.offset}` : `https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_API_KEY}&tag=&rating=g`;
    try {

        const res = await fetch(url);
        const json = await res.json();

        if (!json.data || json.data.length === 0) {
            return Message.channel.send("No results found for that search query");
        }

        const randomIndex = Math.floor(Math.random() * json.data.length);
        Message.channel.send(json.data[randomIndex].url);
    } catch (err) {
        console.log(err);
        return Message.channel.send("An error occurred while searching for the gif");
    }
}

export default randomGifCommand