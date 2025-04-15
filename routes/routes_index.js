import express , {Router} from 'express'
import HDR from './HomeData/homeDataRoutes.js'

const route = Router();

route.use('/v1',HDR)





export default route;