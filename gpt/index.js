import OpenAIApi from "openai";
import readline from "readline";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAIApi({
    apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "Hello!" },
            { role: "user", content: "Hello, world!" },
        ],
    });
    console.log(completion.data.choices[0].message.content);
}

main();

