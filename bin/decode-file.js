#!/usr/bin/env node

'use strict';

const path = require('path');
const fs = require('fs');
const iconv = require('iconv-lite');

const argv = process.argv.slice(2);

if (argv.length === 0) {
  console.log('usage: convert {filepath} {encoding}');
  process.exit(0);
}

var filepath = path.resolve(argv[0]);

var encoding = argv[1];

if (!iconv.encodingExists(encoding)) {
  console.error(`Unsupported encoding '${encoding}'.`);
  process.exit(-1);
}

var buff = fs.readFileSync(filepath);

var str = iconv.decode(buff, encoding);

var output = filepath + '.utf8';

fs.writeFileSync(output, str);

console.log(`Convert file ${filepath} to ${output} done.`);
