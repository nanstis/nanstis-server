import {DataSource} from 'typeorm'
import {environment} from './Configuration'
import {Segment} from '../Database/Models/Segment'
import {Transcript} from '../Database/Models/Transcript'
import {Transcript1681829023582} from '../Database/Migrations/1681829023582-Transcript'
import {Segment1681829406371} from '../Database/Migrations/1681829406371-Segment'

export const dataSource: DataSource = new DataSource({
    type: 'postgres',
    schema: 'public',
    host: environment.DB_HOST,
    port: +environment.DB_PORT,
    username: environment.DB_USER,
    password: environment.DB_PASSWORD,
    database: environment.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [
        Segment,
        Transcript,
    ],
    migrations: [
        Transcript1681829023582,
        Segment1681829406371,
    ],
})