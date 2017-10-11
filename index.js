const fs = require('fs');
const path = require('path');
const os = require('os');

const HOME_DIR = os.homedir();
const MAIN_DIR = path.join(HOME_DIR, 'Desktop', 'repeat-manager', 'Mac');

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

// deleteFiles(MAIN_DIR);

function renameFiles(DIR_PATH) {
    const files = fs.readdirSync(DIR_PATH);

    files.sort();

    let i = 1;
    files.forEach(file => {
        const ext = file.substr(file.lastIndexOf('.'));

        const oldpath = path.join(DIR_PATH, file);
        const newpath = path.join(DIR_PATH, String(i++) + ext);

        fs.rename(oldpath, newpath, (err) => {
            console.log(`${oldpath} renamed to ${newpath}`)
        });
    });
}

renameFiles(MAIN_DIR);