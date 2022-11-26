import express, { Request, Response } from 'express';
import { UserTable, User } from '../models/user';

const Table = new UserTable();

const create = async (_req: Request, res: Response) => {
  try {
    const user: User = {
      first_name: _req.body.first_name,
      last_name: _req.body.last_name,
      user_name: _req.body.user_name,
      password: _req.body.password,
    };

    const newUser = await Table.create(user);
    res.json(newUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const authenticate = async (_req: Request, res: Response) => {
  try {
    const username = _req.body.user_name;
    const password = _req.body.password;

    const auth = await Table.authenticate(username, password);
    res.json(auth);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const userRoutes = (app: express.Application) => {
  app.post('/users', create);
  app.get('/users', authenticate);
};

export default userRoutes;
