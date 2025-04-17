import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateNullableInMemberBotUsage1735803548881 implements MigrationInterface {
    name = 'UpdateNullableInMemberBotUsage1735803548881'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`member_bot_usage\` DROP FOREIGN KEY \`FK_fabe9bd69313d9c05917ec6bee0\``);
        await queryRunner.query(`ALTER TABLE \`member_bot_usage\` DROP FOREIGN KEY \`FK_35be333d47ea0d83e051a996c5a\``);
        await queryRunner.query(`ALTER TABLE \`member_bot_usage\` DROP FOREIGN KEY \`FK_b93d7b61aba316422f8869b8cb7\``);
        await queryRunner.query(`ALTER TABLE \`member_bot_usage\` CHANGE \`bot_social_id\` \`bot_social_id\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`member_bot_usage\` CHANGE \`bot_web_id\` \`bot_web_id\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`member_bot_usage\` CHANGE \`chatbot_id\` \`chatbot_id\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`member_bot_usage\` ADD CONSTRAINT \`FK_fabe9bd69313d9c05917ec6bee0\` FOREIGN KEY (\`bot_social_id\`) REFERENCES \`bot_social\`(\`bot_social_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`member_bot_usage\` ADD CONSTRAINT \`FK_35be333d47ea0d83e051a996c5a\` FOREIGN KEY (\`bot_web_id\`) REFERENCES \`bot_web\`(\`bot_web_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`member_bot_usage\` ADD CONSTRAINT \`FK_b93d7b61aba316422f8869b8cb7\` FOREIGN KEY (\`chatbot_id\`) REFERENCES \`chatbot\`(\`chatbot_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`member_bot_usage\` DROP FOREIGN KEY \`FK_b93d7b61aba316422f8869b8cb7\``);
        await queryRunner.query(`ALTER TABLE \`member_bot_usage\` DROP FOREIGN KEY \`FK_35be333d47ea0d83e051a996c5a\``);
        await queryRunner.query(`ALTER TABLE \`member_bot_usage\` DROP FOREIGN KEY \`FK_fabe9bd69313d9c05917ec6bee0\``);
        await queryRunner.query(`ALTER TABLE \`member_bot_usage\` CHANGE \`chatbot_id\` \`chatbot_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`member_bot_usage\` CHANGE \`bot_web_id\` \`bot_web_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`member_bot_usage\` CHANGE \`bot_social_id\` \`bot_social_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`member_bot_usage\` ADD CONSTRAINT \`FK_b93d7b61aba316422f8869b8cb7\` FOREIGN KEY (\`chatbot_id\`) REFERENCES \`chatbot\`(\`chatbot_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`member_bot_usage\` ADD CONSTRAINT \`FK_35be333d47ea0d83e051a996c5a\` FOREIGN KEY (\`bot_web_id\`) REFERENCES \`bot_web\`(\`bot_web_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`member_bot_usage\` ADD CONSTRAINT \`FK_fabe9bd69313d9c05917ec6bee0\` FOREIGN KEY (\`bot_social_id\`) REFERENCES \`bot_social\`(\`bot_social_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
