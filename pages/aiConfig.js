import { OpenAI } from "openai";

// const {OpenAI} = require("openai")

const openai = new OpenAI({
  apiKey: "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",
});

export async function main() {

  let data = ""
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "hi" },
    ],
    stream: false,
  })


  return completion.choices[0]
  // for await (const chunk of completion) {
  //   console.log(chunk.choices[0].delta.content);

  //   data = chunk.choices[0].delta.content;
  // }
}


