const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const logoPath = path.join(publicDir, 'LogoCS.png');
const faviconPath = path.join(publicDir, 'favicon.svg');

try {
  const logoBuffer = fs.readFileSync(logoPath);
  const base64Logo = logoBuffer.toString('base64');
  
  const width = 900;
  const height = 430;
  const canvasSize = 900;
  const y = (canvasSize - height) / 2;
  
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${canvasSize} ${canvasSize}">
  <image width="${width}" height="${height}" y="${y}" href="data:image/png;base64,${base64Logo}" />
</svg>`;

  fs.writeFileSync(faviconPath, svgContent);
  console.log('Favicon generated successfully at ' + faviconPath);
} catch (error) {
  console.error('Error generating favicon:', error);
  process.exit(1);
}
