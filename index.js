const Discord = require('discord.js')
const Event = require('./Event')
const Client = new Discord.Client()
const Message = new Discord.Message()
const token = 'MzI3NTI2ODI3MzkwMTQwNDE2.DC2t9g.cdgEg3T-mVOjQhkyH3n0ShEzlZg'

new Event(Client, Message)

Client.login(token)