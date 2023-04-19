import {DataSource} from 'typeorm'
import {environment} from './Configuration'


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
        'src/Database/Models/*.ts',
    ],
    migrations: [
        'src/Database/Migrations/*.ts',
    ],
})