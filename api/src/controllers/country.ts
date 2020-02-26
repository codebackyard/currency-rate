import { Request, Response, NextFunction } from 'express';
import { Country } from '../models/Country';
import { GetCountries } from '../actions';

export const queryCurrency = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name = '' } = req.query;
  const data = await Country.find({
    name: { $regex: '.*' + name + '.*', $options: 'i' }
  }).limit(5);
  res.json(data);
};
