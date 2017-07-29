const Discord = require('discord.js')
const Event = require('./Event')
const token = require('../token')
const Client = new Discord.Client()
const Message = new Discord.Message()

new Event(Client, Message)

Client.login(token)
