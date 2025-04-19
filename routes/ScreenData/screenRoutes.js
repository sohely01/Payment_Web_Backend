import express, { Router } from 'express';
import { ScreenController } from '../../Controller/index.js';

const SCRoute = Router();

// ✅ Each route allows only POST, blocks all others
SCRoute.route("/findonescreen")
    .post(ScreenController.findOneScreen)
    .all((req, res) => {
        res.status(405).json({
            status: "failed",
            message: `${req.method} method not allowed on this route. Only POST is allowed.`
        });
    });

SCRoute.route("/findallscreen")
    .post(ScreenController.findAllScreen)
    .all((req, res) => {
        res.status(405).json({
            status: "failed",
            message: `${req.method} method not allowed on this route. Only POST is allowed.`
        });
    });

SCRoute.route("/updatescreen")
    .post(ScreenController.updateScreen)
    .all((req, res) => {
        res.status(405).json({
            status: "failed",
            message: `${req.method} method not allowed on this route. Only POST is allowed.`
        });
    });

SCRoute.route("/deletescreen")
    .post(ScreenController.deleteScreen)
    .all((req, res) => {
        res.status(405).json({
            status: "failed",
            message: `${req.method} method not allowed on this route. Only POST is allowed.`
        });
    });

SCRoute.route("/hideshowscreen")
    .post(ScreenController.hideShowScreen)
    .all((req, res) => {
        res.status(405).json({
            status: "failed",
            message: `${req.method} method not allowed on this route. Only POST is allowed.`
        });
    });

SCRoute.route("/createscreen")
    .post(ScreenController.createScreen)
    .all((req, res) => {
        res.status(405).json({
            status: "failed",
            message: `${req.method} method not allowed on this route. Only POST is allowed.`
        });
    });

export default SCRoute;
