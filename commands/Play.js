const Discord = require('discord.js')
const Channel = new Discord.Channel()
const ytdl = require('ytdl-core')
const fs = require('fs')

let _connection, streamDispatcher

module.exports = class Play
{
    
    constructor(message, params) //a changer
    {
        const conf = require('../configs/guilds/'+message.guild.id+'.json')
        this.message = message
        this.params = params[0]
        this.dvc = message.guild.channels.get(conf.defaultVocalChannel)
        this.connect()
    }

    checkPlaylist()
    {
        let url = 'https://www.youtube.com/results?search_query='+this.params
        let list = fs.createReadStream(url)

        list.on('data', (chunk) => {
            console.log(chunk)
        })
    }

    connect()
    {
        this.dvc.join().then(connection => {
            const stream = ytdl(this.params, {filter: 'audioonly'})
            const streamOption = { seek: 0, volume: 1 }
            streamDispatcher = connection.playStream(stream, streamOption)

            streamDispatcher.on('end', () => {
                this.dvc.leave()
            })
        })
    }

    static stop()
    {
        streamDispatcher.end()
    }

    static pause()
    {
        streamDispatcher.pause()
    }

    static resume()
    {
        streamDispatcher.resume()
    }

    static getConnection()
    {
        return _connection
    }

    static getStreamDispatcher()
    {
        return streamDispatcher
    }

    static setConnection(newConnection)
    {
        _connection = newConnection
    }

    static setStreamDispatcher(newStreamDispatcher)
    {
        streamDispatcher = newStreamDispatcher
    }
}