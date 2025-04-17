import { MigrationInterface, QueryRunner } from "typeorm";

export class TestMigrate1735034619879 implements MigrationInterface {
    name = 'TestMigrate1735034619879'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`document\` ADD \`test_migrate\` mediumtext NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`document\` DROP COLUMN \`test_migrate\``);
    }

}
