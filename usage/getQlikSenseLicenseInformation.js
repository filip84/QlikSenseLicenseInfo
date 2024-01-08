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



const initServer = async () => {
	await checkLogsFolder()
    await checkDataFolder()
	const { getAnalyzer, getProffesional, getLicense, getUserAccess } = require('./middleware/encryptData');

	const SimpleNodeLogger = require('simple-node-logger'),
		opts = {
			logFilePath: 'logs/usage.log',
			timestampFormat: 'YYYY-MM-DD HH:mm:ss'
		},
		log = SimpleNodeLogger.createSimpleLogger(opts);


	

	log.info(`Starting usage`)
	console.log(`
	#######################################################
	###     getQlikSenseLicenseInformation v 1.0      	###
	#######################################################
	`)

	await getUserAccess();
	await getProffesional()
	await getAnalyzer()
	await getLicense()

}

initServer()