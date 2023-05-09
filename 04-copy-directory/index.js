function copyDir() {
	const fsPromise = require('fs/promises')
	const path = require('path')
	const sourseFilesNames = []
	fsPromise.mkdir(path.join(__dirname, 'copy-files'), { recursive: true })
		.then(() => fsPromise.readdir(path.join(__dirname, 'files'), { withFileTypes: true }))
		.then((files) => {
			for (file of files) {
				if (file.isFile()) {
					fsPromise.copyFile(path.join(__dirname, 'files', file.name), path.join(__dirname, 'copy-files', file.name))
					sourseFilesNames.push(file.name)
				}
			}
		})
		.then(() => fsPromise.readdir(path.join(__dirname, 'copy-files'), { withFileTypes: true }))
		.then((copyFiles) => {
			for (file of copyFiles) {
				if (!sourseFilesNames.includes(file.name)) {
					fsPromise.rm(path.join(file.path, file.name))
				}
			}
		})
}
copyDir()