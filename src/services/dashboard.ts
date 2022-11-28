import { Connection } from "pg";
import client from "../database";
import { Product } from "../models/product";

export class Dashboard {
    
    
    async ordersUser(): Promise<{first_name:string, last_name:string}[]> {
        try {
            // Get all users who have made an order
            const sql = 'SELECT first_name, last_name FROM users INNER JOIN orders ON users.id = orders.user_id'
            const conn = await client.connect();
            const result = await conn.query(sql)
            conn.release();
            return result.rows
        } catch (error) {
            throw new Error(`Something went wrong: ${error}`);
        }
    }
    
    async fiveExpensive (): Promise<{name:string, price:number}[]> {
        try {
            // Returns the five most expensive Products
            const sql = 'SELECT name, price FROM products ORDER BY price DESC LIMIT 5';
            const conn = await client.connect();
            const result = await conn.query(sql);
            return result;
        } catch (error) {
            throw new Error(`Something went wrong: ${error}`);
        }
    }
}