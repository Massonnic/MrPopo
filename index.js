const Discord = require('discord.js')
const Event = require('./Event')
const Client = new Discord.Client()
const Message = new Discord.Message()
const token = ''

new Event(Client, Message)

Client.login(token)
