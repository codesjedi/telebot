import { chromium } from "playwright";

import { currentBank } from "../utils";

export const getDolar = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(currentBank.url);
  const content = page.locator(currentBank.selector);
  const data = await content.innerText();
  const platforms = data.split("\t");

  return {
    displayText: `
    *Cotización del día:*
    *Banco: * ${currentBank.name}
    *Compra / Venta*
    *Efectivo:* ${platforms[1]}
    *Cheque:* ${platforms[2]}
    *Home Banking:* ${platforms[3]}
  `,
    efectivo: parseAmount(platforms[1]),
    cheque: parseAmount(platforms[2]),
    homeBanking: parseAmount(platforms[3]),
  };
};

const parseAmount = (amount: string) => {
  const crudo = amount.split("/");
  return {
    compra: crudo[0],
    venta: crudo[1],
  };
};
