/** server/controllers/qengine.ctrl.js*/
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
var jsonexport = require('jsonexport');

// encryption key
const secrateKey = 'superS3cret!';


const {
	readFile
} = require('./readFile')
var https = require('https');
const SimpleNodeLogger = require('simple-node-logger'),
	opts = {
		logFilePath: 'logs/decrypt.log',
		timestampFormat: 'YYYY-MM-DD HH:mm:ss'
	},
	log = SimpleNodeLogger.createSimpleLogger(opts);

var configJSON;


const encryptData = async (text) => {
	// encrypt the plain text
	const encryptalgo = crypto.createCipher('aes192', secrateKey);
    let encrypted = encryptalgo.update(text, 'utf8', 'hex');
    encrypted += encryptalgo.final('hex');
    return encrypted;
}


const storeData = async (text, name) => {
	try {
		console.log("storeData", name)
		fs.writeFileSync(path.join(__dirname, '../','data/',name),text);
	} catch (error) {
		log.error('storeData', error.message);
	}
}

const getOptions = async () => {
	log.info('getOptions', "Init");
	return readFile()
	.then((resp) => {
		configJSON = JSON.parse(resp)

		return {
			hostname: configJSON.hostname,
			port: 4242,
			path: '',
			license: "/qrs/license?Xrfkey=abcdefghijklmnop",
			useraccesstype: "/qrs/license/useraccesstype/full?Xrfkey=abcdefghijklmnop",
			professionalaccesstype: "/qrs/license/professionalaccesstype/full?Xrfkey=abcdefghijklmnop",
			analyzertimeaccesstype: "/qrs/license/analyzertimeaccesstype/full?Xrfkey=abcdefghijklmnop",
			method: 'GET',
			headers: {
				'x-Qlik-Xrfkey': 'abcdefghijklmnop',
				'X-Qlik-User': configJSON.user
			},
			key: fs.readFileSync("C:\\ProgramData\\Qlik\\Sense\\Repository\\Exported Certificates\\.Local Certificates\\client_key.pem"),
			cert: fs.readFileSync("C:\\ProgramData\\Qlik\\Sense\\Repository\\Exported Certificates\\.Local Certificates\\client.pem"),
			ca: fs.readFileSync("C:\\ProgramData\\Qlik\\Sense\\Repository\\Exported Certificates\\.Local Certificates\\root.pem"),
		};
	})
}


module.exports = {
	getUserAccess: async () => {
		log.info('getUserAccess', "Init");
		const options = await getOptions()

		options.path = options.useraccesstype;
		https.get(options, function(results) {
			var body = '';
			results.on("data", function(chunk) {
				body += chunk;
			});
			results.on("end", async function(chunk) {
				try {
					log.info("getUserAccess", "data recieved");
					return jsonexport(JSON.parse(body),async function(err, csv){
						if(err) {
							log.error("getUserAccess", err.message);
							return err;
						}
						log.info("getUserAccess", "csv recieved");
						let encryoted = await encryptData(csv)
						log.info("getUserAccess", "data encrypted");
						storeData(encryoted,'useraccesstype.txt')
						log.info("getUserAccess", "data saved");
						return encryoted
					});
				} catch (err) {
					log.error('getUserAccess ', err);
					return err
				}
			});
		}).on('error', function(err) {
			log.error('getUserAccess ', e.message);
			return err
		});
	},
	getProffesional: async () => {
		log.info('getProffesional', "Init");
		const options = await getOptions()

		options.path = options.professionalaccesstype;
		https.get(options, function(results) {
			var body = '';
			results.on("data", function(chunk) {
				body += chunk;
			});
			results.on("end", async function(chunk) {
				try {
					return jsonexport(JSON.parse(body),async function(err, csv){
						if(err) {
							log.error("getProffesional", err.message);
							return err;
						}
						log.info("getProffesional", "csv recieved");
						let encryoted = await encryptData(csv)
						log.info("getProffesional", "data encrypted");
						storeData(encryoted,'professionalaccesstype.txt')
						log.info("getProffesional", "data saved");
						return encryoted
					});
				} catch (err) {
					log.error('getProffesional ', err);
					return err
				}
			});
		}).on('error', function(err) {
			log.error('getProffesional ', e.message);
			return err
		});
	},
	getAnalyzer: async () => {
		log.info('getAnalyzer', "Init");
		const options = await getOptions()

		options.path = options.analyzertimeaccesstype;
		https.get(options, function(results) {
			var body = '';
			results.on("data", function(chunk) {
				body += chunk;
			});
			results.on("end", async function(chunk) {
				try {
					return jsonexport(JSON.parse(body),async function(err, csv){
						if(err) {
							log.error("getAnalyzer", err.message);
							return err;
						}
						log.info("getAnalyzer", "csv recieved");
						let encryoted = await encryptData(csv)
						log.info("getAnalyzer", "data encrypted");
						storeData(encryoted,'analyzertimeaccesstype.txt')
						log.info("getAnalyzer", "data saved");
						return encryoted
					});
				} catch (err) {
					log.error('getAnalyzer ', err);
					return err
				}
			});
		}).on('error', function(err) {
			log.error('getAnalyzer ', e.message);
			return err
		});
	},
	getLicense: async () => {
		log.info('getLicense', "Init");
		const options = await getOptions()

		options.path = options.license;
		https.get(options, function(results) {
			var body = '';
			results.on("data", function(chunk) {
				body += chunk;
			});
			results.on("end", async function(chunk) {
				try {
					return jsonexport(JSON.parse(body),async function(err, csv){
						if(err) {
							log.error("getLicense", err.message);
							return err;
						}
						log.info("getLicense", "csv recieved");
						let encryoted = await encryptData(csv)
						log.info("getLicense", "data encrypted");
						storeData(encryoted,'license.txt')
						log.info("getLicense", "data saved");
						return encryoted
					});
				} catch (err) {
					log.error('getLicense ', err);
					return err
				}
			});
		}).on('error', function(err) {
			log.error('getLicense ', e.message);
			return err
		});
	},
}

