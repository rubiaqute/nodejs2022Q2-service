import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1658867054722 implements MigrationInterface {
    name = 'updatePostTable1658867054722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "artists_favourite" ("artist" uuid NOT NULL, "artistId" uuid NOT NULL, CONSTRAINT "PK_48f408e2bcc0e13c94a9896fa47" PRIMARY KEY ("artist", "artistId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5f3d69716933fdabc6545f54a6" ON "artists_favourite" ("artist") `);
        await queryRunner.query(`CREATE INDEX "IDX_0602237344e54d685ada1d2622" ON "artists_favourite" ("artistId") `);
        await queryRunner.query(`CREATE TABLE "albums_favourite" ("album" uuid NOT NULL, "albumId" uuid NOT NULL, CONSTRAINT "PK_9720433a8d0d79825e66a9e58ce" PRIMARY KEY ("album", "albumId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_462a5b20fea60b7223f3edcb8b" ON "albums_favourite" ("album") `);
        await queryRunner.query(`CREATE INDEX "IDX_d844d06df5807a7c0f134d99a8" ON "albums_favourite" ("albumId") `);
        await queryRunner.query(`CREATE TABLE "tracks_favourite" ("track" uuid NOT NULL, "trackId" uuid NOT NULL, CONSTRAINT "PK_41f39940d9322572cb88420c767" PRIMARY KEY ("track", "trackId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e1095a8de62ef0d7ea86cd59b7" ON "tracks_favourite" ("track") `);
        await queryRunner.query(`CREATE INDEX "IDX_3d701551dd0972fee1e4a204a2" ON "tracks_favourite" ("trackId") `);
        await queryRunner.query(`ALTER TABLE "artists_favourite" ADD CONSTRAINT "FK_5f3d69716933fdabc6545f54a6f" FOREIGN KEY ("artist") REFERENCES "favourite"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "artists_favourite" ADD CONSTRAINT "FK_0602237344e54d685ada1d26224" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "albums_favourite" ADD CONSTRAINT "FK_462a5b20fea60b7223f3edcb8b7" FOREIGN KEY ("album") REFERENCES "favourite"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "albums_favourite" ADD CONSTRAINT "FK_d844d06df5807a7c0f134d99a86" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tracks_favourite" ADD CONSTRAINT "FK_e1095a8de62ef0d7ea86cd59b75" FOREIGN KEY ("track") REFERENCES "favourite"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tracks_favourite" ADD CONSTRAINT "FK_3d701551dd0972fee1e4a204a2e" FOREIGN KEY ("trackId") REFERENCES "track"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tracks_favourite" DROP CONSTRAINT "FK_3d701551dd0972fee1e4a204a2e"`);
        await queryRunner.query(`ALTER TABLE "tracks_favourite" DROP CONSTRAINT "FK_e1095a8de62ef0d7ea86cd59b75"`);
        await queryRunner.query(`ALTER TABLE "albums_favourite" DROP CONSTRAINT "FK_d844d06df5807a7c0f134d99a86"`);
        await queryRunner.query(`ALTER TABLE "albums_favourite" DROP CONSTRAINT "FK_462a5b20fea60b7223f3edcb8b7"`);
        await queryRunner.query(`ALTER TABLE "artists_favourite" DROP CONSTRAINT "FK_0602237344e54d685ada1d26224"`);
        await queryRunner.query(`ALTER TABLE "artists_favourite" DROP CONSTRAINT "FK_5f3d69716933fdabc6545f54a6f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3d701551dd0972fee1e4a204a2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e1095a8de62ef0d7ea86cd59b7"`);
        await queryRunner.query(`DROP TABLE "tracks_favourite"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d844d06df5807a7c0f134d99a8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_462a5b20fea60b7223f3edcb8b"`);
        await queryRunner.query(`DROP TABLE "albums_favourite"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0602237344e54d685ada1d2622"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5f3d69716933fdabc6545f54a6"`);
        await queryRunner.query(`DROP TABLE "artists_favourite"`);
    }

}
