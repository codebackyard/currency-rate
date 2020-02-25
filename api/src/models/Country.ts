import mongoose from 'mongoose';

export type CountryDocument = mongoose.Document & {
  name: string;
  code: string;
  price: number;
  timezones: Array<string>;
  currency: {
    code: string;
    name: string;
  };
};

const countrySchema = new mongoose.Schema(
  {
    name: { type: String },
    code: { type: String },
    timezones: { type: [String] },
    region: String,
    currency: {
      code: String,
      name: String
    }
  },
  {
    timestamps: true
  }
);

export const Country = mongoose.model<CountryDocument>(
  'Country',
  countrySchema
);
