const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const CONTENT_DIR = 'src/pulse/content/docs';

function getTrackedFiles(dir) {
    return execSync(`git ls-files -- "${dir}"`, { encoding: 'utf8' })
        .trim()
        .split('\n')
        .filter(Boolean);
}

function getLastModified(filePath) {
    try {
        return execSync(
            `git log -1 --format="%aI" -- "${filePath}"`,
            { encoding: 'utf8' }
        ).trim() || null;
    } catch {
        return null;
    }
}

const files = getTrackedFiles(CONTENT_DIR);
const dates = {};

for (const file of files) {
    const date = getLastModified(file);
    if (date) dates[file] = date;
}

const outPath = path.join(process.cwd(), 'src/pulse/git-dates.json');
fs.writeFileSync(outPath, JSON.stringify(dates, null, 2));