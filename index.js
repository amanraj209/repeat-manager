const fs = require('fs');
const path = require('path');
const os = require('os');

const HOME_DIR = os.homedir();
const MAIN_DIR = path.join(HOME_DIR, 'PATH_TO_FOLDER');

function deleteFiles(DIR_PATH) {
    const files = fs.readdirSync(DIR_PATH);

    files.forEach(file => {
        if (file.charAt(0) !== '.') {

            const filepath = path.join(DIR_PATH, file);

            fs.stat(filepath, (err, stats) => {
                if (err) throw err;

                if (stats.isFile()) {
                    const isZip = new RegExp('.zip').test(filepath);

                    if (isZip) {
                        fs.unlink(filepath, (err) => {
                            console.log(`Deleted ${filepath}`);
                        })
                    }
                } else {
                    deleteFiles(filepath);
                }
            });
        }
    });
}

deleteFiles(MAIN_DIR);