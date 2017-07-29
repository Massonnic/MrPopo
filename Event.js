const messages = require('./configs/messages.json')
const Register = require('./configs/Register')
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
            new Register(this.client)
        })

        this.client.on('guildCreate', () => {
            new Register(this.client)
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
                
                let defaultTextChannel = Config.getDefaultTextChannel(newMember.guild)
                let greeting = Config.getGreeting(newMember.guild)

                if (defaultTextChannel && greeting)
                {
                    this.message.channel = newMember.guild.channels.get(defaultTextChannel)
                    return this.message.channel.send(Messages.getGreeting(newMember))
                }
            }

        })

    }

}