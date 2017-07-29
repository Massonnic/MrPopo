const fs = require('fs')
const messages = require('../configs/messages.json')

module.exports = class Status
{

    constructor(message, params)
    {
        this.message = message
        this.guild = message.guild

        this.getParams()
    }

    getParams()
    {
        let path = './configs/guilds/'+this.guild.id+'.json'
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) throw err
            data = JSON.parse(data)

            this.send(data)
        })
    }

    send(data)
    {
        let text = "", name
        let _data = this.toArray(data)
        let m = messages.commands.managment.status

        _data.forEach((i) => {
            switch(i[0])
            {
                case 'defaultTextChannel':
                    name = this.guild.channels.get(i[1]).name
                    text += m.defaultTextChannel+'**'+name+"**\n"
                break

                case 'defaultVocalChannel':
                    name = this.guild.channels.get(i[1]).name
                    text += m.defaultVocalChannel+'**'+name+'**\n'
                break

                case 'greeting':
                    let state
                    if(i[1] == 'true') 
                        state = '**Activée**'
                    else
                        state = '**Désactivée**'
                    text += m.greeting+state+"\n"
                break
            }
        })

        this.message.channel.send(text)
    }

    toArray(data)
    {
        data = JSON.stringify(data)
        data = data.substr(1, data.length -2)

        let match = /[.]*(")[.]*?/g
        data = data.replace(match, '')
        data = data.split(',')

        for(let i = 0; i < data.length; i++)
        {
            data[i] = data[i].split(':')
        }

        return data
    }

}