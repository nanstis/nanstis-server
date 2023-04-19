import {MigrationInterface, QueryRunner} from 'typeorm'

export class Transcript1681829023582 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE transcripts (
                id SERIAL PRIMARY KEY,
                absolute_path VARCHAR NOT NULL
            );`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS transcripts;`)
    }

}
