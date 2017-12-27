import * as Promise from 'bluebird';
import ShoppingCartItem from '../model/ShoppingCartItem';
import Dao from '../interface/Dao';
import connect from '../Database';

export default class ShoppingCartItemDao implements Dao<ShoppingCartItem> {
    findOne(id: number): Promise<ShoppingCartItem> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<ShoppingCartItem[]> {
        throw new Error("Method not implemented.");
    }
    update(entity: ShoppingCartItem): Promise<ShoppingCartItem> {
        throw new Error("Method not implemented.");
    }
    save(entity: ShoppingCartItem): Promise<number[]> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    findByUserId(userId: number): Promise<ShoppingCartItem[]> {
        throw new Error("Method not implemented.");
    }
}