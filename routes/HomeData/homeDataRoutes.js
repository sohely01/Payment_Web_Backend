import express, {Router} from 'express'
import { HomeHeroData } from '../../Controller/index.js'


const route = Router();

route.get('/edithome',HomeHeroData.getHomeHeroData);


export default route;