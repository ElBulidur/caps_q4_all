import { Request, Response } from "express";
import EstablishmentService from "../services/establishment.service";
import { handleError } from "../errors/appError";
class EstablishmentController {
  createEstablishment = async (req: Request, res: Response) => {
    try {
      const { status, message } = EstablishmentService.createEstablishment();
      return res.status(status).json({ message: message });
    } catch (err) {
      return handleError(err, res);
    }
  };

  patchEstablishment = async (req: Request, res: Response) => {
    try {
      const { status, message } = EstablishmentService.patchEstablishment();
      return res.status(status).json({ message: message });
    } catch (err) {
      return handleError(err, res);
    }
  };
}
export default new EstablishmentController();
