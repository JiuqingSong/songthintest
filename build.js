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

if (needPublish) {
    exec('npm publish', {
        stdio: 'inherit',
        cwd: __dirname
    })
}