import express, { Router } from 'express'
const route = Router();

import SDRoute from './SectionData/SectionRoutes.js'
import SCRoute from './ScreenData/screenRoutes.js';
import CFRoute from './ContactForm/ContactForm.js';
import SFRoute from './FormData/formRoutes.js';

route.use('/v1', SDRoute, SCRoute, CFRoute, SFRoute)
export default route;