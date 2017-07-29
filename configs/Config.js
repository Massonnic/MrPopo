const config = require('./config.json')
const fs = require('fs')

module.exports = class Config 
{

    static conf()
    {
        return config
    }

    static getDefaultTextChannel(guild)
    {
        let path = "./guilds/"+guild.id
        const file = require(path)
        return file.defaultTextChannel
    }

    static getGreeting(guild)
    {
        let path = "./guilds/"+guild.id
        const file = require(path)
        return file.greeting
    }

    static getParams(param)
    {
        for (let obj of Object.entries(config))
        {
            if (obj[0] == param)
            {
                return obj[1]
            }
        }
        return null
    }

}