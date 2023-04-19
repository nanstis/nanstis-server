import {MigrationInterface, QueryRunner} from 'typeorm'

export class Segment1681829406371 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE segments (
                id SERIAL PRIMARY KEY,
                absolute_path VARCHAR NOT NULL,
                text VARCHAR NOT NULL,
                transcript_id INTEGER,
                FOREIGN KEY (transcript_id) REFERENCES transcripts(id) ON DELETE CASCADE
            );`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS segments;`)
    }

}
