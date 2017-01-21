// Run some jQuery on a html fragment
var jsdom = require("jsdom");
var fs = require("fs");

var html = fs.readFileSync('mix.html', 'utf-8');

jsdom.env(
  html,
  [],
  function (err, window) {
    var everything = [... window.document.querySelectorAll('*') ];
    everything.filter(el => el).forEach(el => el.removeAttribute('style'))
    var page = `<!doctype html>${window.document.documentElement.outerHTML}`;

    fs.writeFile('mix2.html', page, (err) => {
      if (err) throw err;
      console.log('It’s saved!');
    });

  }
);
