const fs = require('fs')
const path = require('path')

const folderPath = path.join(__dirname, 'secret-folder')

fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
	if (err) {
		console.log(err)
	}
	for (file of files) {
		if (file.isFile()) {
			const info = []
			const fullPath = path.join(file.path, file.name)
			info.push(path.parse(fullPath).name)
			info.push(path.parse(fullPath).ext.slice(1))
			const fileSize = new Promise((resolve, reject) => {
				fs.stat(fullPath, (err, stats) => {
					if (err) {
						console.log(err)
						reject(err)
					}
					resolve(stats.size / 1024 + 'kb')
				})
			})
			fileSize.then((data) => {
				info.push(data)
				console.log(info.join(' - '))
			})
		}
	}
})