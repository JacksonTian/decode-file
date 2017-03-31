#!/usr/bin/env node

'use strict';

const fs = require('fs');
const iconv = require('iconv-lite');
const {
  resolve,
  dirname,
  basename,
  extname
} = require('path');

const argv = process.argv.slice(2);

if (argv.length === 0) {
  console.log('usage:');
  console.log('    decode-file {filepath} {encoding}');
  process.exit(0);
}

const filepath = resolve(argv[0]);

const encoding = argv[1];

if (!iconv.encodingExists(encoding)) {
  console.error(`Unsupported encoding '${encoding}'.`);
  process.exit(-1);
}

var buff = fs.readFileSync(filepath);

var str = iconv.decode(buff, encoding);

const ext = extname(filepath);

var output = dirname(filepath) + '/' + basename(filepath, ext) + '.utf8' + extname(filepath);

fs.writeFileSync(output, str);

console.log(`Convert file ${filepath} to ${output} done.`);
