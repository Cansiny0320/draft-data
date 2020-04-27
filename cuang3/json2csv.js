var fs = require('fs');
const Json2csvParser = require('json2csv').Parser;

let myData = fs.readFileSync('./super_sign_data.json', 'utf-8');

const json2csvParser = new Json2csvParser({ quote: '' });

const csv = json2csvParser.parse(JSON.parse(myData));
fs.writeFile("./data.csv", csv, function (err) {
    if (err) {
        return console.log(err);
    }

    console.log('write saved');
});