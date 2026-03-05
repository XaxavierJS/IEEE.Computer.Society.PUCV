import sharp from 'sharp';

const targets = [
  ['public/assets/About/IBC.webp', 'public/assets/About/IBC-768.webp', 768, 'webp'],
  ['public/assets/Activities/design-thinking-clase.jpeg', 'public/assets/Activities/design-thinking-clase-768.jpeg', 768, 'jpeg'],
  ['public/assets/Activities/design-thinking.jpeg', 'public/assets/Activities/design-thinking-768.jpeg', 768, 'jpeg'],
  ['public/assets/Activities/Networking.jpg', 'public/assets/Activities/Networking-768.jpg', 768, 'jpeg'],
  ['public/assets/Galeria/reunion-cs.jpg', 'public/assets/Galeria/reunion-cs-768.jpg', 768, 'jpeg'],
  ['public/assets/Galeria/rnr.jpg', 'public/assets/Galeria/rnr-768.jpg', 768, 'jpeg'],
  ['public/assets/Galeria/ieeextreme-2024.jpeg', 'public/assets/Galeria/ieeextreme-2024-768.jpeg', 768, 'jpeg'],
  ['public/assets/Galeria/imagen-salida.jpg', 'public/assets/Galeria/imagen-salida-768.jpg', 768, 'jpeg'],
  ['public/assets/Galeria/semifinal.JPG', 'public/assets/Galeria/semifinal-768.jpg', 768, 'jpeg'],
  ['public/assets/Galeria/charla-colegio.jpeg', 'public/assets/Galeria/charla-colegio-768.jpeg', 768, 'jpeg'],
  ['public/assets/Galeria/final-design-thinking.jpeg', 'public/assets/Galeria/final-design-thinking-768.jpeg', 768, 'jpeg'],
  ['public/assets/Navbar/logo-escuela-informatica-pucv.webp', 'public/assets/Navbar/logo-escuela-informatica-pucv-320.webp', 320, 'webp'],
  ['public/assets/Footer/BlancoCompleto.webp', 'public/assets/Footer/BlancoCompleto-480.webp', 480, 'webp']
];

for (const [input, output, width, format] of targets) {
  let pipeline = sharp(input).rotate().resize({ width, fit: 'inside', withoutEnlargement: true });
  pipeline = format === 'webp'
    ? pipeline.webp({ quality: 72, effort: 5 })
    : pipeline.jpeg({ quality: 72, mozjpeg: true, progressive: true });

  await pipeline.toFile(output);
  console.log(`ok ${output}`);
}
