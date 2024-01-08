
const fs = require('fs')
const path = require('path')
const configPath = path.join(__dirname,'../','config.json');

const readFile = (opts = 'utf8') =>
	new Promise((resolve, reject) => {
		fs.readFile(configPath, opts, (err, data) => {
			if (err) reject(err)
			else resolve(data)
		})
})

module.exports = { readFile };