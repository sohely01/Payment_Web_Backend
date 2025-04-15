import express from "express";
import { HomeHeroData } from "../../controllers/controller_index.js";

const route = express.Router();

route.get("/edithome", HomeHeroData.getHomeHeroData);

export default route;
