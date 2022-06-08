import { Request, Response } from "express";
import SaleService from "../services/sale.service";
import { handleError } from "../errors/appError";

class SaleController {
  createSale = async (req: Request, res: Response) => {
    try {
      const { status, message } = SaleService.createSale();
      return res.status(status).json({ message: message });
    } catch (err) {
      return handleError(err, res);
    }
  };
  patchSale = async (req: Request, res: Response) => {
    try {
      const { status, message } = SaleService.patchSale();
      return res.status(status).json({ message: message });
    } catch (err) {
      return handleError(err, res);
    }
  };
}
export default new SaleController();