import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { compileReact, parse } from '@codedia/parser';

const sources = ['home', 'services', 'blog'];
const outputDirectory = join('ui', 'generated');

await mkdir(outputDirectory, { recursive: true });

for (const name of sources) {
  const source = await readFile(join('ui', `${name}.aui`), 'utf8');
  const document = parse(source);
  const react = compileReact(document);
  await writeFile(join(outputDirectory, `${name}.tsx`), react, 'utf8');
  console.log(`Compiled ui/${name}.aui`);
}
