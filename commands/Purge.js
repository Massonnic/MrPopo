module.exports = class Purge
{

    constructor(message, params)
    {
        this.message = message
        this.mention = params[0]

        if (params[1])
            this.limit = params[1]
        else
            this.limit = 100
        
        this.action()
    }

    action()
    {
        let regex = /<@([0-9]+)>/
        let params = regex.exec(this.mention)[1]
        let member = this.message.guild.members.get(params)

        if (member.user.id == params)
        {
            this.message.channel.fetchMessages({limit: this.limit})
            .then(messages => {
                messages = messages.array()
                for (let i = 0; i < messages.length; i++)
                {
                    if (messages[i].author.id == params)
                        messages[i].delete()
                }
            })
        }
    }

}