const fs = require('fs');
const path = require('path');
const os = require('os');

const HOME_DIR = os.homedir();
const MAIN_DIR = path.join(HOME_DIR, 'PATH_TO_DIR');

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

function deleteFilesWithTime(DIR_PATH) {

    fs.readdir(DIR_PATH, (err, files) => {

        files.forEach(filename => {

            if (fs.statSync(path.join(DIR_PATH, filename)).mtime.getTime() >= new Date().getTime() - 24 * 60 * 60 *1000) {
                const filepath = path.join(DIR_PATH, filename);

                fs.unlink(filepath, (err) => {
                    console.log(`Deleted ${filepath}`);
                })
            }

        });
    });
}

deleteFilesWithTime(MAIN_DIR);

function renameFiles(DIR_PATH) {

    fs.readdir(DIR_PATH, (err, files) => {
        files = files.map((filename) => {
            return {
                name: filename,
                time: fs.statSync(path.join(DIR_PATH, filename)).mtime.getTime()
            };
        }).sort((a, b) => {
            return a.time - b.time;
        }).map((value) => {
            return value.name;
        });

        let i = 1;
        files.forEach(file => {

            if (file.charAt(0) !== '.') {
                const ext = file.substr(file.lastIndexOf('.'));

                const oldpath = path.join(DIR_PATH, file);
                const newpath = path.join(DIR_PATH, String(i++) + ext);

                fs.rename(oldpath, newpath, (err) => {
                    console.log(`${oldpath} renamed to ${newpath}`)
                });
            }
        });
    });
}

// renameFiles(MAIN_DIR);