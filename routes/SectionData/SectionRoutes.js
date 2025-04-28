import express, { Router } from "express";
import { SectionController } from "../../Controller/index.js";
import { postApiValidation } from "../../middleware/index.js";

const SDRoute = Router();

// 🔒 Allow only POST for each route


SDRoute.route("/findonesection").all(postApiValidation).post(SectionController.findOneSection)
SDRoute.route('/findAllsection').all(postApiValidation).post(SectionController.findAllSection)
SDRoute.route('/updatesection').all(postApiValidation).post(SectionController.updateSection)
SDRoute.route('/deletesection').all(postApiValidation).post(SectionController.deleteSection)
SDRoute.route('/hideshowsection').all(postApiValidation).post(SectionController.hideShowSection)
SDRoute.route('/createsection').all(postApiValidation).post(SectionController.createSection)
SDRoute.route('/addremaining').all(postApiValidation).post(SectionController.getSectionDetailsByScreenId)




export default SDRoute;
