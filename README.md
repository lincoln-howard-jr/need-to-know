# need-to-know (NTK)
Dynamically generate polyfill bundles when needed


## Installation
```bash
  npm install --save lincoln-howard-jr/need-to-know
```

## Usage
NTK works by creating an express router with one route (/polyfills).
Scripts can be imported with a query in this format:
```html
  <script src="/polyfills?fill=id&fill=other_id"></script>
```

The modules are loaded from your project's `package.json`.
To map a ids to polyfills, add a polyfill object as such:
```json
  {
    polyfills: {
      "fetch": "node_modules/whatwg-fetch/fetch.js"
    }
  }
```
