import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";
import hiteshRoute from "./routes/hiteshPersona.route.js"
import rakeshRoute from "./routes/rakeshPersona.route.js"
import piyushRoute from "./routes/piyushPersona.route.js"

dotenv.config();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL); // Allow all origins
  next();
});

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

// const allowedOrigins = [
//   "https://persona-chatbot-frontend.vercel.app",
//   "http://localhost:5173",
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//     methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// app.options("*", cors()); 

// const port = process.env.PORT || 5000;

export const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.use("/api/v1/hitesh", hiteshRoute)
app.use("/api/v1/rakesh", rakeshRoute)
app.use("/api/v1/piyush", piyushRoute)

app.get("/", (req, res) => {
  res.send("server is running")
})

// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`)
// });
export default app;