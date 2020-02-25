import { Request, Response, NextFunction } from 'express';
import { Country } from '../models/Country';
import { GetCountries } from '../actions';

export const queryCurrency = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { data } = await GetCountries();
  console.log(`the number is: ${data.length}`);
  await Promise.all(
    data.map(async (c: any) => {
      const exist = await Country.findOne({ name: c.name });
      if (!exist) {
        await Country.create({
          name: c.name,
          region: c.region,
          timezones: c.timezones,
          currency: { name: c.currencies[0].name, code: c.currencies[0].code }
        });
      }
    })
  );
  res.json(data);
};
