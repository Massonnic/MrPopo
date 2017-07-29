const message = require('../configs/messages.json')
const fs = require('fs')

module.exports = class Setdefault {

    constructor(message, params)
    {
        this.params = params
        this.message = message
        this.guild = message.guild.id
        this.channel = message.channel.id

        this.changeDefaultChannel()
    }

    changeDefaultChannel()
    {
        let path = "configs/guilds/"+this.guild
        const config = require('../'+path)

        if (config.defaultTextChannel == this.channel)
            return this.message.reply(message.commands.managment.setdefault.info)
        config.defaultTextChannel = this.channel

        fs.writeFile('./'+path+'.json', JSON.stringify(config, null, 4), (err) => {
            if (err)
            {
                this.message.reply(message.commands.managment.setdefault.error)
                throw err
            }
            else 
                this.message.reply(message.commands.managment.setdefault.success)
        })
    }



}