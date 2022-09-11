import * as dotenv from "dotenv";
import { getDolar } from "../cotizacion";

dotenv.config();

export const calcularSalario = async (dolar: string) => {
  return thousandSeparator(
    `${parseInt(dolar) * parseInt((await getDolar()).efectivo.compra || "0")}`
  );
};

function thousandSeparator(salario: string) {
  return `Gs. ${salario.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
}
