import { Router } from "express";
import { UserFormController } from "../../Controller/index.js";
import { postApiValidation, sanitizeUserInput } from "../../middleware/index.js";
const SFRoute = Router();

// 🔒 Allow only POST for each route


SFRoute.route("/register").all(postApiValidation).post(sanitizeUserInput, UserFormController.register)
SFRoute.route("/login").all(postApiValidation).post(sanitizeUserInput, UserFormController.login)







export default SFRoute;
