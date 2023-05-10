const fsPromise = require('fs/promises')
const path = require('path')

const inputPath = path.join(__dirname, 'styles')
const outputPath = path.join(__dirname, 'project-dist', 'bundle.css')

function mergeStyles(inputPath, outputPath) {
	fsPromise.writeFile(outputPath, '')
		.then(() => fsPromise.readdir(inputPath, { withFileTypes: true }))
		.then((data) => {
			const files = data.filter(elem => elem.name.endsWith('.css'))
			for (file of files) {
				fsPromise.readFile(path.join(inputPath, file.name), { encoding: 'utf-8' })
					.then(data => { fsPromise.appendFile(outputPath, data) })
			}
		})
}
mergeStyles(inputPath, outputPath)