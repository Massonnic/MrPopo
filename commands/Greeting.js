const message = require('../configs/messages.json')
const fs = require('fs')

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
        let path = "configs/guilds/"+this.guild.id+".json"
        const config = require("../"+path)
        this.params = this.params[0]

        if (this.params == config.greeting && this.params == 'true')
            return this.message.reply(message.commands.managment.greeting.info_true)
        else if(this.params == config.greeting && this.params == 'false')
            return this.message.reply(message.commands.managment.greeting.info_false)
        else if(this.params != 'true' && this.params != 'false')
            return this.message.reply(message.commands.managment.greeting.error + ' ' + message.commands.managment.greeting.arguments_error)

        config.greeting = this.params
            
        fs.writeFile("./"+path, JSON.stringify(config, null, 4), (err) => {
            if (err)
            {
                this.message.reply(message.commands.managment.greeting.error)
                throw err
            }
            if (this.params == 'true')
                return this.message.reply(message.commands.managment.greeting.success_true)
            else
                return this.message.reply(message.commands.managment.greeting.success_false)
        })
    }

}