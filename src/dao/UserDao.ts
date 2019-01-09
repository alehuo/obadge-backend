import * as Database from "./../Database";
import Dao from "./../interface/Dao";
import User from "./../model/User";

const knex = Database.connect();
/**
 * User Data-access object (DAO).
 */
export default class UserDao implements Dao<User> {
  public findOne(id: number): PromiseLike<User> {
    return knex
      .select()
      .from("users")
      .where({ id })
      .limit(1);
  }
  public findAll(): PromiseLike<User[]> {
    return knex.select().from("users");
  }
  public update(entity: User): PromiseLike<User> {
    return knex.update(entity);
  }
  public save(entity: User): PromiseLike<number[]> {
    return knex
      .insert(entity)
      .into("users")
      .returning("id");
  }
  public delete(id: number): PromiseLike<boolean> {
    return knex
      .delete()
      .from("users")
      .where({ id });
  }
  public findByEmailAndPassword(
    email: string,
    password: string,
  ): PromiseLike<User> {
    return knex
      .select()
      .from("users")
      .where({
        email,
        password,
      })
      .limit(1);
  }
}
