async function searchEntries (tableName, searchLine) {
    const {Client} = require('pg');

    const client = new Client({
        user: 'postgres',
        password: 'postgres',
        host: 'localhost',
        port: 5432,
        database: 'aspect'
    });

    if (tableName === '') {
        return {
            data: [],
            count: 0
        }
    }

    if (searchLine === '') {
        return {
            data: [],
            count: 0
        }
    }

    let query = `SELECT name, description FROM ${tableName} WHERE name LIKE '%${searchLine}%' or description LIKE '%${searchLine}%'`;
    await client.connect();
    const res = await client.query(query)
    await client.end()
    
    if (res.rows) {
        return {
            data: res.rows.slice(0, 20),
            count: res.rowCount
        }
    }
}

module.exports = searchEntries
