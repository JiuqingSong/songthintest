var fs = require("fs");
var path = require('path');
var mkdirp = require('mkdirp');
var dir = process.argv[2];
if (dir && dir != 'false') {
    dir = path.join(__dirname, 'dist', dir);
    mkdirp.sync(dir);
    console.log(`Target dir ${dir} created`);
    dir = path.join(dir, 'test.txt');
    fs.writeFileSync(dir, 'This is a test');
} else {
    console.log('No dir created');
}
