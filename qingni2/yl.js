const puppeteer = require('puppeteer'),
    fs = require('fs');
const url = 'http://www.jzb48.com/qn_index.html';

(async () => {
    //启动浏览器
    const brower = await puppeteer.launch();
    // 开启一个新页面
    const page = await brower.newPage();
    //进去页面
    await page.goto(url);
    await page.waitForSelector('.tr-rank');
    let result = await page.evaluate(() => {
        // 拿到页面上的jQuery
        let $ = window.$;
        let members = $('.tr-rank');
        let infos = [];
        let date = new Date().toLocaleDateString();
        date = date.split('/')
        date[2] = (parseInt(date[2]) - 1) + '';
        date = date.join('/');
        if (members.length >= 1) {
            members.each((index, member) => {
                if (index < 16) {
                    let info = $(member);
                    let name = info.find('.rank-member').text();
                    let company = info.find('.rank-company').text();
                    let amount = info.find('.rank-total-amount').text();

                    infos.push({
                        name,
                        type: company,
                        value: amount,
                        date
                    })
                }
            });
        }
        return infos;
    });
    brower.close();
    result = JSON.stringify(result)
    fs.writeFile('./yl_data.json', result, (err) => {
        if (err) {
            console.log('write faild')
        } else {
            console.log('write saved')
        }
    })
})();