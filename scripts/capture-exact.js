const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function captureFrames() {
  const framesDir = path.join(__dirname, 'frames-exact');
  if (fs.existsSync(framesDir)) {
    fs.rmSync(framesDir, { recursive: true });
  }
  fs.mkdirSync(framesDir);
  
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 200, height: 200 });
  
  const htmlPath = path.join(__dirname, 'logo-exact.html');
  await page.goto(`file://${htmlPath}`);
  
  // Capture 45 frames over 1.5 seconds (30fps)
  // Animation completes at ~1.4s (0.1 + 0.5 + 0.4 + 0.4)
  const totalFrames = 45;
  const frameInterval = 1500 / totalFrames; // ~33ms per frame
  
  for (let i = 0; i < totalFrames; i++) {
    await page.screenshot({
      path: path.join(framesDir, `frame_${String(i).padStart(3, '0')}.png`),
      omitBackground: true
    });
    await new Promise(r => setTimeout(r, frameInterval));
  }
  
  await browser.close();
  console.log(`Captured ${totalFrames} frames to ${framesDir}`);
}

captureFrames();
