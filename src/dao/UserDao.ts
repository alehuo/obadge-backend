import connect from "./../Database";
import Dao from "./../interface/Dao";
import User from "./../model/User";

/**
 * User Data-access object (DAO).
 */
export default class UserDao implements Dao<User> {
  public findOne(id: number): PromiseLike<User> {
    return connect()
      .select()
      .from("users")
      .where({ id })
      .limit(1);
  }
  public findAll(): PromiseLike<User[]> {
    return connect()
      .select()
      .from("users");
  }
  public update(entity: User): PromiseLike<User> {
    return connect().update(entity);
  }
  public save(entity: User): PromiseLike<number[]> {
    return connect()
      .insert(entity)
      .into("users")
      .returning("id");
  }
  public delete(id: number): PromiseLike<boolean> {
    return connect()
      .delete()
      .from("users")
      .where({ id });
  }
  public findByEmailAndPassword(email: string, password: string): PromiseLike<User> {
    return connect()
      .select()
      .from("users")
      .where({
        email,
        password,
      })
      .limit(1);
  }
}
