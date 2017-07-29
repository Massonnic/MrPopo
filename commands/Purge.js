module.exports = class Purge
{

    constructor(message, params)
    {
        this.message = message
        this.params = params[0]
        this.action()
    }

    action()
    {
        let regex = /<@([0-9]+)>/
        let params = regex.exec(this.params)[1]
        let member = this.message.guild.members.get(params)

        if (member.user.id == params)
        {
            console.log(this.message.channel)
        }
    }

}