import express, { Router } from 'express';
import { ScreenController } from '../../Controller/index.js';
import { postApiValidation } from '../../middleware/index.js';
import { sanitizeUserScreen } from '../../middleware/index.js';

const SCRoute = Router();

// ✅ Each route allows only POST, blocks all others
SCRoute.route("/findonescreen",).all(postApiValidation).post(sanitizeUserScreen, ScreenController.findOneScreen)


SCRoute.route("/findallscreen").all(postApiValidation).post(sanitizeUserScreen, ScreenController.findAllScreen)


SCRoute.route("/updatescreen").all(postApiValidation).post(ScreenController.updateScreen)


SCRoute.route("/deletescreen").all(postApiValidation).post(ScreenController.deleteScreen)


SCRoute.route("/hideshowscreen").all(postApiValidation).post(ScreenController.hideShowScreen)

SCRoute.route("/createscreen").all(postApiValidation).post(ScreenController.createScreen)



export default SCRoute;
