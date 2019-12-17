module.exports = (api, opts) => {
    const fs = require('fs');
    const path = require('path');
    const contentMain = fs.readFileSync(path.resolve('../app.uncle.xml'), { encoding: 'utf-8' });
    fs.writeFileSync(path.resolve('../uncle-app')+'/uncle.config.js', "module.exports = {xmlConfig: `"+contentMain+"`}", { encoding: 'utf-8' });
};