const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

(async () => {
  const framesDir = path.join(__dirname, 'frames');
  if (!fs.existsSync(framesDir)) fs.mkdirSync(framesDir);
  
  // Clean old frames
  fs.readdirSync(framesDir).forEach(f => fs.unlinkSync(path.join(framesDir, f)));
  
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 200, height: 200 });
  
  const htmlPath = path.join(__dirname, 'capture-animation.html');
  await page.goto(`file://${htmlPath}`);
  
  // Capture 60 frames over 2 seconds (30fps)
  const totalFrames = 60;
  const duration = 2000; // ms
  const interval = duration / totalFrames;
  
  for (let i = 0; i < totalFrames; i++) {
    await page.screenshot({ 
      path: path.join(framesDir, `frame_${String(i).padStart(3, '0')}.png`),
      omitBackground: false
    });
    await new Promise(r => setTimeout(r, interval));
  }
  
  await browser.close();
  
  // Use ffmpeg to create GIF
  execSync(`ffmpeg -y -framerate 30 -i ${framesDir}/frame_%03d.png -vf "fps=30,scale=200:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" ${__dirname}/productos-logo-animation.gif`);
  
  console.log('GIF created: productos-logo-animation.gif');
})();
