'use strict';

const fs = require('fs');
const path = require('path');

function stat(filePath) {
   return new Promise((resolve, reject) => {
      fs.stat(filePath, (err, stats) => {
         if(err)
            return reject(err);
         else resolve(stats);
      });
   });
}

function readdir(scanPath, opts) {
   opts = opts || {};

   return new Promise((resolve, reject) => {
      fs.readdir(scanPath, opts, (err, files) => {
         if( err )
            return reject(err);
         else
            resolve(files);
      });
   });
}

async function readdirAdv(scanPath, opts) {
   opts = opts || {};
   opts = Object.assign({}, {
      withDir: false,
      recursive: true
   }, opts);

   let result = [];
   const files = await readdir(scanPath, opts);

   for(let file of files) {
      const item = {
         path: path.join(scanPath, file)
      };

      item.stats = await stat(item.path);

      if( item.stats.isDirectory() ) {
         if( opts.withDir )
            result.push(item);

         if( opts.recursive )
            result = result.concat(await readdirAdv(item.path, opts));
      } else
         result.push(item);
   }

   return result;
}

function readdirAdvSync(scanPath, opts) {
   opts = opts || {};
   opts = Object.assign({}, {
      withDir: false,
      recursive: true
   }, opts);

   let result = [];
   const files = fs.readdirSync(scanPath, opts);

   for(let file of files) {
      const item = {
         path: path.join(scanPath, file)
      };

      item.stats = fs.statSync(item.path);

      if( item.stats.isDirectory() ) {
         if( opts.withDir )
            result.push(item);

         if( opts.recursive )
            result = result.concat(readdirAdvSync(item.path, opts));
      } else
         result.push(item);
   }

   return result;
}

module.exports = readdirAdv;
module.exports.sync = readdirAdvSync;
