import { Router } from "express";
import { SectionController } from "../../Controller/index.js";
import { postApiValidation, sanitizeUserInput } from "../../middleware/index.js";
const SDRoute = Router();

// 🔒 Allow only POST for each route


SDRoute.route("/findonesection").all(postApiValidation).post(sanitizeUserInput, SectionController.findOneSection)
SDRoute.route('/findallsection').all(postApiValidation).post(sanitizeUserInput, SectionController.findAllSection)
SDRoute.route('/updatesection').all(postApiValidation).post(sanitizeUserInput, SectionController.updateSection)
SDRoute.route('/deletesection').all(postApiValidation).post(sanitizeUserInput, SectionController.deleteSection)
SDRoute.route('/hideshowsection').all(postApiValidation).post(sanitizeUserInput, SectionController.hideShowSection)
SDRoute.route('/createsection').all(postApiValidation).post(sanitizeUserInput, SectionController.createSection)
SDRoute.route('/addremaining').all(postApiValidation).post(sanitizeUserInput, SectionController.getSectionDetailsByScreenId)
SDRoute.route("/allsectiondata").all(postApiValidation).post(SectionController.getAllSectionData)






export default SDRoute;
