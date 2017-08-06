const Discord = require('discord.js')
const Event = require('./Event')
const token = require('../utils.txt').token
const bdd = require('./configs/Sql')

const Client = new Discord.Client()
const Message = new Discord.Message()
const Sql = new bdd("localhost", "root", "", "mrpopo")

new Event(Client, Message)

Client.login(token)
