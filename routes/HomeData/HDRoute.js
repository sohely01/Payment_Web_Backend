import express, { Router } from "express";
import { HomeHeroData } from "../../Controller/index.js";

const SCRoutes = Router();

// post api call
HDRoute.post("/edithome", HomeHeroData.getHomeHeroData);
HDRoute.post("/editsection", HomeHeroData.getSectionData);

// get api call
HDRoute.get("/editabout", HomeHeroData.getHomeAboutData);
HDRoute.get("/editpayment", HomeHeroData.getPaymentData);
HDRoute.get("/editimage", HomeHeroData.getImgData);
HDRoute.get("/editcreate", HomeHeroData.getCreateData);


export default HDRoute;
