import express from "express"
import { piyushPersonaChat } from "../controllers/piyushPersona.controller.js"

const router = express.Router()

router.post("/piyush-chat", piyushPersonaChat)

export default router