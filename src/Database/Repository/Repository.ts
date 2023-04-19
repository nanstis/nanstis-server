import {EntityTarget, Repository as OrmRepository} from 'typeorm'
import {dataSource} from '../../Core/Database'

abstract class Repository<T> {
    protected readonly repository: OrmRepository<T>

    protected constructor(entity: EntityTarget<T>) {
        this.repository = dataSource.getRepository(entity)
    }
}

export {Repository}