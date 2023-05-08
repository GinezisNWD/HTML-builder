const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'destination.txt')
const writeStream = fs.createWriteStream(filePath, { encoding: 'utf-8' })
console.log('Hello! Enter your text...')

process.stdin.on('data', input => {
	if (input.toString().trim() === 'exit') {
		writeStream.end()
		process.exit()
	}
	else {
		writeStream.write(input)
	}
})

process.on('SIGINT', () => {
	writeStream.end()
	process.exit()
})

process.on('exit', () => {
	writeStream.end()
	console.log('Bye!')
})

writeStream.on('error', (e) => console.log(e))