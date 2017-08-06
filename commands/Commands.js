const config = require('../configs/config.json')

module.exports = class Commands 
{

    constructor(command, message, params)
    {
        try
        {
            const obj = new (
                require("./"+command)
            )(message, params)
            message.delete()
        }
        catch (error)
        {
            console.log(error)
        }
    }

    static checkCommand(message)
    {
        let starter = message.content.substr(0, 1)
        let split = message.content.split(' ')
        let command = split[0].substr(1)
        command = command.replace(command.substr(0, 1), command.substr(0, 1).toUpperCase()) 
        split.shift()
        let params = split
        
        if (starter == config.commands.prefix)
            new this(command, message, params)   

        return false
    }

}