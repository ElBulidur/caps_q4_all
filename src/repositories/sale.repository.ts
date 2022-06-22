import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Sale } from "../entities/sale.entity";

interface ISaleRepository {
  save: (sale: Sale) => Promise<Sale>;
  findOne: (payload: object) => Promise<Sale | null>;
  findSalesByEstId: (id: string) => Promise<Sale[]>;
  all: () => Promise<Sale[]>;
}

class saleRepo implements ISaleRepository {
  private ormRepo: Repository<Sale>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Sale);
  }

  save = async (sale: Partial<Sale>) => await this.ormRepo.save(sale);

  all = async () => {
    return await this.ormRepo.find({
      relations: ["client", "establishment"],
    });
  };

  findOne = async (payload: object) => {
    return await this.ormRepo.findOneBy({ ...payload });
  };

  findSalesByEstId = async (id: string) => {
    return await this.ormRepo
      .createQueryBuilder("sale")
      .innerJoin("sale.client", "client")
      .innerJoinAndSelect("client.products", "product")
      .execute();
  };

  update = async (id: string, payload: Partial<Sale>) =>
    await this.ormRepo.update(id, { ...payload });
}

export default new saleRepo();
