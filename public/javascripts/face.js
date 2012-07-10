// Face.com API wrapper

var rest = require('restler')
  , config = require('./config.js');

var api = {

  get: function(url, cb) {
    rest.get( this.buildUrl(url) ).on('complete', function(data) {
      if (data) { // no error
        cb(null, data);
      } else {
        cb ('error');
      }
    });
  },

  buildUrl: function(url) {
    return 'http://api.face.com/faces/detect.json?api_key=' +
      config.keys.face.api_key + '&api_secret=' + config.keys.face.api_secret +
      '&urls=' + url;
  }
};

module.exports.api = api;