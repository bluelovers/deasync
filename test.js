var deasync = require('./index.js');
var cp = require('child_process');
var http = require('http');

var exec = deasync(cp.exec);

var sleep = deasync(function (timeout, done) {
  setTimeout(done, timeout);
});

var request = deasync(function (url, done) {
  http.get(url, function (res) {
    res.on('error', done);

    res.setEncoding('utf8');

    var result = ''

    res.on('data', function (data) { result += data; });
    res.on('end', function () { done(null, result); });
  }).on('error', done);
});


setTimeout(function () {
  console.log('async');
}, 1000);

console.log(exec('ls -la'));
sleep(2000);
console.log(request('http://nodejs.org'));

function sleepAsync(time) {
	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			resolve()
		}, time)
	})
}
async function trim(str) {
	await sleepAsync(2000)
	return str.trim()
}

console.log(deasync.await(trim('       hello       ')))

try {
  deasync.await(Promise.reject("Should result in exception"));
} catch(e) {
  console.log("Got expected exception:", e);
}
