const message = require('../configs/messages.json')
const Config = require('../configs/Config')

module.exports = class Setdefault {

    constructor(message, params)
    {
        this.params = params
        this.message = message
        this.guild = message.guild
        this.channel = message.channel

        this.changeDefaultChannel()
    }

    changeDefaultChannel()
    {
        let m = message.commands.managment.setdefault
        let e = message.commands.commun

        Config.getDefaultTextChannel(this.guild)
        .then((results) => {
            if (results == this.params)
                return this.message.reply(m.info)
            Config.setDefaultTextChannel(this.guild, this.channel)
            .then((results) => {
                this.message.reply(m.success)
            }).catch(() => {
                this.message.reply(e.error)
            })
        })
    }



}