const dotenv = require('dotenv');
dotenv.config();
const { Pool } = require('pg');

class DBConnection {
    constructor() {
        this.db = new Pool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_DATABASE,
            port: process.env.DB_PORT
        });

        this.checkConnection();
    }

    checkConnection() {
        this.db.connect((err, client, release) => {
            if (err) {
                console.error('Error connecting to PostgreSQL database:', err);
                return;
            }
            console.log('Connected to PostgreSQL database');
            release();
        });
    }

    query = async (sql, values) => {
        return new Promise((resolve, reject) => {
            this.db.query(sql, values, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result.rows);
            });
        });
    }
}

module.exports = new DBConnection().query;
