import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";
import hiteshRoute from "./routes/hiteshPersona.route.js"
import rakeshRoute from "./routes/rakeshPersona.route.js"
import piyushRoute from "./routes/piyushPersona.route.js"

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const port = process.env.PORT || 5000;

export const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.use("/api/v1/hitesh", hiteshRoute)
app.use("/api/v1/rakesh", rakeshRoute)
app.use("/api/v1/piyush", piyushRoute)

app.get("/", (req, res) => {
  res.send("server is running")
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
});
