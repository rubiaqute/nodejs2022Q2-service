import { MigrationInterface, QueryRunner } from 'typeorm';

export class updatePostTable1658532523707 implements MigrationInterface {
  name = 'updatePostTable1658532523707';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "album" DROP CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206"`,
    );
    await queryRunner.query(`ALTER TABLE "album" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "album" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "album" ADD CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "album" DROP COLUMN "artistId"`);
    await queryRunner.query(`ALTER TABLE "album" ADD "artistId" uuid NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "artist" DROP CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed"`,
    );
    await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "artist" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "artist" ADD CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "track" DROP CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e"`,
    );
    await queryRunner.query(`ALTER TABLE "track" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "track" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "track" ADD CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "track" DROP COLUMN "artistId"`);
    await queryRunner.query(`ALTER TABLE "track" ADD "artistId" uuid NOT NULL`);
    await queryRunner.query(`ALTER TABLE "track" DROP COLUMN "albumId"`);
    await queryRunner.query(`ALTER TABLE "track" ADD "albumId" uuid NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "track" DROP COLUMN "albumId"`);
    await queryRunner.query(
      `ALTER TABLE "track" ADD "albumId" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "track" DROP COLUMN "artistId"`);
    await queryRunner.query(
      `ALTER TABLE "track" ADD "artistId" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "track" DROP CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e"`,
    );
    await queryRunner.query(`ALTER TABLE "track" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "track" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "track" ADD CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "artist" DROP CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed"`,
    );
    await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "artist" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "artist" ADD CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "album" DROP COLUMN "artistId"`);
    await queryRunner.query(
      `ALTER TABLE "album" ADD "artistId" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "album" DROP CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206"`,
    );
    await queryRunner.query(`ALTER TABLE "album" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "album" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "album" ADD CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id")`,
    );
  }
}
