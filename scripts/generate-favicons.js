import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import toIco from 'to-ico';

async function generateFavicons() {
  const publicDir = path.resolve('public');
  const svgPath = path.join(publicDir, 'favicon.svg');

  console.log('Reading favicon.svg...');
  const svgBuffer = fs.readFileSync(svgPath);

  // Generate PNG sizes
  const sizes = [
    { name: 'favicon-16x16.png', width: 16, height: 16 },
    { name: 'favicon-32x32.png', width: 32, height: 32 },
    { name: 'apple-touch-icon.png', width: 180, height: 180, bg: '#ffffff' },
    { name: 'icon-192.png', width: 192, height: 192 },
    { name: 'icon-512.png', width: 512, height: 512 },
  ];

  for (const { name, width, height, bg } of sizes) {
    let pipeline = sharp(svgBuffer).resize(width, height);
    if (bg) {
      pipeline = pipeline.flatten({ background: bg });
    }
    const outBuffer = await pipeline.png().toBuffer();
    fs.writeFileSync(path.join(publicDir, name), outBuffer);
    console.log(`Generated ${name} (${width}x${height})`);
  }

  // Generate multi-resolution ICO file (16x16, 32x32, 48x48)
  const ico16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();
  const ico32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  const ico48 = await sharp(svgBuffer).resize(48, 48).png().toBuffer();

  const icoBuffer = await toIco([ico16, ico32, ico48]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('Generated favicon.ico (multi-resolution 16x16, 32x32, 48x48)');

  console.log('All favicons successfully generated!');
}

generateFavicons().catch((err) => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
