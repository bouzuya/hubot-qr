// Description
//   A Hubot script that returns a qr code
//
// Configuration:
//   HUBOT_QR_BASE_URL
//
// Commands:
//   hubot qr <keyword> - returns a qr code
//
// Author:
//   bouzuya <m@bouzuya.net>
//
module.exports = function(robot) {
  var BASE_URL, concat, qr;
  qr = require('qr-image');
  concat = require('concat-stream');
  robot.router.get(/\/hubot-qr\/(.+)/, function(req, res) {
    var keyword, stream;
    keyword = req.params[0];
    stream = qr.image(keyword);
    return stream.pipe(concat(function(png) {
      res.set('Content-Type', 'image/png');
      return res.send(png);
    }));
  });
  BASE_URL = process.env.HUBOT_QR_BASE_URL;
  return robot.respond(/qr (.+)$/i, function(res) {
    return res.send(BASE_URL + '/hubot-qr/' + res.match[1]);
  });
};
