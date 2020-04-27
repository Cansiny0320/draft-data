const puppeteer = require('puppeteer');
const fs = require('fs');

const url = 'http://m.chinaindex.net/home/2/4258/1/4/2';

(async () => {
  const brower = await puppeteer.launch({
    args: ['--no-sandbox'],
    dumpio: false,
  });
    // 开启一个新页面
  const page = await brower.newPage();
  // 进去页面
  await page.goto(url, {
    waitUntil: 'networkidle2', // 网络空闲说明已加载完毕
  });
  await page.waitForSelector('.list-item');
  let result = await page.evaluate(() => {
    const names = document.querySelectorAll('.actor-name');
    const fansArr = document.querySelectorAll('.list-item-cell.primary-val');
    const time = document.querySelector('.lastest-time__textright').innerText;
    const date = `2020/${time.slice(6, 7)}/${time.slice(8, 10)}`;
    const infos = [];
    if (names.length >= 1) {
      for (let i = 0; i < 16; i++) {
        const name = names[i].innerText;
        let fans = fansArr[i].innerText;
        fans = fans.replace(',', '');
        infos.push({
          name,
          type: '',
          value: fans,
          date,
        });
      }
    }
    return infos;
  });
  brower.close();
  result = JSON.stringify(result);
  fs.writeFile('./aiman_data.json', result, (err) => {
    if (err) {
      console.log('write faild');
    } else {
      console.log('write saved');
    }
  });
})();
