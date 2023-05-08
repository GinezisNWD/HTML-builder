function copyDir() {
	const fsPromise = require('fs/promises')
	const path = require('path')
	fsPromise.mkdir(path.join(__dirname, 'copy-files'), { recursive: true })
		.then(() => fsPromise.readdir(path.join(__dirname, 'files'), { withFileTypes: true }))
		.then((files) => {
			for (file of files) {
				if (file.isFile()) {
					fsPromise.copyFile(path.join(__dirname, 'files', file.name), path.join(__dirname, 'copy-files', file.name))
				}
			}
		})
}
copyDir()