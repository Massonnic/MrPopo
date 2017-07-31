const Discord = require('discord.js')
const Event = require('./Event')
<<<<<<< HEAD
const token = require('../utils.txt').token
=======
const token = require('../token')
>>>>>>> fa6030c83c2a7cd1a1466486c7cc66d9f1811c88
const Client = new Discord.Client()
const Message = new Discord.Message()

new Event(Client, Message)

Client.login(token)
