/** server/controllers/qengine.ctrl.js*/
const fs = require('fs');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const crypto = require('crypto');
const path = require('path');

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



const decryptData = async (encrypted) => {
	// decrypt the plain text
	const decryptalgo = crypto.createDecipher('aes192', secrateKey);
    let decrypted = decryptalgo.update(encrypted, 'hex', 'utf8');
    decrypted += decryptalgo.final('utf8');
    return decrypted;
}


const storeDecoded = async (text, name) => {
	try {
		console.log("storeDecoded", name)
		fs.writeFileSync(path.join(__dirname, '../','decoded/',name),text);
	} catch (error) {
		log.error('storeDecoded', error.message);
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

	
decrypt: async () => {
    const dir = path.join(__dirname, '../', 'data/');
    const fileList = fs.readdirSync(dir);

    for (const file of fileList) {
        const name = `${dir}${file}`;

        try {
            const data = await readFileAsync(name, 'utf8');
            let plain = await decryptData(data);
			var newFilename = file.replace('.txt','_decoded.txt');
            storeDecoded(plain, newFilename);
        } catch (err) {
            log.error("decrypt", err.message);
        }
    }
}
}

