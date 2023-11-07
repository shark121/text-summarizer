// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { OpenAI } from "openai";

export default async function handler(req, res) {
  
  let prompt = req.body

  
  const openai = new OpenAI({
    apiKey: "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",
  });
  
  
    await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
    }).then(resp=>{
      console.log(resp.choices[0])
      res.status(200).json(resp.choices[0].message.content )
    })
  
  
   
  }
  
  
  

 


