const fs = require('fs');



const checkLogsFolder = async () => {
	if (!fs.existsSync('./logs')) {
		return fs.mkdirSync('./logs');
	} else {
		return true
	}
}
const checkDataFolder = async () => {
	if (!fs.existsSync('./data')) {
		return fs.mkdirSync('./data');
	} else {
		return true
	}
}
const checkDecodedFolder = async () => {
	if (!fs.existsSync('./decoded')) {
		return fs.mkdirSync('./decoded');
	} else {
		return true
	}
}

const initServer = async () => {
	await checkLogsFolder()
    await checkDataFolder()
	await checkDecodedFolder();

	const { decrypt } = require('./middleware/decryptData');

	const SimpleNodeLogger = require('simple-node-logger'),
		opts = {
			logFilePath: 'logs/decrypt.log',
			timestampFormat: 'YYYY-MM-DD HH:mm:ss'
		},
		log = SimpleNodeLogger.createSimpleLogger(opts);



	log.info(`Starting decrypt`)
	console.log(`
	#######################################################
	###  decryptQlikSenseLicenseInformation v 1.0   	###
	#######################################################
	`)

	await decrypt();

}

initServer()