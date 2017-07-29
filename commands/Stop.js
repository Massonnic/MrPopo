const Play = require('./Play')

module.exports = class Stop
{

    constructor(message, params)
    {
        Play.stop()
    }

}