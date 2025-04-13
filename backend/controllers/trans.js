import { YoutubeTranscript } from "youtube-transcript";
import fs from "fs/promises"
import path from "path";
// ---
// error happens because you're using ES modules (since your package.json has "type": "module"), and in ES modules:
// __dirname and __filename are not available by default like in CommonJS.
import { fileURLToPath } from "url"; 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// --------

// const transcript = YoutubeTranscript.fetchTranscript("vUYnRGotTbo")
//   .then(console.log)
//   .catch((err) => console.log(err));

// console.log(transcript);

const filePath = path.join(__dirname, "rakesh_transcript.txt");
async function fetchAndAppend(videoId) {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId, {
      lang: "hi",
    });
    const text = transcript.map((item) => item.text).join(" ") + "\n\n";

    await fs.appendFile(filePath, text);
    // console.log("✅ Transcript fetched and saved!");
  } catch (err) {
    console.error("❌ Error:", err);
  }
}


fetchAndAppend("sXpBCSO7na4");
// const data  = fs.readFile(filePath, 'utf-8').then(console.log).catch((err) => console.log(err))



