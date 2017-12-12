import Dao from './../interface/Dao';
import User from './../model/User';
import * as Promise from 'bluebird';
import * as Knex from 'knex';

export default class UserDao implements Dao<User> {

    private knex: Knex;

    constructor(knex: Knex) {
        this.knex = knex;
    }

    findOne(id: number): Promise<User> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    update(entity: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    save(entity: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): boolean {
        throw new Error("Method not implemented.");
    }

}