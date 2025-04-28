import express, { Router } from 'express'
const route = Router();

import SDRoute from './SectionData/SectionRoutes.js'
import SCRoute from './ScreenData/screenRoutes.js';
import CFRoute from './ContactForm/ContactForm.js';

route.use('/v1', SDRoute, SCRoute, CFRoute)
export default route;