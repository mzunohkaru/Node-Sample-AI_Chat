import { GoogleGenerativeAI } from "@google/generative-ai";

import readline from 'readline';
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


async function main() {
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  reader.question('プロンプトに入力してください: ', async (input) => {
    const prompt = input;

    try {
      const result = await model.generateContentStream(prompt);

      let text = '';
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log(chunkText);
        text += chunkText;
      }
    } catch (error) {
      console.error('エラーが発生しました:', error);
    }

    reader.close();
  });
}

main();
