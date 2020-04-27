const fs = require('fs');
let data = fs.readFileSync('./body_data.json', 'utf-8');
data = JSON.parse(data);
let info = [];
let temp = [];
let newData = [];
function float(number,n){
    if(isNaN(number)){
    return null;
    }else{
    var floatVar=parseFloat(number);//转换成浮点数
    var pow;//放大倍数
    if(isNaN(n)){
    pow=1;//按取整处理
    }else{
    if(n>0){
    pow=Math.pow(10,n);//10的N次方倍
    }else{
    pow=1;//按取整处理
    }
    }
    floatVar=floatVar * pow;//floatVar *1或者放大10的N次方倍(保留n位小数)
    floatVar=Math.round(floatVar);//四舍五入取整
    floatVar=Math.floor(floatVar) / pow;//还原
    return floatVar;
    }
    }
const compute = ({ height, data } = {}) => {

    let length = data.split('/')[0];
    let value = length / height;
    value = float(value,4)*100 + '';
    return value;
}
for (let i = 0; i < data.length; i++) {
    let name = data[i].name
    let value = compute(data[i])
    info.push({
        name,
        type: '',
        value,
        date: ''
    })
}

for (let i = 0; i < info.length - 1; i++) {
    for (let j = 0; j < info.length - 1 - i; j++) {
        if (parseFloat(info[j].value) > parseFloat(info[j + 1].value)) {
            [info[j], info[j + 1]] = [info[j + 1], info[j]]
        }
    }
}


let count = info.length
for (let i = 0; i < info.length; i++) {
    for (let k = 0; k < i + 1; k++) {
        temp.push({
            name: info[k].name,
            type: '',
            value: info[k].value,
            date: `${info.length - i}`
        }
        )
    }

    for (let j = 0; j < i + 1; j++) {
        newData.push(temp[j])

    }
    temp = []

}


// console.log(newData);

fs.writeFile('leg_percent_data.json', JSON.stringify(newData), (err) => {
    if (err) {
        console.log('write faild');
    } else {
        console.log('write saved');
    }
});




