const config = require('./config.json')
const Sql = require('./Sql')
const utils = require('../../utils.txt').bdd
const table = utils.tables.guild_data
const fields = table.fields

let bdd = new Sql()

module.exports = class Config 
{

    static conf()
    {
        return config
    }

    static getRow(guild)
    {
        let request = `Select * From ${table.name} Where id=${guild.id}`
        return new Promise((resolve, reject) => {
            bdd.query(request)
            .then((results) => {
                results = results[0]
                resolve(results)
            }).catch((error) => {
                console.log(error)
            })
        })
    }

    static newRow(guild)
    {
        let tc = this.getChannels(guild, 'text')
        let vc = this.getChannels(guild, 'vocal')
        
        let request = `Insert Into ${table.name} (${fields[0]}, ${fields[1]}, ${fields[2]}, ${fields[3]})
        Values (${guild.id}, '${guild.name}', ${tc[0].id}, ${vc[0].id})`
        
        return new Promise((resolve, reject) => {
            bdd.query(request)
            .then((results) => {
            }).catch((error) => {
                console.log(error)
            })
        })
    }

    static removeRow(guild)
    {
        let request = `Delete From ${table.name} Where id=${guild.id}`
        return new Promise((resolve, reject) => {
            bdd.query(request)
            .then((results) => {
            }).catch((error) => {
                console.log(error)
            })
        })
    }

    static getDefaultTextChannel(guild)
    {
        let request = `Select ${fields[2]} From ${table.name} Where id=${guild.id}`
        return new Promise((resolve, reject) => {
            bdd.query(request)
            .then((results) => {
                results = Object.values(results[0]).shift()
                resolve(results)
            }).catch((error) => {
                console.log(error)
            })
        })
    }

    static setDefaultTextChannel(guild, value)
    {
        let request = `Update ${table.name} Set ${fields[2]}=${value.id} Where id=${guild.id}`
        return new Promise((resolve, reject) => {
            bdd.query(request)
            .then((results) => {
                resolve(results)
            }).catch((error) => {
                console.log(error)
            })
        })
    }

    static getGreeting(guild)
    {
        let request = `Select ${fields[4]} From ${table.name} Where id=${guild.id}`
        return new Promise((resolve, reject) => {
            bdd.query(request)
            .then((results) => {
                results = Object.values(results[0]).shift()
                if (results == 0)
                    resolve(false)
                resolve(true)
            }).catch((error) => {
                console.log(error)
            })
        })
    }

    static setGreeting(guild, value)
    {
        let request = `Update ${table.name} Set ${fields[4]}=${value} Where id=${guild.id}`
        return new Promise((resolve, reject) => {
            bdd.query(request)
            .then((results) => {
                resolve(results)
            }).catch((error) => {
                console.log(error)
            })
        })
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

    static getChannels(guild, type = null)
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

}