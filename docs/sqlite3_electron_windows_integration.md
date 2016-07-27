# SQLite3 Electron windows integration

This guide is based on the very informative discussion in this article: [Using node_sqlite3 with Electron](http://verysimple.com/2015/05/30/using-node_sqlite3-with-electron/)


Install sqlite3
````
npm install sqlite3 --save
````

Navigate into the sqlite3 module folder
````
cd node_modules/sqlite3
````

Install nan locally into the sqlite3 folder (you will need it for the next step)
````
npm install nan@~2.2.0 --save
````

Prebulish the module:
````
npm run prepublish
````

Start compilation by setting the module path to the correct version, in this case `node-v47-win32-x64`. It is located in your sqlite3 folder.
````
node-gyp configure --module_name=node_sqlite3 --module_path=../lib/binding/node-v48-win32-x64
````
Finish compilation by setting your build to the correct `target` version. You will find the `target` version of your Electron-App in the `version` file in the root folder of your Electron directory.
````
node-gyp rebuild --target=1.1.1 --arch=x64 --target_platform=win32 --dist-url=https://atom.io/download/atom-shell --module_name=node_sqlite3 --module_path=../lib/binding/node-v48-win32-x64
````
Now you can use sqlite3 in your Electron app.

NEW MANUAL (Not working)

export npm_config_disturl=https://atom.io/download/atom-shell
export npm_config_target=1.2.7
export npm_config_arch=x64
export npm_config_runtime=electron
HOME=~/.electron-gyp npm install module-name



npm install --build-from-source --runtime=electron --target_arch=x64 --target=1.2.7



