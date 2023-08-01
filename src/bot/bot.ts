import { Markup, Telegraf } from "telegraf";
import { ConfigParams } from "../config";

const bot =  new Telegraf(ConfigParams.BOT_TOKEN);

bot.start((ctx) => {
   ctx.reply("Select an account", Markup.inlineKeyboard([
      [Markup.button.callback('Ethereum', 'ethereum')],
        [Markup.button.callback('Abitrum', 'abitrum')],
        [Markup.button.callback('Optimism', 'optimism')],
        [Markup.button.callback('Polygon', 'polygon')]
    ]));
});

bot.action('ethereum', (ctx) => {
    ctx.reply("You chose Ethereum! Select a token", Markup.inlineKeyboard([
        [Markup.button.callback('Swap ETH for UNI', 'ethtouni')],
        [Markup.button.callback('Swap ETH to ABR', 'unitoeth')],
        [Markup.button.callback('Swap ETH to WLD', 'unitoeth')],
        [Markup.button.callback('Swap ETH to FIL', 'unitoeth')],
        [Markup.button.callback('Swap ETH to BNB', 'unitoeth')]
    ]));
});

bot.action('abitrum', (ctx) => {
    ctx.reply("You chose Abitrum! Select a token", Markup.inlineKeyboard([
        [Markup.button.callback('Swap ABR for UNI', 'ethtouni')],
        [Markup.button.callback('Swap ARB to ETH', 'unitoeth')],
        [Markup.button.callback('Swap ARB to WLD', 'unitoeth')],
        [Markup.button.callback('Swap ARB to FIL', 'unitoeth')],
        [Markup.button.callback('Swap ARB to BNB', 'unitoeth')]
    ]));
});

bot.action('optimism', (ctx) => {
    ctx.reply("You chose Optimism! Select a token", Markup.inlineKeyboard([
        [Markup.button.callback('Swap OP for UNI', 'ethtouni')],
        [Markup.button.callback('Swap OP to ETH', 'unitoeth')],
        [Markup.button.callback('Swap OP to WLD', 'unitoeth')],
        [Markup.button.callback('Swap Op to FIL', 'unitoeth')],
        [Markup.button.callback('Swap OP to BNB', 'unitoeth')]
    ]));
});


bot.action('polygon', (ctx) => {
    ctx.reply("You chose Polygon! Select a token", Markup.inlineKeyboard([
        [Markup.button.callback('Swap MAT for UNI', 'ethtouni')],
        [Markup.button.callback('Swap MAT to ETH', 'unitoeth')],
        [Markup.button.callback('Swap MAT to WLD', 'unitoeth')],
        [Markup.button.callback('Swap MAT to FIL', 'unitoeth')],
        [Markup.button.callback('Swap MAT to BNB', 'unitoeth')]
    ]));
});



export {bot}
