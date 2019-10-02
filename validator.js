var fs = require('fs');
var x = require('./node_modules/libxmljs');

// The XML file to be tested
const xmlFile = __dirname + '/xml/testPass.xml';
// The XSD file to test the XML against 
const xsdFile = __dirname + '/xsd/test.xsd';

function getData(fileName, type = 'utf8') {
	return new Promise((resolve, reject) => {
		fs.readFile(fileName, type, (err, data) => {
			err ? reject(err) : resolve(data);
		});
	});
}

const xsdPromise = getData(xsdFile)
	.then(xsd => x.parseXmlString(xsd))
	.catch(err => console.log(`XSD Read file error: ${err}`));

const xmlPromise = getData(xmlFile)
	.then(xml => x.parseXmlString(xml))
	.catch(err => console.log(`XML Read file error: ${err}`));
	
Promise.all([xsdPromise, xmlPromise])
	.then(values => console.log("XML Validation Success:", values[1].validate(values[0])))
	.catch(err => console.log(`Validation ${err}`));
