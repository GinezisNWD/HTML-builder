const fsPromise = require('fs/promises')
const path = require('path')

const projectDistPath = path.join(__dirname, 'project-dist')

const sourseIndexHTMLPath = path.join(__dirname, 'template.html')
const bundleIndexHTMLPath = path.join(__dirname, 'project-dist', 'index.html')
const componentHTMLPath = path.join(__dirname, 'components')

const sourseStylePath = path.join(__dirname, 'styles')
const bundleStylePath = path.join(__dirname, 'project-dist', 'style.css')

const assetsProjectDistPath = path.join(__dirname, 'project-dist', 'assets')
const assetsPath = path.join(__dirname, 'assets')


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

fsPromise.mkdir(projectDistPath, { recursive: true })
	.then(() => fsPromise.readFile(sourseIndexHTMLPath, { encoding: 'utf-8' }))
	.then((data) => {
		let content = data
		const regexp = /{{(.*?)}}/g
		const matchAll = content.match(regexp)
		matchAll.forEach(elem => {
			fsPromise.readFile(path.join(componentHTMLPath, elem.replace(/[{})]/g, '') + '.html'), { encoding: 'utf-8' })
				.then(component => {
					content = content.replace(elem, component)
				})
				.then(() => {
					fsPromise.writeFile(bundleIndexHTMLPath, content)
				})
		})
	})
	.then(() => { mergeStyles(sourseStylePath, bundleStylePath) })
	.then(() => { fsPromise.mkdir(assetsProjectDistPath, { recursive: true }) })
	.then(() => fsPromise.readdir(assetsPath, { withFileTypes: true }))
	.then((files) => {
		for (file of files) {
			if (file.isDirectory()) {
				copyDir(path.join(assetsPath, file.name), path.join(assetsProjectDistPath, file.name))
			}
		}
	})

