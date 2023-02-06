import { Telegraf } from 'telegraf';
import {BOT_TOKEN} from "./AppConfig";
import {API_URL} from "./constants";
import axios from "axios";

const bot = new Telegraf(BOT_TOKEN);

const getQuest = async () => {
    const response = await axios.get(`${API_URL}`);
    return response.data;
};

bot.command('start', async (ctx) => {
    await ctx.replyWithHTML(`Cześć, to bot do nauki polskich słów! \n\nЕсли хочешь получить слово на русском, нажми 🇷🇺\n\nJeśli chcesz uzyskać słowo po polsku, naciśnij 🇵🇱`,{
        reply_markup: {
            inline_keyboard: [
                [ { text: "🇷🇺", callback_data: "rus" }, { text: "🇵🇱", callback_data: "pol" } ]
            ]
        }});
});

bot.action("rus", async ctx => {
    const answer = await getQuest();
    let questCount = answer.length;
    let numberQuest = Math.round(Math.random() * questCount);
    await ctx.replyWithHTML(`${answer[numberQuest].russian}`);
    await ctx.replyWithHTML(`<span class="tg-spoiler">${answer[numberQuest].polish}</span>`, {
        reply_markup: {
            inline_keyboard: [
                [ { text: "🇷🇺", callback_data: "rus" }, { text: "🇵🇱", callback_data: "pol" } ]
            ]
        }
    });
})

bot.action("pol", async ctx => {
    const answer = await getQuest();
    let questCount = answer.length;
    let numberQuest = Math.round(Math.random() * questCount);
    await ctx.replyWithHTML(`${answer[numberQuest].polish}`);
    await ctx.replyWithHTML(`<span class="tg-spoiler">${answer[numberQuest].russian}</span>`, {
        reply_markup: {
            inline_keyboard: [
                [ { text: "🇷🇺", callback_data: "rus" }, { text: "🇵🇱", callback_data: "pol" } ]
            ]
        }
    });
})

bot.launch();