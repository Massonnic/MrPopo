const message = require('./messages.json')
let splitter = "¤"

module.exports = class Messages {

    static getGreeting(guildMember)
    {
        let i = Math.round(Math.random() * (message.accueil.length - 1))
        let msg = message.accueil[i]
        msg = msg.split(splitter)

        return msg[0] + guildMember.user.id + msg[1]
    }

    static getResponse()
    {
        let i = Math.round(Math.random() * (message.responses.length - 1))
        let msg = message.responses[i]

        return msg
    }

}