const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const phones = ['Microsoft Lumia 950', 'iPhone 4', 'iPhone 6 Plus', 'Nokia Lumia 520', 'Galaxy S5' ];
const mkdirp = require('mkdirp');
const time = Date.now();
const path = "./screenshots_" + time;

const argv = require('yargs')
	.usage('Usage:\n-u [url]: Enter the URL you want to screenshot'
    + '\n' +'-v [viewport]: Enter desktop or mobile')
  
	.demand(['u', 'v'])
	.argv;

const url = argv.u;

mkdirp(path, (err) => {
	if(err) console.error(err);
});


if(argv.v === 'mobile'){
  phones.forEach(function(requestedDevice){
  (async () => {
  const browser = await puppeteer.launch({
    timeout: 60000
  });
  const page = await browser.newPage();
  await page.emulate(requestedDevice);
  await page.goto(url);
  await page.screenshot({
  path: path + "/" + requestedDevice +'.png',
  fullPage: true
  });
  console.log(":camera: Took screenshot with: " + requestedDevice + " :camera:");
  browser.close();
  
      })();
    }); 
  }else{
    (async () => {
      const browser = await puppeteer.launch({
      timeout: 60000
    });
      const page = await browser.newPage();
      await page.goto(url);
      await page.screenshot({
        path: path + '/page.png',
        fullPage: true
        });
  console.log(":camera: Took screenshot" + ":camera:");
  browser.close();
  
      })();
  }

