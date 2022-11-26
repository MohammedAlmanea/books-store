import express, { Request, Response } from 'express'
import { Book, BookStore } from '../models/book'

const store = new BookStore()

const index = async (_req: Request, res: Response) => {
    try {
        const books = await store.index()
      res.json(books)
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const book = await store.show(req.params.id)
        res.json(book)
        
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}
