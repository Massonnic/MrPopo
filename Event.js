const messages = require('./configs/messages.json')
const Messages = require('./configs/Messages')
const Config = require('./configs/Config')
const Commands = require('./commands/Commands')

module.exports = class Event {

    constructor(client, message)
    {
        this.client = client
        this.message = message
        this.eventListeners()
    }

    eventListeners()
    {
        this.client.on('ready', () => {
            this.client.user.setGame(Config.conf().game)
            for (let guild of this.client.guilds.array())
            {
                Config.getRow(guild)
                .then((results) => {
                    if (results == undefined)
                        Config.newRow(guild)
                })
            }
        })

        this.client.on('guildCreate', (guild) => {
            Config.newRow(guild)
        })

        this.client.on('guildDelete', (guild) => {
            Config.removeRow(guild)
        })

        this.client.on('message', (message) => {

            if (!message.author.bot)
                Commands.checkCommand(message)

            if (message.isMentioned(this.client.user))
                message.channel.send(Messages.getResponse())

        })

        this.client.on('presenceUpdate', (oldMember, newMember) => {

            if (oldMember.presence.status == 'offline' && newMember.presence.status == 'online')
            {
                if (newMember.user.bot == true) { return }
                Config.getDefaultTextChannel(newMember.guild)
                .then((resolve) => {
                    this.message.channel = newMember.guild.channels.get(resolve)
                })
                Config.getGreeting(newMember.guild)
                .then((resolve) => {
                    let greeting = resolve
                    
                    if (greeting)
                        this.message.channel.send(Messages.getGreeting(newMember))
                })
            }

        })

    }

}