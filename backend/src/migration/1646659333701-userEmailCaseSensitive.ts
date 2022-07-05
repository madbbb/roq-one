import {MigrationInterface, QueryRunner} from "typeorm";

export class userEmailCaseSensitive1646659333701 implements MigrationInterface {
  name = 'userEmailCaseSensitive1646659333701'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE COLLATION IF NOT EXISTS case_insensitive (provider = icu, locale = 'und-u-ks-level2', deterministic = false);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP COLLATION IF EXISTS case_insensitive`);
  }
}
