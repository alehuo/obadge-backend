interface Dao<T> {
  findOne(id: number): PromiseLike<T | undefined>;
  findAll(): PromiseLike<T[]>;
  update(entity: T): PromiseLike<T | undefined>;
  save(entity: T): PromiseLike<number[] | undefined>;
  delete(id: number): PromiseLike<boolean | undefined>;
}

export default Dao;
