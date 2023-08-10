const mysql = require('mysql');

const configDB = {
    host: "localhost",
    user: "root",
    password: "123456",
    database: "myfriends"
};

class FriendController {

    // [GET] /friend
    async getListFriends(req, res) {
        try {
            var conn = mysql.createConnection(configDB);

            const listFriends = await new Promise((resolve, reject) => {
                conn.query(`SELECT * FROM friends`, (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                })
            })
            res.status(200).send(listFriends);
        } catch (err) {
            res.status(500).send(err);
        } finally {
            conn.end();
        }
    }

    // [GET] /friend/friends-by-cat
    async getListFriendsByCat(req, res) {
        var catId = req.query.cid;
        try {
            var conn = mysql.createConnection(configDB);

            const listFriendsByCat = await new Promise((resolve, reject) => {
                conn.query(`SELECT * FROM friends WHERE cat_id = ${catId}`, (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                })
            })
            res.status(200).send(listFriendsByCat);
        } catch (err) {
            res.status(500).send(err);
        } finally {
            conn.end();
        }
    }

    // [GET] /friend/friend-by-id
    async getFriendById(req, res) {
        var id = req.query.id;
        try {
            var conn = mysql.createConnection(configDB);

            const friendById = await new Promise((resolve, reject) => {
                conn.query(`SELECT * FROM friends WHERE id = ${id}`, (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                })
            })
            res.status(200).send(friendById[0]);
        } catch (err) {
            res.status(500).send(err);
        } finally {
            conn.end();
        }
    }

    // // [POST] /news/contact
    // async postContact(req, res) {
    //     const { name, phone, web, gender, content, file } = req.form_data;

    //     try {
    //         var conn = mysql.createConnection(configDB);

    //         await new Promise((resolve, reject) => {
    //             conn.query(`INSERT INTO contact (name, phone, web, gender, picture, content) VALUES (?, ?, ?, ?, ?, ?)`,
    //                 [name, phone, web, gender, file, content], function (err, result) {
    //                     if (err) {
    //                         reject(err);
    //                     }
    //                     resolve(result);
    //                 });
    //         })
    //         res.status(200).send('OK');
    //     } catch (err) {
    //         console.log(err);
    //         res.status(500).send('NOK');
    //     } finally {
    //         conn.end();
    //     }
    // }
}

module.exports = new FriendController();
