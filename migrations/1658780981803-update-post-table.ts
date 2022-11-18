import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1658780981803 implements MigrationInterface {
    name = 'updatePostTable1658780981803'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "album" DROP CONSTRAINT "FK_3d06f25148a4a880b429e3bc839"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_b105d945c4c185395daca91606a"`);
        await queryRunner.query(`ALTER TABLE "album" DROP CONSTRAINT "REL_3d06f25148a4a880b429e3bc83"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "REL_997cfd9e91fd00a363500f72dc"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "REL_b105d945c4c185395daca91606"`);
        await queryRunner.query(`ALTER TABLE "album" ADD CONSTRAINT "FK_3d06f25148a4a880b429e3bc839" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_b105d945c4c185395daca91606a" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_b105d945c4c185395daca91606a"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2"`);
        await queryRunner.query(`ALTER TABLE "album" DROP CONSTRAINT "FK_3d06f25148a4a880b429e3bc839"`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "REL_b105d945c4c185395daca91606" UNIQUE ("albumId")`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "REL_997cfd9e91fd00a363500f72dc" UNIQUE ("artistId")`);
        await queryRunner.query(`ALTER TABLE "album" ADD CONSTRAINT "REL_3d06f25148a4a880b429e3bc83" UNIQUE ("artistId")`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_b105d945c4c185395daca91606a" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "album" ADD CONSTRAINT "FK_3d06f25148a4a880b429e3bc839" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
