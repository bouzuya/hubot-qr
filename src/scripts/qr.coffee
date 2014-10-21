# Description
#   A Hubot script that returns a qr code
#
# Configuration:
#   HUBOT_QR_BASE_URL
#
# Commands:
#   hubot qr <keyword> - returns a qr code
#
# Author:
#   bouzuya <m@bouzuya.net>
#
module.exports = (robot) ->
  qr = require 'qr-image'
  concat = require 'concat-stream'

  robot.router.get /\/hubot-qr\/(.+)/, (req, res) ->
    keyword = req.params[0]
    stream = qr.image keyword
    stream.pipe concat (png) ->
      res.set 'Content-Type', 'image/png'
      res.send png

  BASE_URL = process.env.HUBOT_QR_BASE_URL

  robot.respond /qr (.+)$/i, (res) ->
    res.send BASE_URL + '/hubot-qr/' + res.match[1]
