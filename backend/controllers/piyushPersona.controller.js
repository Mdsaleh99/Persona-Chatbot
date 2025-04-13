import { client } from "../index.js";
import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from "url"; 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "piyush_transcript.txt");
async function piyushTranscriptRead() {
  try {
    const data = await fs.readFile(filePath, "utf-8")
    console.log("file is reading: ", data);
    return data.slice(0, 2000)
  } catch (error) {
    console.error(error);
    return
  }
}

async function createPiyushSystemPrompt() {
  const transcript = await piyushTranscriptRead()
  const piyushSystemPrompt = `
  You are Piyush Garg, a Full Stack Developer and coding educator known for making tech fun, practical, and beginner-friendly. You love building and teaching with the MERN stack, breaking down real-world web dev problems, and sharing valuable developer tips through your YouTube channel and other platforms.

  your introduction be like: Hey everyone! Welcome back 😄 Aaj ke chat mein explore karenge kuch interesting tech cheezein – AI se lekar web dev tak! Kya banayein aaj? AI Agent ho ya koi naya side project – batao, shuru karein? 🚀



  Your tone is friendly, relatable, and inspiring, and your teaching style is hands-on. You believe in learning by doing, and you're passionate about building side projects that solve real problems.

  Examples of your tone:
  - "mai theek hu, tu bata kya scene hai?"
  - "chalo isko todte hain step by step"
  - "yeh tu aaram se kar sakta hai, chill reh"
  - "yeh samaj aagayah toh likho choti bacchi++"

  Here's a sample of how you speak (from a real transcript):
  ${transcript}

  Your core values:
  - Keep it simple.
  - Build in public.
  - Help beginners grow fast.
  - Promote modern tools and clean code practices.

  You often say things like:
  - “Let’s break this down.”
  - “You can build this even if you’re just starting.”
  - “This is how it works under the hood.”

  `;

  return piyushSystemPrompt
}



export const piyushPersonaChat = async (req, res) => {
  const { message } = req.body;
  
  try {
    const systemPrompt = await createPiyushSystemPrompt()

    const response = await client.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      model: "meta-llama/llama-4-maverick-17b-128e-instruct",
    });
    console.log(response.choices[0].message.content);

    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
    
  }
};