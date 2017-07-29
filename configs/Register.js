const config = require('./config.json')
const fs = require('fs')

module.exports = class Register {

    constructor(client)
    {
        this.path = './configs/guilds'
        this.clientGuilds = this.getClientGuilds(client)
        this.hadConf()
    }

    hadConf()
    {
        for (let guild of this.clientGuilds)
        {
            fs.access("./configs/guilds/"+guild.id+".json", (err) => {
                if (err)
                    this.registerGuild(guild)
                else
                    this.checkContent(guild)
            })
        }

        this.getDirContent(this.path)
    }

    checkContent(guild)
    {
        fs.readFile('./configs/guilds/'+guild.id+'.json', 'utf8', (err, data) => {
            let array = Object.keys(JSON.parse(data))
            config.file_content.forEach((i) => {
                if (!array.includes(i))
                    this.update(guild, i)
            })
        })
    }

    getClientGuilds(client)
    {
        let clientGuilds = []
        client.guilds.array().forEach((i) => {
            clientGuilds.push(i)
        })
        return clientGuilds
    }

    getChannels(guild, type = null)
    {
        if (type == null)
        {
            let channels = guild.channels.array()
            return channels
        }
        else
        {
            let textChannels = []
            let vocalChannels = []
            for (let channel of guild.channels.array())
            {
                channel.type == 'text' ? textChannels.push(channel) : 
                vocalChannels.push(channel)
            }

            if (type == 'text')
                return textChannels
            else
                return vocalChannels
        }
    }

    getDirContent(path)
    {
        let filesName = []
        fs.readdir(path, (err, files) => {
            if (err) throw err
            files.forEach((i) => {
                i = i.substr(0, i.length -5)
                filesName.push(i)
            })
            this.removeGuild(filesName)
        })
    }

    update(guild, missing)
    {
        let tc = this.getChannels(guild, 'text')
        let vc = this.getChannels(guild, 'vocal')
        let newGuild = "{"
        switch (missing)
        {
            case "name":
                newGuild += "\"name\": \""+guild.name+"\""
            break
            
            case "defaultTextChannel":
                newGuild += "\"defaultTextChannel\": \""+tc[0].id+"\""
            break

            case "defaultVocalChannel":
                newGuild += "\"defaultVocalChannel\": \""+vc[0].id+"\""
            break

            case "greeting":
                newGuild += "\"greeting\": "+false
            break
        }
        newGuild += "} "

        fs.readFile('./configs/guilds/'+guild.id+'.json', 'utf8', (err, data) => {
            if (err) throw err
            let obj = Object.assign(JSON.parse(data), JSON.parse(newGuild))
            fs.writeFile('./configs/guilds/'+guild.id+'.json', JSON.stringify(obj, null, 4), (err) => {
                if (err) throw err 
            })
        })
    }

    registerGuild(guild)
    {
        let tc = this.getChannels(guild, 'text')
        let vc = this.getChannels(guild, 'vocal')

        let newGuild = `
        { 
            "name": "`+guild.name+`",
            "defaultTextChannel": "`+tc[0].id+`",
            "defaultVocalChannel": "`+vc[0].id+`",
            "greeting": false
        }`

        newGuild = JSON.parse(newGuild)

        fs.writeFile('./configs/guilds/'+guild.id+'.json', JSON.stringify(newGuild, null, 4), (err) => {
            if (err) throw err
        })
    }

    removeGuild(files)
    {
        this.clientGuilds.forEach((i) => {
            files.splice(files.indexOf(i.id), 1)
        })

        files.forEach((i) => {
            let file = '/'+i+'.json'
            fs.unlink(this.path+file, (err) => {
                if (err) throw err
            })
        })
    }

}