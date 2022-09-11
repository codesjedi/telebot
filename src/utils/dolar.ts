import * as dotenv from "dotenv";

dotenv.config();

export const dolarCommands = ["dolar", "Dolar"];

export const banks = [
  {
    name: "GNB",
    url: "https://www.bancognb.com.py/",
    selector: 'tr:has-text("USD")',
  },
];

export const currentBank = banks.filter(
  (bank) => bank.name === process.env.CURRENT_BANK
)[0];
