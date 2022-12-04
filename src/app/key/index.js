const fs = require('fs')
const path = require('path')

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './private.key')).toString()
const PUBILC_KEY = fs.readFileSync(path.resolve(__dirname, './private.key')).toString()

module.exports = {
  PRIVATE_KEY,
  PUBILC_KEY
}
