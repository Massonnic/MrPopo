const message = require('../configs/messages.json')
const Config = require('../configs/Config')

module.exports = class Greeting
{

    constructor(message, params)
    {
        this.params = params
        this.message = message
        this.guild = message.guild
        this.changeGreeting()
    }

    changeGreeting()
    {
        this.params = this.params[0]
        this.params == 'true' ? this.params = true : this.params == 'false' ? this.params = false : this.params

        let m = message.commands.managment.greeting
        let e = message.commands.commun

        Config.getGreeting(this.guild)
        .then((resolve) => {
            if ((!resolve && this.params) || (resolve && !this.params))
            {
                Config.setGreeting(this.guild, this.params)
                .then((results) => {
                    if (this.params)
                        this.message.reply(m.success_true)
                    else
                        this.message.reply(m.success_false)
                }).catch(() => {
                    this.message.reply(e.error)
                })
            }
            else if (resolve == this.params && this.params)
                this.message.reply(m.info_true)
            else if (resolve == this.params && !this.params)
                this.message.reply(m.info_false)
            else
                this.message.reply(e.arguments_error)
        })
    }

}