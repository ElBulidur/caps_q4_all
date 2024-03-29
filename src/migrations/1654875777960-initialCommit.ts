import { hashSync } from "bcrypt";
import { config } from "dotenv";
import { MigrationInterface, QueryRunner } from "typeorm";

config();
export class initialCommit1654875777960 implements MigrationInterface {
  name = "initialCommit1654875777960";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "adresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "street" character varying NOT NULL, "number" integer NOT NULL, "zipCode" character varying NOT NULL, "district" character varying NOT NULL, CONSTRAINT "PK_2787c84f7433e390ff8961d552d" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "salePrice" character varying NOT NULL, "costPrice" character varying NOT NULL, "unitType" character varying NOT NULL, "urlImg" character varying NOT NULL, "establishmentId" uuid, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "contact" character varying NOT NULL, "password" character varying NOT NULL, "avatar" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "isAdmin" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "establishments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "cnpj" character varying NOT NULL, "contact" character varying NOT NULL, "urlLogo" character varying NOT NULL, "userId" uuid, "addressId" uuid, CONSTRAINT "UQ_88bbb5a2aba9ffa0d05384ac144" UNIQUE ("cnpj"), CONSTRAINT "UQ_6a660a2a399ce9971c3dcbb2371" UNIQUE ("contact"), CONSTRAINT "REL_06edbd9c4ab6f29aaa067f0499" UNIQUE ("addressId"), CONSTRAINT "PK_7fb6da6c365114ccb61b091bbdf" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "payments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "formOfPagament" character varying , CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "sales" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "paidDate" character varying, "saleTotal" integer NOT NULL, "remainToPay" integer, "clientId" uuid, "paymentId" uuid, CONSTRAINT "REL_0412bbfa60d1c8fc17cb49c28f" UNIQUE ("paymentId"), CONSTRAINT "PK_4f0bc990ae81dba46da680895ea" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "avatar" character varying NOT NULL, "contact" character varying NOT NULL, "payDay" integer NOT NULL, "isDeptor" boolean NOT NULL, "isLate" boolean NOT NULL, "isActivate" boolean NOT NULL, "establishmentId" uuid, CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "products_categories_categories" ("productsId" uuid NOT NULL, "categoriesId" uuid NOT NULL, CONSTRAINT "PK_8fd95511a998d598ff66d500933" PRIMARY KEY ("productsId", "categoriesId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_40e7da0284a5389344605de8da" ON "products_categories_categories" ("productsId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e1d833224b5be535323207473f" ON "products_categories_categories" ("categoriesId") `
    );
    await queryRunner.query(
      `CREATE TABLE "sales_products_products" ("salesId" uuid NOT NULL, "productsId" uuid NOT NULL, CONSTRAINT "PK_62861f1ae04e176c3606ba6bd94" PRIMARY KEY ("salesId", "productsId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f29355e1d4d0ea504077a30449" ON "sales_products_products" ("salesId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_dc1ade1611cfc9b55ec14c7286" ON "sales_products_products" ("productsId") `
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_4a2d2e7f7959728d1aeae954ec1" FOREIGN KEY ("establishmentId") REFERENCES "establishments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "establishments" ADD CONSTRAINT "FK_e5dea12ff303dbe68a7fc2db425" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "establishments" ADD CONSTRAINT "FK_06edbd9c4ab6f29aaa067f04993" FOREIGN KEY ("addressId") REFERENCES "adresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "sales" ADD CONSTRAINT "FK_c0ae0d7fce67f97394e3a250a33" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "sales" ADD CONSTRAINT "FK_0412bbfa60d1c8fc17cb49c28f5" FOREIGN KEY ("paymentId") REFERENCES "payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "clients" ADD CONSTRAINT "FK_a68dee99cb56e51fa8316c76290" FOREIGN KEY ("establishmentId") REFERENCES "establishments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "products_categories_categories" ADD CONSTRAINT "FK_40e7da0284a5389344605de8dab" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "products_categories_categories" ADD CONSTRAINT "FK_e1d833224b5be535323207473f1" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "sales_products_products" ADD CONSTRAINT "FK_f29355e1d4d0ea504077a30449d" FOREIGN KEY ("salesId") REFERENCES "sales"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "sales_products_products" ADD CONSTRAINT "FK_dc1ade1611cfc9b55ec14c72863" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `
            INSERT INTO "users" ("name", "email", "contact", "password", "avatar", "isAdmin")
            VALUES ('${process.env.ADMIN_NAME}','${
        process.env.ADMIN_EMAIL
      }','035 99999-9999','${hashSync(
        process.env.ADMIN_PASSWORD!,
        10
      )}','https://images.uncyc.org/pt/1/18/Dobby_HarryPotter.jpg',true)
          `
    );
    await queryRunner.query(
      `
            INSERT INTO "categories" ("name", "image")
            VALUES ('Hortifruti','https://lorensonline.com.br/wp-content/uploads/2019/06/Lorens-Crescimento-do-Hortifruti-no-Brasil-legumes-sortidos-2.jpg'),
            ('Produtos de limpeza','https://cglimpeza.com.br/wp-content/uploads/2018/12/2019-01-itens-indispensaveis-no-estoque-de-produtos-para-limpeza-1.jpg'),
            ('Higiene e perfumaria','https://site.abcfarma.org.br/wp-content/uploads/2019/05/loja-de-cosmeticos-virtual-como-montar-1.jpg'),
            ('Congelados','https://boaforma.abril.com.br/wp-content/uploads/sites/2/2018/07/thinkstockphotos-626104514.jpg'),
            ('Carnes','https://www.saboravida.com.br/wp-content/uploads/2019/12/veja-como-preparar-diferentes-cortes-de-carnes-800x445.jpg'),
            ('Latas e conservas','https://www.bonduelle.com.br/images/produtos/latas-conservas.png'),
            ('Farinhas e grãos','https://nutritotal.com.br/publico-geral/wp-content/uploads/sites/2/2019/09/shutterstock_272086718-1.jpg'),
            ('Frios','https://www.sabornamesa.com.br/media/k2/items/cache/01db144526716df630e705de85c35be7_XL.jpg'),
            ('Legumes','https://s2.glbimg.com/wpd84CZmDM9Wzn2sWdLoQdHoB6s=/0x0:750x500/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2020/h/I/6O16OJRB2sUMIDqtxlmQ/alimentos-crus.jpg'),
            ('Bebidas','https://www.galaxcms.com.br/imgs_crud_comum/1801/Bebidas-acucaradas-incluindo--20190711142328.jpg'),
            ('Padaria','https://730370.smushcdn.com/1861587/wp-content/uploads/2021/09/balcao-de-padaria-1024x576.jpg?lossy=1&strip=1&webp=1'),
            ('Açougue','https://blog.atau.com.br/wp-content/uploads/2018/08/Dicas-para-atrair-mais-clientes-para-o-seu-acougue-atau-1900x1069.jpg'),
            ('Energéticos','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRezTO51dI9vlvGVC_l8AYRjNRSc7dVxEN80Q&usqp=CAU'),
            ('Biscoitos e Chocolates','https://www.marolacomcarambola.com.br/wp-content/uploads/2016/10/receita-de-biscoitos-confeitados-com-chocolate-2.jpg')
          `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sales_products_products" DROP CONSTRAINT "FK_dc1ade1611cfc9b55ec14c72863"`
    );
    await queryRunner.query(
      `ALTER TABLE "sales_products_products" DROP CONSTRAINT "FK_f29355e1d4d0ea504077a30449d"`
    );
    await queryRunner.query(
      `ALTER TABLE "products_categories_categories" DROP CONSTRAINT "FK_e1d833224b5be535323207473f1"`
    );
    await queryRunner.query(
      `ALTER TABLE "products_categories_categories" DROP CONSTRAINT "FK_40e7da0284a5389344605de8dab"`
    );
    await queryRunner.query(
      `ALTER TABLE "clients" DROP CONSTRAINT "FK_a68dee99cb56e51fa8316c76290"`
    );
    await queryRunner.query(
      `ALTER TABLE "sales" DROP CONSTRAINT "FK_0412bbfa60d1c8fc17cb49c28f5"`
    );
    await queryRunner.query(
      `ALTER TABLE "sales" DROP CONSTRAINT "FK_c0ae0d7fce67f97394e3a250a33"`
    );
    await queryRunner.query(
      `ALTER TABLE "establishments" DROP CONSTRAINT "FK_06edbd9c4ab6f29aaa067f04993"`
    );
    await queryRunner.query(
      `ALTER TABLE "establishments" DROP CONSTRAINT "FK_e5dea12ff303dbe68a7fc2db425"`
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_4a2d2e7f7959728d1aeae954ec1"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_dc1ade1611cfc9b55ec14c7286"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f29355e1d4d0ea504077a30449"`
    );
    await queryRunner.query(`DROP TABLE "sales_products_products"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e1d833224b5be535323207473f"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_40e7da0284a5389344605de8da"`
    );
    await queryRunner.query(`DROP TABLE "products_categories_categories"`);
    await queryRunner.query(`DROP TABLE "clients"`);
    await queryRunner.query(`DROP TABLE "sales"`);
    await queryRunner.query(`DROP TABLE "payments"`);
    await queryRunner.query(`DROP TABLE "establishments"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "adresses"`);
    await queryRunner.query(`DROP TABLE "categories"`);
  }
}
