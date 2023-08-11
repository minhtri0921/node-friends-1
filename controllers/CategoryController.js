const mysql = require('mysql');

const configDB = {
    host: "localhost",
    user: "root",
    password: "123456",
    database: "myfriends"
};

class CategoryController {

    // [GET] /cat
    async getListCats(req, res, next) {
        try {
            var conn = mysql.createConnection(configDB);

            const listCats = await new Promise((resolve, reject) => {
                conn.query(`SELECT * FROM category`, (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                })
            })
            res.status(200).send(listCats);
        } catch (err) {
            next(err);
        } finally {
            conn.end();
        }
    }

    // [GET] /cat/catbyid
    async getCatById(req, res, next) {
        var id = req.query.id;
        try {
            var conn = mysql.createConnection(configDB);

            const catById = await new Promise((resolve, reject) => {
                conn.query(`SELECT * FROM category WHERE id = ${id}`, (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                })
            })
            res.status(200).send(catById[0]);
        } catch (err) {
            next(err);
        } finally {
            conn.end();
        }
    }
}

module.exports = new CategoryController();
