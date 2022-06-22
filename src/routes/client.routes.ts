import { Router } from "express";
import ClientController from "../controllers/clients.controller";
import {
  validadeSchema,
  validateToken,
  verifyAdmin,
  checkIfAdminOrOwner,
} from "../middlewares";
import { clientUpdateSchema, createClientSchema } from "../schemas";

const clientRouter = Router();

clientRouter.post(
  "/client",
  validadeSchema(createClientSchema),
  validateToken,
  verifyAdmin,
  ClientController.createClient
);
clientRouter.patch(
  "/client/:id",
  validadeSchema(clientUpdateSchema),
  validateToken,
  verifyAdmin,
  ClientController.patchClient
);

clientRouter.get(
  "/client/:id",
  validateToken,
  ClientController.getEstablishmentClients
);

export default clientRouter;
