const mineflayer = require('mineflayer');
const readline = require('readline');
const config = require('./config.json');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const bot = mineflayer.createBot({
  host: config.host,
  port: config.port,
  username: config.username,
  password: config.pass
});


rl.on('line', (input) => {
  console.log(`Received: ${input}`);
  bot.chat(input);
});
rl.on('error', err => console.log(err))

bot.on('chat', function (username, message) {
  if (username === bot.username) return
  console.log(`${username}:`, message)
});

bot.on('login', () => console.log("Logged in as", bot.username, "to", config.host, "on version", bot.majorVersion, "(Protocol Version)", bot.protocolVersion))
bot.on('kicked', (reason, loggedIn) => console.log(reason, loggedIn))
bot.on('error', err => console.log(err))