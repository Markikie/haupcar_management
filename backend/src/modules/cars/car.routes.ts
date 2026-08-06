import { Router } from 'express';

import { carController } from './car.controller.instance';

import { validateBody } from '../../middlewares/validate.middleware';
import { createCarSchema, updateCarSchema } from './car.schema';

const carRouter = Router();

carRouter.get("/", carController.getAll);

carRouter.get("/:id", carController.getById);

carRouter.post("/",
    validateBody(createCarSchema),
    carController.create);

carRouter.put("/:id", 
    validateBody(updateCarSchema),
    carController.update);

carRouter.delete("/:id", carController.delete);

export { carRouter };