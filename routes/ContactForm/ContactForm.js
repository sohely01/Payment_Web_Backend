import express, { Router } from "express";
import { postApiValidation } from "../../middleware/index.js";
import { ContactformController } from "../../Controller/index.js";

const CFRoute = Router();

// 🔒 Allow only POST for each route


CFRoute.route("/addmessage").all(postApiValidation).post(ContactformController.addMessage)





export default CFRoute;
