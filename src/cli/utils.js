"use strict";

const { promises: fs } = require("fs");

// eslint-disable-next-line no-restricted-modules
const { default: sdbm } = require("../../vendors/sdbm.js");

// eslint-disable-next-line no-console
const printToScreen = console.log.bind(console);

/**
 * @param {string} source
 * @returns {string}
 */
function createHash(source) {
  return String(sdbm(source));
}

/**
 * Get stats of a given path.
 * @param {string} filePath The path to target file.
 * @returns {Promise<import('fs').Stats | undefined>} The stats.
 */
async function statSafe(filePath) {
  try {
    return await fs.stat(filePath);
  } catch (error) {
    /* istanbul ignore next */
    if (error.code !== "ENOENT") {
      throw error;
    }
  }
}

module.exports = { printToScreen, createHash, statSafe };
