import Dao from "../interface/Dao";
import ShoppingCartItem from "../model/ShoppingCartItem";

export default class ShoppingCartItemDao implements Dao<ShoppingCartItem> {
  public findOne(id: number): PromiseLike<ShoppingCartItem> {
    throw new Error("Method not implemented.");
  }
  public findAll(): PromiseLike<ShoppingCartItem[]> {
    throw new Error("Method not implemented.");
  }
  public update(entity: ShoppingCartItem): PromiseLike<ShoppingCartItem> {
    throw new Error("Method not implemented.");
  }
  public save(entity: ShoppingCartItem): PromiseLike<number[]> {
    throw new Error("Method not implemented.");
  }
  public delete(id: number): PromiseLike<boolean> {
    throw new Error("Method not implemented.");
  }
  public findByUserId(userId: number): PromiseLike<ShoppingCartItem[]> {
    throw new Error("Method not implemented.");
  }
}
