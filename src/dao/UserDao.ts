import Dao from "./../interface/Dao";
import User from "./../model/User";
import connect from "./../Database";

/**
 * User Data-access object (DAO).
 */
export default class UserDao implements Dao<User> {
  findOne(id: number): PromiseLike<User> {
    return connect()
      .select()
      .from("users")
      .where({ id })
      .limit(1);
  }
  findAll(): PromiseLike<User[]> {
    return connect()
      .select()
      .from("users");
  }
  update(entity: User): PromiseLike<User> {
    return connect().update(entity);
  }
  save(entity: User): PromiseLike<number[]> {
    return connect()
      .insert(entity)
      .into("users")
      .returning("id");
  }
  delete(id: number): PromiseLike<boolean> {
    return connect()
      .delete()
      .from("users")
      .where({ id });
  }
  findByEmailAndPassword(email: string, password: string): PromiseLike<User> {
    return connect()
      .select()
      .from("users")
      .where({
        email,
        password
      })
      .limit(1);
  }
}
