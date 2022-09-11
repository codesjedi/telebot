import * as dotenv from "dotenv";
import { Telegraf } from "telegraf";

import { getDolar } from "./cotizacion/dolar";
import { calcularSalario } from "./salario";
import { logRequest } from "./utils/logRequest";

// Telegram token
dotenv.config();
const token = process.env.TELEGRAM_TOKEN as string;

const bot = new Telegraf(token);

// Commands
bot.start((ctx) => ctx.reply(`Welcome, ${ctx.from.first_name}!`));
bot.help((ctx) => ctx.reply("Calling the police!"));

// Calculo de salario
bot.hears("salario", async (ctx) => {
  logRequest(ctx.from.username);
  ctx.sendChatAction("typing");
  ctx.reply("Monto en dolares: ");
  bot.on("text", async (ctx) => {
    ctx.sendChatAction("typing");
    const salario = ctx.message.text;
    if (isNaN(parseInt(salario))) {
      ctx.reply(
        "Por favor introduce un valor numérico, sin espacios, puntos ni comas."
      );
    } else {
      ctx.reply(await calcularSalario(ctx.message.text));
    }
  });
});

// Cotizacion del dolar
bot.hears("dolar", async (ctx) => {
  logRequest(ctx.from.username);
  const dolarInfo = await getDolar();
  return ctx.reply(dolarInfo.displayText, {
    parse_mode: "MarkdownV2",
  });
});

bot.launch();
console.log("Bot started!");
