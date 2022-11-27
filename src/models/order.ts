import client from '../database';

export type Order = {
  id?: number;
  status: string;
  user_id: number;
};

export class Order_Class {
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders';

      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Can't get orders. ${error}`);
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Can't get order. ${error}`);
    }
  }

  async create(or: Order): Promise<Order> {
    try {
      const sql =
        'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';

      const conn = await client.connect();

      const result = await conn.query(sql, [or.status, or.user_id]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not add new order. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<Order> {
    try {
      const sql = 'DELETE FROM orders WHERE id=($1)';

      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }

  // FOR order_products joint table

  async addProduct(
    quantity: number,
    order_id: string,
    productId: string
  ): Promise<Order> {
    try {
      const sql =
        'INSERT INTO order_products(quantity, order_id, product_id) VALUES ($1,$2,$3) RETURNING *';
      const conn = await client.connect();

      const result = await conn.query(sql, [quantity, order_id, productId]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (error) {
      throw new Error(
        `Can't add product ${productId} to order ${order_id}!: ${error}`
      );
    }
  }
}
