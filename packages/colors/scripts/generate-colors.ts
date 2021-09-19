import nodepath from 'path';
import nodefs from 'fs';
import mkdirp from 'mkdirp';
import { load, dump } from 'js-yaml';

const packageDir = nodepath.resolve(__dirname, '..');

if (!nodefs.existsSync(nodepath.join(packageDir, 'package.json'))) {
    throw new Error(`File "package.json" not found in ${packageDir}`);
}

const srcYamlFile = nodepath.resolve(packageDir, 'src/colors.yaml');

if (!nodefs.existsSync(srcYamlFile)) {
    throw new Error(`File "colors.yaml" not found in ${nodepath.dirname(srcYamlFile)}`);
}

const distDir = nodepath.resolve(packageDir, 'dist');

if (!nodefs.existsSync(distDir)) {
    mkdirp.sync(distDir);
}

const distJsonFile = nodepath.resolve(distDir, 'colors.json');
const distYamlFile = nodepath.resolve(distDir, 'colors.yaml');

const srcColors = load(nodefs.readFileSync(srcYamlFile, 'utf-8')) as any;

const colors = srcColors?.default || {};

nodefs.writeFileSync(distJsonFile, JSON.stringify(colors, null, 2));

nodefs.writeFileSync(distYamlFile, dump(colors, {
    noRefs: true,
}));
