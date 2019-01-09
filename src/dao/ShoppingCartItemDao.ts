import ShoppingCartItem from "../model/ShoppingCartItem";
import Dao from "../interface/Dao";

export default class ShoppingCartItemDao implements Dao<ShoppingCartItem> {
  findOne(id: number): PromiseLike<ShoppingCartItem> {
    throw new Error("Method not implemented.");
  }
  findAll(): PromiseLike<ShoppingCartItem[]> {
    throw new Error("Method not implemented.");
  }
  update(entity: ShoppingCartItem): PromiseLike<ShoppingCartItem> {
    throw new Error("Method not implemented.");
  }
  save(entity: ShoppingCartItem): PromiseLike<number[]> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): PromiseLike<boolean> {
    throw new Error("Method not implemented.");
  }
  findByUserId(userId: number): PromiseLike<ShoppingCartItem[]> {
    throw new Error("Method not implemented.");
  }
}
