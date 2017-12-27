import Dao from "../interface/Dao";
import Badge from "../model/Badge";
import * as Promise from "bluebird";

import connect from './../Database';

/*
* Badge Data-access object (DAO).
*/
export default class UserDao implements Dao<Badge> {
    findOne(id: number): Promise<Badge> {
        return connect().select().from('badges').where({ id }).limit(1);
    }
    findAll(): Promise<Badge[]> {
        return connect().select().from('badges');
    }
    update(entity: Badge): Promise<Badge> {
        return connect().update(entity);
    }
    save(entity: Badge): Promise<number[]> {
        return connect().insert(entity).into('badges').returning('id');
    }
    delete(id: number): Promise<boolean> {
        return connect().delete().from('badges').where({ id });
    }
    findByUserId(userId: number): Promise<Badge[]> {
        return connect().select().from('badges').where({ userId });
    }
    findByInStock(): Promise<Badge[]> {
        return connect().select().from('badges').where('stock', '>', 0);
    }
    findByInStockAndUserId(userId: number): Promise<Badge[]> {
        return connect().select().from('badges').where('stock', '>', 0).andWhere({ userId });
    }
}