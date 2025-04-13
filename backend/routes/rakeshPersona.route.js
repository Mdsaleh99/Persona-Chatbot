import express from "express"
import { rakeshPersonaChat } from "../controllers/rakeshPersona.controller.js"


const router = express.Router()

router.post("/rakesh-chat", rakeshPersonaChat)

export default router