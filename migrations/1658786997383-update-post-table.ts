import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1658786997383 implements MigrationInterface {
    name = 'updatePostTable1658786997383'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "favourite" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, CONSTRAINT "PK_56f1996fc2983d1895e4a8f3af3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favourite_artists_artist" ("favouriteId" uuid NOT NULL, "artistId" uuid NOT NULL, CONSTRAINT "PK_21868ced9b3b3b285b9423bb418" PRIMARY KEY ("favouriteId", "artistId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8de889bfc8afaa9954d9de4e49" ON "favourite_artists_artist" ("favouriteId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3f2f75d2f6503a013fbc50012f" ON "favourite_artists_artist" ("artistId") `);
        await queryRunner.query(`CREATE TABLE "favourite_albums_album" ("favouriteId" uuid NOT NULL, "albumId" uuid NOT NULL, CONSTRAINT "PK_95dd93ea3c968f5c051e03b4732" PRIMARY KEY ("favouriteId", "albumId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ea0ff1b0dec80bd439837537f1" ON "favourite_albums_album" ("favouriteId") `);
        await queryRunner.query(`CREATE INDEX "IDX_956f86be097b660e57fc35e9ab" ON "favourite_albums_album" ("albumId") `);
        await queryRunner.query(`CREATE TABLE "favourite_tracks_track" ("favouriteId" uuid NOT NULL, "trackId" uuid NOT NULL, CONSTRAINT "PK_39a0fdf6d7b0eb61e05b73f8cfa" PRIMARY KEY ("favouriteId", "trackId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0c274c4156ed9586fb2e8e8e96" ON "favourite_tracks_track" ("favouriteId") `);
        await queryRunner.query(`CREATE INDEX "IDX_955d9ade05edb669ebe15e188c" ON "favourite_tracks_track" ("trackId") `);
        await queryRunner.query(`ALTER TABLE "favourite_artists_artist" ADD CONSTRAINT "FK_8de889bfc8afaa9954d9de4e49d" FOREIGN KEY ("favouriteId") REFERENCES "favourite"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favourite_artists_artist" ADD CONSTRAINT "FK_3f2f75d2f6503a013fbc50012f2" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favourite_albums_album" ADD CONSTRAINT "FK_ea0ff1b0dec80bd439837537f19" FOREIGN KEY ("favouriteId") REFERENCES "favourite"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favourite_albums_album" ADD CONSTRAINT "FK_956f86be097b660e57fc35e9abe" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favourite_tracks_track" ADD CONSTRAINT "FK_0c274c4156ed9586fb2e8e8e966" FOREIGN KEY ("favouriteId") REFERENCES "favourite"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favourite_tracks_track" ADD CONSTRAINT "FK_955d9ade05edb669ebe15e188cb" FOREIGN KEY ("trackId") REFERENCES "track"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favourite_tracks_track" DROP CONSTRAINT "FK_955d9ade05edb669ebe15e188cb"`);
        await queryRunner.query(`ALTER TABLE "favourite_tracks_track" DROP CONSTRAINT "FK_0c274c4156ed9586fb2e8e8e966"`);
        await queryRunner.query(`ALTER TABLE "favourite_albums_album" DROP CONSTRAINT "FK_956f86be097b660e57fc35e9abe"`);
        await queryRunner.query(`ALTER TABLE "favourite_albums_album" DROP CONSTRAINT "FK_ea0ff1b0dec80bd439837537f19"`);
        await queryRunner.query(`ALTER TABLE "favourite_artists_artist" DROP CONSTRAINT "FK_3f2f75d2f6503a013fbc50012f2"`);
        await queryRunner.query(`ALTER TABLE "favourite_artists_artist" DROP CONSTRAINT "FK_8de889bfc8afaa9954d9de4e49d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_955d9ade05edb669ebe15e188c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0c274c4156ed9586fb2e8e8e96"`);
        await queryRunner.query(`DROP TABLE "favourite_tracks_track"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_956f86be097b660e57fc35e9ab"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ea0ff1b0dec80bd439837537f1"`);
        await queryRunner.query(`DROP TABLE "favourite_albums_album"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3f2f75d2f6503a013fbc50012f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8de889bfc8afaa9954d9de4e49"`);
        await queryRunner.query(`DROP TABLE "favourite_artists_artist"`);
        await queryRunner.query(`DROP TABLE "favourite"`);
    }

}
