import Dao from "../interface/Dao";
import Badge from "../model/Badge";

import connect from "./../Database";

/*
 * Badge Data-access object (DAO).
 */
export default class UserDao implements Dao<Badge> {
  findOne(id: number): PromiseLike<Badge> {
    return connect()
      .select()
      .from("badges")
      .where({ id })
      .limit(1);
  }
  findAll(): PromiseLike<Badge[]> {
    return connect()
      .select()
      .from("badges");
  }
  update(entity: Badge): PromiseLike<Badge> {
    return connect().update(entity);
  }
  save(entity: Badge): PromiseLike<number[]> {
    return connect()
      .insert(entity)
      .into("badges")
      .returning("id");
  }
  delete(id: number): PromiseLike<boolean> {
    return connect()
      .delete()
      .from("badges")
      .where({ id });
  }
  findByUserId(userId: number): PromiseLike<Badge[]> {
    return connect()
      .select()
      .from("badges")
      .where({ userId });
  }
  findByInStock(): PromiseLike<Badge[]> {
    return connect()
      .select()
      .from("badges")
      .where("stock", ">", 0);
  }
  findByInStockAndUserId(userId: number): PromiseLike<Badge[]> {
    return connect()
      .select()
      .from("badges")
      .where("stock", ">", 0)
      .andWhere({ userId });
  }
}
