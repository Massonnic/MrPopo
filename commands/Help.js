const message = require('../configs/messages.json')

module.exports = class Help
{

    constructor(message, params)
    {
        this.message = message
        this.display()
    }

    display()
    {
        let m = message.commands
        let text = ""
        let i = 0

        for (let g in m)
        {
            let name = g
            if (i == 0)
            { 
                i++
                continue 
            }
            g = m[g]

            text += "```css\n"+name.toUpperCase()+"```\n"
            for (let c in g)
            {
                c = g[c]
                text += "   **"+c.syntax+"**: "+c.description+"\n"
            }
            i++
        }

        this.message.channel.send(text)
    }

}