const mysql = require('mysql')
const bdd = require('../../utils.txt').bdd

module.exports = class Sql
{
    constructor()
    {
        this.co = mysql.createConnection({
            host: bdd.host,
            user: bdd.user,
            password: bdd.password,
            database: bdd.database
        })
    }

    query(string)
    {
        return new Promise((resolve, reject)  => {
            this.co.query(string, (error, results, fields) => {
                if (error)
                    reject(error)
                else
                    resolve(results)
            })
        })
    }
}