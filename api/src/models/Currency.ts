import mongoose from 'mongoose';

export type CurrencyDocument = mongoose.Document & {
  name: string;
  code: string;
  price: Number;
};

const currencySchema = new mongoose.Schema(
  {
    name: { type: String },
    code: { type: String, unique: true, index: true }
  },
  {
    timestamps: true
  }
);

export const Currency = mongoose.model<CurrencyDocument>(
  'Currency',
  currencySchema
);
