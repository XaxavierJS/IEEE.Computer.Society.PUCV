import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const projectRoot = process.cwd();

const targets = [
  { file: 'public/assets/About/IBC.webp', width: 1280 },
  { file: 'public/assets/Galeria/charla-colegio.jpeg', width: 1280 },
  { file: 'public/assets/Galeria/imagen-salida.jpg', width: 1280 },
  { file: 'public/assets/Galeria/rnr.jpg', width: 1280 },
  { file: 'public/assets/Galeria/ieeextreme-2024.jpeg', width: 1280 },
  { file: 'public/assets/Galeria/semifinal.JPG', width: 1280 },
  { file: 'public/assets/Galeria/final-design-thinking.jpeg', width: 1280 },
  { file: 'public/assets/Galeria/reunion-cs.jpg', width: 1280 },
  { file: 'public/assets/Activities/Networking.jpg', width: 1280 },
  { file: 'public/assets/Activities/design-thinking.jpeg', width: 1280 },
  { file: 'public/assets/Activities/design-thinking-clase.jpeg', width: 1280 },
  { file: 'public/assets/Footer/BlancoCompleto.webp', width: 900 },
  { file: 'public/assets/Navbar/logo-escuela-informatica-pucv.webp', width: 900 }
];

const formatByExt = (ext) => {
  const normalized = ext.toLowerCase();
  if (normalized === '.jpg' || normalized === '.jpeg') return 'jpeg';
  if (normalized === '.webp') return 'webp';
  throw new Error(`Formato no soportado: ${ext}`);
};

const optimize = async ({ file, width }) => {
  const absolutePath = path.join(projectRoot, file);
  const ext = path.extname(file);
  const format = formatByExt(ext);

  const before = await fs.stat(absolutePath);
  const inputBuffer = await fs.readFile(absolutePath);

  let pipeline = sharp(inputBuffer)
    .rotate()
    .resize({ width, fit: 'inside', withoutEnlargement: true });

  if (format === 'jpeg') {
    pipeline = pipeline.jpeg({ quality: 72, mozjpeg: true, progressive: true });
  } else if (format === 'webp') {
    pipeline = pipeline.webp({ quality: 72, effort: 5 });
  }

  const outputBuffer = await pipeline.toBuffer();
  await fs.writeFile(absolutePath, outputBuffer);

  const after = await fs.stat(absolutePath);
  const savedKb = ((before.size - after.size) / 1024).toFixed(1);
  const beforeKb = (before.size / 1024).toFixed(1);
  const afterKb = (after.size / 1024).toFixed(1);

  return `${file}: ${beforeKb} KB -> ${afterKb} KB (ahorro ${savedKb} KB)`;
};

const run = async () => {
  const results = [];

  for (const target of targets) {
    try {
      results.push(await optimize(target));
    } catch (error) {
      results.push(`${target.file}: ERROR ${error.message}`);
    }
  }

  console.log('Optimización de imágenes completada:\n');
  results.forEach((line) => console.log(`- ${line}`));
};

run();
