import express, { Router } from "express";
import { SectionController } from "../../Controller/index.js";

const SDRoute = Router();

// 🔒 Allow only POST for each route
SDRoute.route("/findone")
    .post(SectionController.findOneSection)
    .all((req, res) => {
        res.status(405).json({
            status: "failed",
            message: `${req.method} method not allowed on this route. Only POST is allowed.`
        });
    });

SDRoute.route("/findAllsection")
    .post(SectionController.findAllSection)
    .all((req, res) => {
        res.status(405).json({
            status: "failed",
            message: `${req.method} method not allowed on this route. Only POST is allowed.`
        });
    });

SDRoute.route("/updatesection")
    .post(SectionController.updateSection)
    .all((req, res) => {
        res.status(405).json({
            status: "failed",
            message: `${req.method} method not allowed on this route. Only POST is allowed.`
        });
    });

SDRoute.route("/deletesection")
    .post(SectionController.deleteSection)
    .all((req, res) => {
        res.status(405).json({
            status: "failed",
            message: `${req.method} method not allowed on this route. Only POST is allowed.`
        });
    });

SDRoute.route("/hideshow")
    .post(SectionController.hideShowSection)
    .all((req, res) => {
        res.status(405).json({
            status: "failed",
            message: `${req.method} method not allowed on this route. Only POST is allowed.`
        });
    });

SDRoute.route("/createsection")
    .post(SectionController.createSection)
    .all((req, res) => {
        res.status(405).json({
            status: "failed",
            message: `${req.method} method not allowed on this route. Only POST is allowed.`
        });
    });

export default SDRoute;
