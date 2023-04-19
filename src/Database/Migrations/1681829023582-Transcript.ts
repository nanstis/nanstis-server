import { MigrationInterface, QueryRunner } from "typeorm"

export class Transcript1681829023582 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE transcripts (
                id SERIAL PRIMARY KEY,
                path VARCHAR NOT NULL,
                transcript_segment_id INTEGER,
                FOREIGN KEY (transcript_segment_id) REFERENCES transcript_segment(id)
            );`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS transcripts;`)
    }

}
