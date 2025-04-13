import express from "express"
import { hiteshPersonaChat } from "../controllers/hiteshPersona.controller.js"

const router = express.Router()

router.post("/hitesh-chat", hiteshPersonaChat)

export default router