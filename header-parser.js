var userAgentParser = require('user-agent-parser');

/*  Obtain client's IP address following this workaround
    for dealing with Heroku's internal routing system:
    https://lostechies.com/derickbailey/2013/12/04/getting-the-real-client-ip-address-on-a-heroku-hosted-nodejs-app/ */
module.exports.parseIP = function(req) {
  var ip = req.headers['x-forwarded-for'];
  if (ip) {
    ip = ip.split(',');
    return ip[0];
  }
  else {
    ip = req.connection.remoteAddress;
    if (ip) {
      return ip;
    }
    else {
      return null;
    }
  }
}

/*  user-agent-parser is used as it provides a list of
    various operating systems */
module.exports.parseOS = function(UAString) {
  var parser = new userAgentParser();
  var os = parser.setUA(UAString).getOS();
  if (os.name !== undefined) {
    return os.name + " " + os.version;
  }
  else {
    return null;
  }
}

/*  'accept-languages' contains languages in format xx-XX;
    search for first one and extract it */
module.exports.parseLang = function(langString) {
  var langStart = langString.search(/[a-z]{2}-[a-z]{2}/i);
  if (langStart >= 0) {
    return langString.substr(langStart, 5);
  }
  else {
    return null;
  }
}