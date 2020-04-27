const https = require('https');
const fs = require('fs');
https.get('https://api.aiiuii.com/v3/variety/all?pid=youth', function (response) {
    let json = ''
    var body = [];
    let info = [];
    let data = []
    let str = ''
    let date = new Date().toLocaleDateString();
    date = date.split('-')
    date[2] = (parseInt(date[2]) - 1) + '';
    date = date.join('/');
    response.on('data', function (chunk) {
        body.push(chunk);
    });

    response.on('end', function () {
        body = Buffer.concat(body);
        json = JSON.parse(body.toString()).data.list;
        for (let i = 0; i < json.length; i++) {
            let name = json[i].name;
            let signs = json[i].topic.sign;
            str += json[i].weibo_id + ","
            info.push({
                name,
                type: '',
                value: signs,
                date
            });
        }
        //排序
        for (let i = 0; i < info.length - 1; i++) {
            for (let j = 0; j < info.length - 1 - i; j++) {
                if(parseInt(info[j].value) < parseInt(info[j+1].value)) {
                    [info[j],info[j+1]] = [info[j+1],info[j]]
                }
            }
        }
        
        for(let i=0;i<16;i++) {
            data.push(info[i])
        }
        // console.log(data);
        fs.writeFile('./super_sign_data.json', JSON.stringify(data), (err) => {
            if (err) {
                console.log('write faild');
            } else {
                console.log('write saved');
            }
        });

    });


});






