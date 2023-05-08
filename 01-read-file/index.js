const fs = require('fs')
const path = require('path')

let data = ''
const filePath = path.join(__dirname, 'text.txt')
const readStream = fs.createReadStream(filePath, { encoding: 'utf-8' })
readStream.on('data', chunk => data += chunk)
readStream.on('end', () => console.log(data))
readStream.on('error', (e) => console.log(e))