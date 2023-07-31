import { Markup, Telegraf } from "telegraf";
import { ConfigParams } from "../config";

const bot =  new Telegraf(ConfigParams.BOT_TOKEN);

bot.start((ctx) => {
    ctx.reply("Hello there Welcome to our Trading Bot Please Select a Network");
    const custom_keyboard = Markup.inlineKeyboard([
            [Markup.button.callback('Ethereum', 'ethereum')],
            [Markup.button.callback('Abitrum', 'abitrum')],
            [Markup.button.callback('Optimism', 'optimism')],
            [Markup.button.callback('Polygon', 'polygon')]
        ]);
})

export {bot}
