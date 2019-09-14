var Cache = require('../../../../cache');
var cache = Cache.instance();
var filePath = 'extra/latLong.csv';
var fs = require('fs');
var md5 = require('md5');
var parse = require('csv').parse;

function LatLong(long, lat) {
  this.lat = lat;
  this.long = long;
}

fs.readFile(filePath, (err, fileData) => {
  if (err) {
    console.log(err);
  } else {
    parse(fileData.toString(), {}, (err, data) => {
      data.forEach(d => {
        var key = getCoordKey(d[0], d[1]);
        cache.set(key, new LatLong(d[2], d[3]));
      });
    });
  }
});

function getLatLong(id, num, callback) {
  var key = getCoordKey(id, num);
  cache.get(key, (err, val) => {
    callback(err, val);
  });
}

function getCoordKey(id, num) {
  return md5(`locationId: ${id}, locationNum: ${num}`);
}

module.exports.getLatLong = getLatLong;
