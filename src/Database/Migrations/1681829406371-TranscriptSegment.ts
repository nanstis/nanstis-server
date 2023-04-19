import { MigrationInterface, QueryRunner } from "typeorm"

export class TranscriptSegment1681829406371 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE transcript_segment (
                id SERIAL PRIMARY KEY,
                name VARCHAR NOT NULL,
                text VARCHAR NOT NULL
            );`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS transcript_segment;`)
    }

}
