import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1658304173517 implements MigrationInterface {
    name = 'initial1658304173517'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE COLLATION IF NOT EXISTS case_insensitive (provider = icu, locale = 'und-u-ks-level2', deterministic = false);`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying COLLATE "case_insensitive" NOT NULL, "password" character varying NOT NULL, "phone" character varying, "firstName" character varying, "lastName" character varying, "locale" character varying, "timezone" character varying, "roqIdentifier" character varying NOT NULL, "optedInAt" TIMESTAMP, "active" boolean DEFAULT true, "sync" boolean DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_7ad433b15af1fe9e78e65183c92" UNIQUE ("roqIdentifier"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_login_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ip" character varying NOT NULL, "host" character varying NOT NULL, "timestamp" TIMESTAMP NOT NULL, "userId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cc6cb18451f716b40ed6cd898b1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_login_history" ADD CONSTRAINT "FK_8cd045e34dacf6e82ac34e783b5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_login_history" DROP CONSTRAINT "FK_8cd045e34dacf6e82ac34e783b5"`);
        await queryRunner.query(`DROP TABLE "user_login_history"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP COLLATION IF EXISTS case_insensitive`);
    }

}
