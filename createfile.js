var fs = require("fs");
var path = require('path');
var mkdirp = require('mkdirp');
var dir = process.argv[2];

console.log(`PR index = ${dir}`);

if (!dir || dir == 'false') {
    dir = 'default';
}

dir = path.join(__dirname, 'dist', dir);
mkdirp.sync(dir);
console.log(`Target dir ${dir} created`);
dir = path.join(dir, 'test.txt');
fs.writeFileSync(dir, 'This is a test');
console.log(`Target file ${dir} created`);
