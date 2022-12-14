import express, { Request, Response } from 'express';
import { Book, BookStore } from '../models/book';
import jwt from 'jsonwebtoken';

const store = new BookStore();

const index = async (_req: Request, res: Response) => {
  try {
    const books = await store.index();
    res.json(books);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const book = await store.show(req.params.id);
    res.json(book);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (_req: Request, res: Response) => {
  try {
    const book: Book = {
      title: _req.body.title,
      author: _req.body.author,
      total_pages: _req.body.total_pages,
      summary: _req.body.summary,
    };

    const newBook = await store.create(book);
    res.json(newBook);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.params.id);
  res.json(deleted);
};

const verifyAuthToken = (req: Request, res: Response,next) => {
  try {
  const authorizationHeader = req.headers.authorization;
  const token = authorizationHeader?.split(' ')[1];
  const decoded = jwt.verify(token as string, process.env.TOKEN as string);

  next()
  } catch (error) {
    res.status(401);
  }
}

const bookRoutes = (app: express.Application) => {
  app.get('/books', index);
  app.get('/books/:id', show);
  app.post('/books', verifyAuthToken ,create);
  app.delete('/books/:id', verifyAuthToken ,destroy);
};

export default bookRoutes;
