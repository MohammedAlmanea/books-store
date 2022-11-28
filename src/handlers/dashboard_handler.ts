import express, { Request, Response } from 'express';
import { Dashboard } from '../services/dashboard';

const dashboard = new Dashboard();

const orderUser = async (_req: Request, res: Response) => {
  const user = await dashboard.ordersUser();
  res.json(user);
};

const fiveExpensive = async (_req: Request, res: Response) => {
  const products = await dashboard.fiveExpensive();
  res.json(products);
};

const dashboardRoutes = (app: express.Application) => {
  app.get('/user_of_order', orderUser);
  app.get('/five_most_expensive', fiveExpensive);
};

export default dashboardRoutes;
