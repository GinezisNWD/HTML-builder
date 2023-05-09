const fsPromise = require('fs/promises')
const path = require('path')
const bundleCssPath = path.join(__dirname, 'project-dist', 'bundle.css')

fsPromise.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), '')
	.then(() => fsPromise.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }))
	.then((data) => {
		const files = data.filter(elem => elem.name.endsWith('.css'))
		for (file of files) {
			fsPromise.readFile(path.join(file.path, file.name), { encoding: 'utf-8' })
				.then(data => { fsPromise.appendFile(bundleCssPath, data) })
		}
	})