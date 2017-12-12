import Dao from './../interface/Dao';
import User from './../model/User';
import * as Promise from 'bluebird';
import connect from './../Database';

export default class UserDao implements Dao<User> {

    findOne(id: number): Promise<User> {
        return connect().select().from('users').where({ id }).limit(1);
    }
    findAll(): Promise<User[]> {
        return connect().select().from('users');
    }
    update(entity: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    save(entity: User): Promise<number[]> {
        return connect().insert(entity).into('users');
    }
    delete(id: number): boolean {
        throw new Error("Method not implemented.");
    }

}