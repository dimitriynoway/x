import { MigrationInterface, QueryRunner } from "typeorm";

export class Test21633601981050 implements MigrationInterface {
	name = 'Test21633601981050'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`username\``);
		await queryRunner.query(`ALTER TABLE \`users\` ADD \`username\` varchar(200) NOT NULL`);
		await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
		await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`email\``);
		await queryRunner.query(`ALTER TABLE \`users\` ADD \`email\` varchar(200) NOT NULL`);
		await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`)`);
		await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`password\``);
		await queryRunner.query(`ALTER TABLE \`users\` ADD \`password\` varchar(200) NOT NULL`);
		await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`role\``);
		await queryRunner.query(`ALTER TABLE \`users\` ADD \`role\` varchar(200) NOT NULL`);
		await queryRunner.query(`ALTER TABLE \`messages\` DROP COLUMN \`createdAt\``);
		await queryRunner.query(`ALTER TABLE \`messages\` ADD \`createdAt\` varchar(200) NOT NULL`);
		await queryRunner.query(`ALTER TABLE \`messages\` DROP COLUMN \`bgColor\``);
		await queryRunner.query(`ALTER TABLE \`messages\` ADD \`bgColor\` varchar(200) NOT NULL`);
		await queryRunner.query(`ALTER TABLE \`messages\` DROP COLUMN \`type\``);
		await queryRunner.query(`ALTER TABLE \`messages\` ADD \`type\` varchar(200) NOT NULL`);
		await queryRunner.query(`ALTER TABLE \`messages\` DROP COLUMN \`username\``);
		await queryRunner.query(`ALTER TABLE \`messages\` ADD \`username\` varchar(200) NOT NULL`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE \`messages\` DROP COLUMN \`username\``);
		await queryRunner.query(`ALTER TABLE \`messages\` ADD \`username\` varchar(255) NOT NULL`);
		await queryRunner.query(`ALTER TABLE \`messages\` DROP COLUMN \`type\``);
		await queryRunner.query(`ALTER TABLE \`messages\` ADD \`type\` varchar(255) NOT NULL`);
		await queryRunner.query(`ALTER TABLE \`messages\` DROP COLUMN \`bgColor\``);
		await queryRunner.query(`ALTER TABLE \`messages\` ADD \`bgColor\` varchar(255) NOT NULL`);
		await queryRunner.query(`ALTER TABLE \`messages\` DROP COLUMN \`createdAt\``);
		await queryRunner.query(`ALTER TABLE \`messages\` ADD \`createdAt\` varchar(255) NOT NULL`);
		await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`role\``);
		await queryRunner.query(`ALTER TABLE \`users\` ADD \`role\` varchar(255) NOT NULL`);
		await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`password\``);
		await queryRunner.query(`ALTER TABLE \`users\` ADD \`password\` varchar(255) NOT NULL`);
		await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\``);
		await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`email\``);
		await queryRunner.query(`ALTER TABLE \`users\` ADD \`email\` varchar(255) NOT NULL`);
		await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\` (\`email\`)`);
		await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`username\``);
		await queryRunner.query(`ALTER TABLE \`users\` ADD \`username\` varchar(255) NOT NULL`);
	}

}
