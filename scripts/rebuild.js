/*
 *
 *  Auto Rebuild Tool
 *
 * */
[
  ['warn', '\x1b[35m'],
  ['error', '\x1b[31m'],
  ['log', '\x1b[2m']
].forEach(function (pair) {
  var method = pair[0], reset = '\x1b[0m', color = '\x1b[36m' + pair[1];
  console[method] = console[method].bind(console, color, method.toUpperCase(), reset);
});

const electron = '1.3.3',
  path = require('path'),
  fs = require('fs'),
  log = true,
  // exec = require('child_process').exec,
  spawn = require('child_process').spawn,
  sqlite3 = path.resolve(__dirname, '../node_modules/sqlite3/'),
  isExist = (path) => {
    try {
      fs.accessSync(path, fs.F_OK);
      return true;
    } catch (e) {
      return false;
    }
  },
  os = process.platform;

let npm, rmdir;

if (isExist(sqlite3)) {
  console.log('Try to remove sqlite3 from directory node_modules...');
  rmdir = spawn('rm', ['-rf', sqlite3]);

  if (log) {
    rmdir.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    rmdir.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    rmdir.on('close', (code) => {
      console.log(`Directory deleted. Spawn code ${code}`);
    });
  }
}

switch (os) {
  case 'darwin':
    npm = spawn('npm', [
      'install',
      '--S',
      'sqlite3',
      '--build-from-source',
      '--runtime=electron',
      '--dist-url=https://atom.io/download/atom-shell',
      '--target_arch=x64',
      `--target=${electron}`
    // '--sqlite=/usr/local/bin/sqlite3'
    ], {
      cwd: path.resolve(__dirname, '..'),
      shell: true
    });
    break;
  case 'win32':
    break;
  default:
    console.error('Unknown OS detected. Rebuild failed.');
}

if (npm) {
  if (log) {
    npm.stdout.on('data', (data) => {
      console.log(`${data}`);
    });

    npm.stderr.on('data', (data) => {
      console.error(`${data}`);
    });

    npm.on('error', (error) => {
      console.error(`${error}`);
    });

    npm.on('close', (code) => {
      console.log(`Rebuild finished. Code ${code}`);
    });
  }
}
