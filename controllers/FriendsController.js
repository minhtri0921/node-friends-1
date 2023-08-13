// const config = require('../config.json');
const mysql2 = require('mysql2');

const configDB = {
    host: "localhost",
    user: "root",
    password: "mt2109",
    database: "friends"
};

class FriendsController {
    async getListFriends (req,res,next){
        try {
            var conn = mysql2.createConnection(configDB);

            const sqlSelect = "SELECT * FROM friends";
            const listFriends = await new Promise((resolve, reject) => {
                conn.query(sqlSelect, function (err, results) {
                    if (err) reject(err);
                    resolve(results);
                });
            });
            res.status(200).send(listFriends);
        } catch (err) {
            next(err);
        } finally {
            conn.end();
        }
    }
    async getFriendById(req,res,next){
        var id = req.params.id;
        try {
            var conn = mysql2.createConnection(configDB);

            const sqlSelect = `SELECT * FROM friends WHERE id = '${id}'`;
            const friendById = await new Promise((resolve, reject) => {
                conn.query(sqlSelect, function (err, results) {
                    if (err) reject(err);
                    resolve(results);
                });
            });
            res.status(200).send(friendById[0]);
        } catch (err) {
            next(err);
        } finally {
            conn.end();
        }
    }
    async postFriend(req,res,next){
        try{
            let data = req.form_data
            console.log('4',data);
            var con = mysql2.createConnection(configDB)
            var course = await new Promise((resolve, rejects) => {
                con.query(`INSERT INTO friends ( name ,date, view , detail ,img) VALUES ('${data.name}',NOW(),1,'${data.detail}','${data.file}') `, function (err, result) {
                    if (err) rejects(err);
                    resolve(result)
                })

            })
            res.status(200).send('ok')
        } catch (err) {
            console.log(err);
            res.status(500).send(err)
        }  
        }
    }


module.exports = new FriendsController()