const { Pool } = require('pg')

const pool = new Pool()

var connectionString = 'postgresql://postgres:123456789@localhost/AmbrogioAcademy';


module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}