import multer from 'multer';
import { Router } from 'express';

import uploadConfig from './config/upload';;
import OrphanagesController from './controllers/OrphanagesController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages', OrphanagesController.list);
routes.get('/orphanages/:id', OrphanagesController.find);
routes.post('/orphanages', upload.array('images'), OrphanagesController.create);

export default routes;