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

    async show(id: string) :Promise<Book> {
            try {
                const sql = 'SELECT * FROM books WHERE id=($1)';
                const conn = await client.connect();
                const result = await conn.query(sql,[id]);
                conn.release();
                return result.rows[0];
            } catch (error) {
            throw new Error (`Can't get books. ${error}`);   
            }
    }

    
}