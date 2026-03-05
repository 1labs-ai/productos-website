const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function captureFrames() {
  const framesDir = path.join(__dirname, 'frames');
  if (!fs.existsSync(framesDir)) fs.mkdirSync(framesDir);
  
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 300, height: 300 });
  
  const htmlPath = path.join(__dirname, 'generate-logo-gif.html');
  await page.goto(`file://${htmlPath}`);
  
  // Capture 60 frames over 2 seconds (30fps)
  const totalFrames = 60;
  const duration = 2000;
  const interval = duration / totalFrames;
  
  for (let i = 0; i < totalFrames; i++) {
    await page.screenshot({
      path: path.join(framesDir, `frame_${String(i).padStart(3, '0')}.png`),
      omitBackground: true
    });
    await new Promise(r => setTimeout(r, interval));
  }
  
  await browser.close();
  console.log(`Captured ${totalFrames} frames to ${framesDir}`);
  console.log('Run: ffmpeg -framerate 30 -i frames/frame_%03d.png -vf "split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" logo-animated.gif');
}

captureFrames();
