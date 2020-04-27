const https = require('https');
const fs = require('fs');
https.get('https://api.aiiuii.com/v3/variety/all?pid=youth', function (response) {
    let json = ''
    var body = [];
    let info = [];
    let data = [];
    let temp = [];
    let str = ''
    response.on('data', function (chunk) {
        body.push(chunk);
    });

    response.on('end', function () {
        body = Buffer.concat(body);
        json = JSON.parse(body.toString()).data.list;
        for (let i = 0; i < 108; i++) {
            let name = json[i].name;
            let signs = json[i].super_sign;
            str += json[i].weibo_id + ","
            info.push({
                name,
                type: '',
                value: signs,
                date: "2020/3/22"
            });
        }
        //排序
        for (let i = 0; i < info.length - 1; i++) {
            for (let j = 0; j < info.length - 1 - i; j++) {
                if (parseInt(info[j].value) > parseInt(info[j + 1].value)) {
                    [info[j], info[j + 1]] = [info[j + 1], info[j]]
                }
            }
        }
        let count = 107
        for (let i = 0; i < 107; i++) {
            for (let k = 0; k < i + 1; k++) {
                temp.push({
                    name: info[k].name,
                    type: '',
                    value: info[k].value,
                    date: `${107 - i}`
                }
                )
            }

            for (let j = 0; j < i + 1; j++) {
                data.push(temp[j])
                
            }
            temp = []

        }

        // console.log(data);
        fs.writeFile('super_sign_all_data.json', JSON.stringify(data), (err) => {
            if (err) {
                console.log('write faild');
            } else {
                console.log('write saved');
            }
        });

    });


});






