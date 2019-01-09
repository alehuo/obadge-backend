import Dao from "../interface/Dao";
import Badge from "../model/Badge";

import connect from "./../Database";

/*
 * Badge Data-access object (DAO).
 */
export default class UserDao implements Dao<Badge> {
  public findOne(id: number): PromiseLike<Badge> {
    return connect()
      .select()
      .from("badges")
      .where({ id })
      .limit(1);
  }
  public findAll(): PromiseLike<Badge[]> {
    return connect()
      .select()
      .from("badges");
  }
  public update(entity: Badge): PromiseLike<Badge> {
    return connect().update(entity);
  }
  public save(entity: Badge): PromiseLike<number[]> {
    return connect()
      .insert(entity)
      .into("badges")
      .returning("id");
  }
  public delete(id: number): PromiseLike<boolean> {
    return connect()
      .delete()
      .from("badges")
      .where({ id });
  }
  public findByUserId(userId: number): PromiseLike<Badge[]> {
    return connect()
      .select()
      .from("badges")
      .where({ userId });
  }
  public findByInStock(): PromiseLike<Badge[]> {
    return connect()
      .select()
      .from("badges")
      .where("stock", ">", 0);
  }
  public findByInStockAndUserId(userId: number): PromiseLike<Badge[]> {
    return connect()
      .select()
      .from("badges")
      .where("stock", ">", 0)
      .andWhere({ userId });
  }
}
