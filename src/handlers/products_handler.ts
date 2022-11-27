import express, { Request, Response } from 'express';
import { Product, Product_Class} from '../models/product';

const ProductObj = new Product_Class();

const index = async (_req: Request, res: Response) => {
  try {
    const product = await ProductObj.index();
    res.json(product);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await ProductObj.show(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price
    };

    const newProduct = await ProductObj.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await ProductObj.delete(req.params.id);
  res.json(deleted);
};

const productsRoutes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', create);
  app.delete('/products/:id', destroy);
};

export default productsRoutes;
