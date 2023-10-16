const TelegramApi = require('node-telegram-bot-api');
const {config} = require('dotenv');
const {array} = require('./quotes');
config()
const token = process.env.TELEGRAM_API_TOKEN;



const bot = new TelegramApi(token, { polling: true });

const randQuote = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
}

const start = () => {
    bot.setMyCommands([
        { command: '/start', description: 'Начальное приветствие' },
        { command: '/info', description: 'Получить информацию о пользователе' },
        { command: '/i_want_a_quote', description: 'Получить рандомную цитату' }
    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/06c/d14/06cd1435-9376-40d1-b196-097f5c30515c/1.webp')
            return bot.sendMessage(chatId, `Добро пожаловать в телеграм-бот Леры`)
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name}`)
        }
        if (text === '/i_want_a_quote') {
            return bot.sendMessage(chatId, `${randQuote(array)}`)
        }
        return bot.sendMessage(chatId, `Я тебя не понимаю, попробуй еще раз!`)
    })
}

start()
