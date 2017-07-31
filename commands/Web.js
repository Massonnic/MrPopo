const domaine = require('../../utils.txt').web

module.exports = class Web
{

    constructor(message, params)
    {
        this.guild = message.guild
        this.user = message.author

        this.send()
    }

    getUrl()
    {
        let url = domaine+'?guild='+this.guild.id
        return url
    }

    send()
    {
        this.user.createDM()
            .then(DMchannel => DMchannel.send(this.getUrl()))
    }

}