const fsPromise = require('fs/promises')
const path = require('path')

const sourse = path.join(__dirname, 'files')
const copyFiles = path.join(__dirname, 'copy-files')


function copyDir(inputPath, outputPath) {
	const sourseFilesNames = []
	fsPromise.mkdir(path.join(outputPath), { recursive: true })
		.then(() => fsPromise.readdir(path.join(inputPath), { withFileTypes: true }))
		.then((files) => {
			for (file of files) {
				if (file.isFile()) {
					fsPromise.copyFile(path.join(inputPath, file.name), path.join(outputPath, file.name))
					sourseFilesNames.push(file.name)
				}
			}
		})
		.then(() => fsPromise.readdir(path.join(outputPath), { withFileTypes: true }))
		.then((copyFiles) => {
			for (file of copyFiles) {
				if (!sourseFilesNames.includes(file.name)) {
					fsPromise.rm(path.join(outputPath, file.name))
				}
			}
		})
}
copyDir(sourse, copyFiles)