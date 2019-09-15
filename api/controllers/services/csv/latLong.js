const filePath = 'extra/latLong.csv';
const fs = require('fs');
const md5 = require('md5');
const { parse } = require('csv');
const Cache = require('../../../../cache');

const cache = Cache.instance();

function LatLong(long, lat) {
  this.lat = lat;
  this.long = long;
}

fs.readFile(filePath, (err, fileData) => {
  if (err) {
    console.log(err);
  } else {
    parse(fileData.toString(), {}, (e, data) => {
      data.forEach(d => {
        const key = getCoordKey(d[0], d[1]);
        cache.set(key, new LatLong(d[2], d[3]));
      });
    });
  }
});

function getLatLong(id, num, callback) {
  const key = getCoordKey(id, num);
  cache.get(key, (err, val) => {
    callback(err, val);
  });
}

function getCoordKey(id, num) {
  return md5(`locationId: ${id}, locationNum: ${num}`);
}

module.exports.getLatLong = getLatLong;
