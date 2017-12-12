import * as Promise from 'bluebird';

interface Dao<T> {
    findOne(id: number): Promise<T | undefined>;
    findAll(): Promise<T[]>;
    update(entity: T): Promise<T | undefined>;
    save(entity: T): Promise<T | undefined>;
    delete(id: number): boolean;
}

export default Dao;