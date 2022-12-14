import express, { Request, Response } from 'express';
import { Order, Order_Class } from '../models/order';

const OrderObj = new Order_Class();

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await OrderObj.index();
    res.json(orders);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const order = await OrderObj.show(req.params.id);
    res.json(order);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      status: req.body.status,
      user_id: req.body.user_id,
    };

    const newOrder = await OrderObj.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await OrderObj.delete(req.params.id);
  res.json(deleted);
};

const addProduct = async (req: Request, res: Response) => {
  const quantity: number = parseInt(req.params.quantity);
  const order_id: string = req.params.order_id;
  const product_id: string = req.params.product_id;

  try {
    const addedProduct = await OrderObj.addProduct(
      quantity,
      order_id,
      product_id
    );
    res.json(addedProduct);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const OrdersRoutes = (app: express.Application) => {
  app.get('/orders', index);
  app.get('/orders/:id', show);
  app.post('/orders', create);
  app.delete('/orders/:id', destroy);
  app.post('orders/:id/products', addProduct);
};

export default OrdersRoutes;
