import Dao from './../interface/Dao';
import User from './../model/User';
import * as Promise from 'bluebird';
import connect from './../Database';

/**
 * User Data-access object (DAO).
 */
export default class UserDao implements Dao<User> {

    findOne(id: number): Promise<User> {
        return connect().select().from('users').where({ id }).limit(1);
    }
    findAll(): Promise<User[]> {
        return connect().select().from('users');
    }
    update(entity: User): Promise<User> {
        return connect().update(entity);
    }
    save(entity: User): Promise<number[]> {
        return connect().insert(entity).into('users').returning('id');
    }
    delete(id: number): Promise<boolean> {
        return connect().delete().from('users').where({ id });
    }
    findByEmailAndPassword(email: string, password: string): Promise<User> {
        return connect().select().from('users').where({
            email, password
        }).limit(1);
    }
}