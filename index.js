let express = require ('express');
let browserify = require ('browserify');
let bodyParser = require ('body-parser');

let parent = module.parent;
parent.pkg = parent.require ('./package.json');

let polyfills = parent.pkg.polyfills; 

function generate (arr) {
  let ret = browserify ();
  arr.forEach ((polyfill) => {
    if (polyfills [polyfill])
      ret.add (polyfills [polyfill]);
  });
  return ret;
}

let router = express.Router ();

router.use (bodyParser ());

router.get ('/polyfills', (req, res) => {
  let list = req.query.fill;
  if (!list) return res.status (400).end ();
  if (!list.length) list = [list];
  res.header ('Content-Type', 'application/javascript');
  generate (req.query.polyfills).bundle ().pipe (res)
});

module.exports = router;