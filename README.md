```js
const readdir = require('readdir');

readdir('directory/path', {
   withDir: false,
   recursive: true,
   encoding: 'utf8'
}).then(items => {
   items.forEach(item => {
      console.log(item);

      // {
      //    path: <absolute path>,
      //    stats: <file stats>
      // }
   });
});

// sync
const items = readdir.sync('directory/path', opts);
```
