'use strict';

const fs      = require('fs');
const path    = require('path');
const resolve = require('resolve').sync;

/**
 * Returns whether a file exists.
 *
 * @param {string} path A file path to check.
 *
 * @returns {boolean} True if the specified file exists, false otherwise.
 */
function fileExists(path) {
    let exists = false;

    try {
        exists = fs.statSync(path).isFile();
    } catch (err) {
        if (err.code !== 'ENOENT') {
            throw err;
        }
    }

    return exists;
}

/**
 * Returns whether a directory path is the npm package root.
 *
 * @param {string} dirPath A directory path to check.
 *
 * @returns {boolean} True if the specified path is the npm package root, false otherwise.
 */
function isPackageRootDir(dirPath) {
    return fileExists(path.join(dirPath, 'package.json'));
}

/**
 * Resolves and returns the path of a stylelint executable file path by a directory path.
 *
 * @param {string} baseDirPath A directory path to find stylelint executable files.
 *
 * @returns {(string|null)} The path of a stylelint executable file if exists, null if not exists.
 */
function resolveBin(baseDirPath) {
    const binPath     = path.join(baseDirPath, 'bin', 'stylelint.js');
    const distBinPath = path.join(baseDirPath, 'dist', 'cli.js');

    if (fileExists(binPath)) {
        return binPath;
    }

    if (fileExists(distBinPath)) {
        return distBinPath;
    }

    return null;
}

/**
 * Finds and returns the path of a stylelint executable file based on a directory path.
 *
 * The searching starts from the given base diretory to the ancestors until it finds a style executable file or
 * reaches the root directory.
 *
 * @param {string} baseDirPath A base directory path to find stylelint CLI files.
 *
 * @returns {(string|null)} The path of a stylelint executable file if exists, null if not exists.
 */
function findBin(baseDirPath) {
    let dirPath         = baseDirPath;
    let previousDirPath = null;

    while (dirPath !== previousDirPath) {
        const binPath = resolveBin(dirPath);

        if (binPath !== null) {
            return binPath
        }

        if (isPackageRootDir(dirPath)) {
            break
        }

        previousDirPath = dirPath;
        dirPath         = path.resolve(dirPath, '..');
    }

    return null;
}

/**
 * Resolves and returns the path of a stylelint module path by a module ID and directory path.
 *
 * @param {string} moduleId A module ID to find stylelint module files.
 * @param {string} baseDirPath A directory path to find stylelint module files.
 *
 * @returns {(string|null)} The path of a stylelint module file if exists, null if not exists.
 */
function resolveModule(moduleId, baseDirPath) {
    let path = null;

    try {
        path = resolve(moduleId, {basedir: baseDirPath});
    } catch (err) {
    }

    return path;
}

/**
 * Finds and returns the path of a stylelint module file based on a directory path.
 *
 * @param {string} baseDirPath A base directory path to find stylelint module files.
 *
 * @returns {(string|null)} The path of a stylelint module file if exists, null if not exists.
 */
function findModule(baseDirPath) {
    const binId     = 'stylelint/bin/stylelint.js';
    const distBinId = 'stylelint/dist/cli.js';

    return resolveModule(binId, baseDirPath) || resolveModule(distBinId, baseDirPath);
}

/**
 * Finds and returns the path of a stylelint CLI file based on a directory path.
 *
 * @param {string} baseDirPath A base directory path to find stylelint CLI files.
 *
 * @returns {(string|null)} The path of a stylelint CLI file if exists, null if not exists.
 */
function find(baseDirPath) {
    return findModule(baseDirPath) || findBin(baseDirPath);
}

module.exports = {
    find,
};
