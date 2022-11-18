import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1659562188637 implements MigrationInterface {
    name = 'updatePostTable1659562188637'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "grammy" boolean, CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "year" integer NOT NULL, "artistId" uuid, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "track" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "artistId" uuid, "albumId" uuid, "duration" integer NOT NULL, CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" text NOT NULL, "password" text NOT NULL, "version" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favourite" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_56f1996fc2983d1895e4a8f3af3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "artists_favourite" ("fav" uuid NOT NULL, "artists" uuid NOT NULL, CONSTRAINT "PK_8c54213633199120355ba3388ba" PRIMARY KEY ("fav", "artists"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f3c07b915c4e839a15dd587d94" ON "artists_favourite" ("fav") `);
        await queryRunner.query(`CREATE INDEX "IDX_b9c8d50867a60232d1920c1708" ON "artists_favourite" ("artists") `);
        await queryRunner.query(`CREATE TABLE "albums_favourite" ("fav" uuid NOT NULL, "albums" uuid NOT NULL, CONSTRAINT "PK_fb58e52d8024c9850123cdf1087" PRIMARY KEY ("fav", "albums"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c80531864cd9a01ee080cc1b07" ON "albums_favourite" ("fav") `);
        await queryRunner.query(`CREATE INDEX "IDX_78c2226903865ce0fb78d2a9e4" ON "albums_favourite" ("albums") `);
        await queryRunner.query(`CREATE TABLE "tracks_favourite" ("fav" uuid NOT NULL, "tracks" uuid NOT NULL, CONSTRAINT "PK_428929518c081a3088e69e6d56f" PRIMARY KEY ("fav", "tracks"))`);
        await queryRunner.query(`CREATE INDEX "IDX_18573b39e43f77e20fee42439a" ON "tracks_favourite" ("fav") `);
        await queryRunner.query(`CREATE INDEX "IDX_011e5e8149d0e586a201a03361" ON "tracks_favourite" ("tracks") `);
        await queryRunner.query(`ALTER TABLE "album" ADD CONSTRAINT "FK_3d06f25148a4a880b429e3bc839" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_b105d945c4c185395daca91606a" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "artists_favourite" ADD CONSTRAINT "FK_f3c07b915c4e839a15dd587d94e" FOREIGN KEY ("fav") REFERENCES "favourite"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "artists_favourite" ADD CONSTRAINT "FK_b9c8d50867a60232d1920c1708b" FOREIGN KEY ("artists") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "albums_favourite" ADD CONSTRAINT "FK_c80531864cd9a01ee080cc1b079" FOREIGN KEY ("fav") REFERENCES "favourite"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "albums_favourite" ADD CONSTRAINT "FK_78c2226903865ce0fb78d2a9e4e" FOREIGN KEY ("albums") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tracks_favourite" ADD CONSTRAINT "FK_18573b39e43f77e20fee42439a1" FOREIGN KEY ("fav") REFERENCES "favourite"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tracks_favourite" ADD CONSTRAINT "FK_011e5e8149d0e586a201a03361d" FOREIGN KEY ("tracks") REFERENCES "track"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tracks_favourite" DROP CONSTRAINT "FK_011e5e8149d0e586a201a03361d"`);
        await queryRunner.query(`ALTER TABLE "tracks_favourite" DROP CONSTRAINT "FK_18573b39e43f77e20fee42439a1"`);
        await queryRunner.query(`ALTER TABLE "albums_favourite" DROP CONSTRAINT "FK_78c2226903865ce0fb78d2a9e4e"`);
        await queryRunner.query(`ALTER TABLE "albums_favourite" DROP CONSTRAINT "FK_c80531864cd9a01ee080cc1b079"`);
        await queryRunner.query(`ALTER TABLE "artists_favourite" DROP CONSTRAINT "FK_b9c8d50867a60232d1920c1708b"`);
        await queryRunner.query(`ALTER TABLE "artists_favourite" DROP CONSTRAINT "FK_f3c07b915c4e839a15dd587d94e"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_b105d945c4c185395daca91606a"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2"`);
        await queryRunner.query(`ALTER TABLE "album" DROP CONSTRAINT "FK_3d06f25148a4a880b429e3bc839"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_011e5e8149d0e586a201a03361"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_18573b39e43f77e20fee42439a"`);
        await queryRunner.query(`DROP TABLE "tracks_favourite"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_78c2226903865ce0fb78d2a9e4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c80531864cd9a01ee080cc1b07"`);
        await queryRunner.query(`DROP TABLE "albums_favourite"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b9c8d50867a60232d1920c1708"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f3c07b915c4e839a15dd587d94"`);
        await queryRunner.query(`DROP TABLE "artists_favourite"`);
        await queryRunner.query(`DROP TABLE "favourite"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "track"`);
        await queryRunner.query(`DROP TABLE "album"`);
        await queryRunner.query(`DROP TABLE "artist"`);
    }

}
