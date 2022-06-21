import { Request } from "express";
import { Client } from "../entities/client.entity";
import { Payment } from "../entities/payment.entity";
import { Product } from "../entities/product.entity";
import { Sale } from "../entities/sale.entity";
import { User } from "../entities/user.entity";
import ErrorHTTP from "../errors/ErrorHTTP";
import { userRepo, saleRepo, clientRepo, PaymentRepo } from "../repositories";
import productRepository from "../repositories/product.repository";
import { serializedCreateSaleSchema } from "../schemas/sale/create.schema";

class SaleService {
  createSale = async ({ validated }: Request) => {
    const userFound = (await userRepo.findOne({
      id: validated.userId,
    })) as User | null;

    if (!userFound) {
      throw new ErrorHTTP(404, "User not found");
    }

    const clientFound = (await clientRepo.findOne({
      id: validated.clientId,
    })) as Client | null;

    if (!clientFound) {
      throw new ErrorHTTP(404, "Client not found");
    }
    const payment = (await PaymentRepo.findOne({
      id: validated.paymentId,
    })) as Payment | null;

    const products = validated.products;

    let productsA = [];
    let saleTotal = 0;

    for (let p of products) {
      const productFound = (await productRepository.findOne({
        id: p.id,
      })) as Product | null;

      if (!productFound) {
        throw new ErrorHTTP(404, `Product ${p.id} not found`);
      }

      productsA.push(productFound);
      saleTotal += productFound.salePrice * p.quantity;
    }

    const sale = new Sale();
    sale.saleTotal = Number.parseFloat(saleTotal.toFixed(2));
    sale.client = clientFound;
    sale.isPaid = payment.formOfPagament === "À vista" ? true : false;
    sale.paidDate = new Date().toString();
    sale.payment = payment;
    sale.products = productsA;
    sale.remainToPlay = 0;

    const newSale = await saleRepo.save(sale);

    return await serializedCreateSaleSchema.validate(newSale, {
      stripUnknown: true,
    });
  };

  patchSale = () => {
    return { status: 200, message: "patch sale" };
  };

  getSales = (establishmentId) => {
    return { status: 200, message: "get sales" };
  };
}

export default new SaleService();
