import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1659037441822 implements MigrationInterface {
    name = 'updatePostTable1659037441822'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favourite" DROP COLUMN "name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favourite" ADD "name" text NOT NULL`);
    }

}
