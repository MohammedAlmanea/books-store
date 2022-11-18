import client from "../database";


export type Book = {
    id: number;
    title: string;
    author: string;
    totalPages: number;
    summary: string;
}

export class BookStore {
    async index(): Promise<Book[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM books';

            const result = await conn.query(sql);
            conn.release();
            return result.rows
        } catch (error) {
            throw new Error (`Can't get books. ${error}`);
        }
    }
}