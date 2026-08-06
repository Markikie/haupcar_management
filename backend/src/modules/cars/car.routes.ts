import { Router } from 'express';

import { carController } from './car.controller.instance';

const carRouter = Router();

carRouter.get("/", carController.getAll);

carRouter.get("/:id", carController.getById);

carRouter.post("/", carController.create);

carRouter.put("/:id", carController.update);

carRouter.delete("/:id", carController.delete);

export { carRouter };