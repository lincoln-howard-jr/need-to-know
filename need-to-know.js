// Need to Know
// load polyfills if necessary
var NtK = function (cb) {
  // no need for polyfills, call the callback
  if (!NtK.deps.length) {
    return cb ();
  }
  var js = document.createElement ('script');
  js.src = NtK.base + '/?fill=' + NtK.deps.join ('&fill=');
  js.onload = cb;
  document.head.appendChild (js);
}
// change as needed
NtK.base = '/polyfills';
// dependency list, don't mess with this on your own
NtK.deps = [];
// conditionally add dependecies
NtK.include = (condition, src) => {
  if (condition) NtK.deps.push (src);
}