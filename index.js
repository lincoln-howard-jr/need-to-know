// imports
let express = require ('express');
let browserify = require ('browserify');
// get parent package.json
let parent = module.parent;
parent.pkg = parent.require ('./package.json');
// polyfill list must be defined
let polyfills = parent.pkg.polyfills;
// bundle polyfills with browserify
function generate (arr) {
  let ret = browserify ();
  arr.forEach ((polyfill) => {
    if (polyfills [polyfill])
      ret.add (polyfills [polyfill]);
  });
  return ret;
}
// express middleware
let router = express.Router ();
// the end -- polyfill requests in the query are bundled and sent back
router.get ('/polyfills', (req, res) => {
  let list = req.query.fill;
  if (!list) return res.status (400).end ();
  if (!Array.isArray (list)) list = [list];
  console.log (list);
  res.header ('Content-Type', 'application/javascript');
  generate (list).bundle ().pipe (res)
});
// export the router, can be mounted anywhere
module.exports = router;