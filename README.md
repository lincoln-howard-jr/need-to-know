# need-to-know (NtK)
Dynamically generate polyfill bundles when needed
Implementation of an idea by [Phillip Walton](https://philipwalton.com/about/)
...
[Read More](https://philipwalton.com/articles/loading-polyfills-only-when-needed/)

## Installation
```bash
  npm install --save lincoln-howard-jr/need-to-know
```

## Usage

NtK works by creating an express router with one route (/polyfills).
Scripts can be imported with a query in this format:
```html
  <script src="/polyfills?fill=id&fill=fetch"></script>
```

The modules are loaded according to your project's `package.json`.
To map a ids to polyfills, add a polyfill source as such:
```json
  {
    "polyfills": {
      "id": "path/to/the/polyfill",
      "fetch": "node_modules/whatwg-fetch/fetch.js"
    }
  }
```

Mount the polyfill router into express
```javascript
  let NtK = require ('need-to-know');
  // mount wherever you want, default is '/polyfills'
  app.use ('/js', NtK);
  // now it is /js/polyfills
```

Inside this module is the [client source](need-to-know.js).
Put this in your html file and do the following:

```javascript
  // the route we created
  NtK.base = '/js/polyfills';
  // must have fetch
  NtK.include (!window.fetch, 'fetch');
  // this will get the polyfills if needed
  NtK (() => {
    // do something!
  });
```