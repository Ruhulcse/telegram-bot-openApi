const {Telegraf} = require('telegraf');
const { message } = require('telegraf/filters');
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();
const bot = new Telegraf(process.env.BOT_TOKEN);
const configuration = new Configuration({
    apiKey: process.env.CHAT_TOKEN,
  });
const openai = new OpenAIApi(configuration);

bot.start((ctx) => {
  return ctx.reply('I am Jambo Created by Ruhul, how can i help you?');
});
bot.on(message('text'), async(ctx) => {
    const response = await runCompletion(ctx.message.text);
    return ctx.reply( response);
});
bot.launch();
async function runCompletion (prompt) {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
    });
return completion.data.choices[0].text;
}