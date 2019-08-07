var exec = require('child_process').execSync;
var path = require('path');
var fs = require('fs');


var packageJsonFilePath = path.join(__dirname, 'package.json');
var content = fs.readFileSync(packageJsonFilePath);
var packageJson = JSON.parse(content);
var packageName = packageJson.name;
var packageVersion = packageJson.version.trim();
var lastVersion = exec(`npm show ${packageName} version`).toString().trim();
var needPublish = packageVersion != lastVersion

console.log('Package name: ' + packageName);
console.log('Current version: ' + packageVersion);
console.log('Last version: ' + lastVersion);
console.log('Need publish: ' + needPublish);

var token = process.argv[2];

if (needPublish) {
    var npmrcName = path.join(__dirname, '.npmrc');
    var npmrc = fs.readFileSync(npmrcName).toString();
    npmrc += `\n//registry.npmjs.org/:_authToken=${token}\n`;
    fs.writeFileSync(npmrcName, npmrc);

    exec('npm publish', {
        stdio: 'inherit',
        cwd: __dirname
    })
}