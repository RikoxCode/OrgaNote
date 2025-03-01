const { Pool } = require('pg')
require('dotenv').config()

class BaseStore {
    constructor() {
        this.pool = new Pool({
            user: process.env.DATABASE_USER,
            host: process.env.DATABASE_HOST,
            database: process.env.DATABASE_NAME,
            password: process.env.DATABASE_PASSWORD,
        })
    }

    /**
     * This method is used to execute a query on the database
     *
     * @param {string} query - The query to execute
     * @param {Array} values - The values to pass to the query
     * @returns {Promise<*>} - The result of the query
     *
     * @example
     * const result = await this.exec('SELECT * FROM clubs');
     * */
    async exec(query, values = []) {
        const client = await this.pool.connect()
        try {
            const res = await client.query(query, values)
            return res.rows
        } catch (err) {
            console.error('Database query error:', err)
            throw err
        } finally {
            client.release()
        }
    }
}

module.exports = BaseStore
