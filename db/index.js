const monk = require('monk')

require('dotenv').config()

const db = monk(process.env.MONGO_URI)

module.exports = {
  gifs: db.get('gifs')
}
