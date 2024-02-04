const mineflayer = require('mineflayer');
const readline = require('readline');
const config = require('./config.json');
const afk = require('./plugin/afk');
const antiwater = require('./plugin/antiwater');

const rl = readline.createInterface({ input: process.stdin });

const bot = mineflayer.createBot({
  host: config.host,
  port: config.port,
  username: config.username,
  password: config.pass,
  version: config.version, /*
  auth: 'microsoft'  */ // If you need to use Microsoft auth instead of Mojang, get rid of the /* */ part
});

bot.loadPlugin(afk)
bot.loadPlugin(antiwater)

rl.on('line', (input) => {
  if(input){
    bot.chat(input);
    //console.log(`Received: ${input}`);
  }
});

rl.on('error', err => console.log(err));

bot.once('spawn', () => {
  mineflayerViewer(bot, { port: 3007, firstPerson: true })
  mineflayerViewer(bot, { port: 3008, firstPerson: false })
  bot.afk.start();
  bot.antiwater.start();
})

bot.on('chat', function (username, message) {
  if (username === bot.username) return
  console.log(`${username}:`, message);
});

bot.on('login', () => console.log("Logged in as", bot.username, "to", config.host, config.port, "on version", bot.majorVersion, "(Protocol Version)", bot.protocolVersion));
bot.on('kicked', (reason, loggedIn) => console.log(reason, loggedIn));
bot.on('error', err => console.log(err));