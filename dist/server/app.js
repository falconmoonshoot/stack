/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config/environment');

var express = require('express')
  , cors = require('cors')
  , app = express();

app.use(cors());

// Setup server
var server = require('http').createServer(app);

require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;


app.get('/oauth/callback', function(request, response) {
    var authorizationCode = request.param('code');
 
    oauth2.authenticate({
        redirect_uri: callbackUrl,
        client_id: consumerKey,
        client_secret: consumerSecret,
        code: authorizationCode
    }, function(error, payload) {
        /*
 
        The payload should contain the following fields:
        
        id              A URL, representing the authenticated user,
                        which can be used to access the Identity Service.
        
        issued_at       The time of token issue, represented as the 
                        number of seconds since the Unix epoch
                        (00:00:00 UTC on 1 January 1970).
        
        refresh_token   A long-lived token that may be used to obtain
                        a fresh access token on expiry of the access 
                        token in this response. 
 
        instance_url    Identifies the Salesforce instance to which API
                        calls should be sent.
        
        access_token    The short-lived access token.
 
 
        The signature field will be verified automatically and can be ignored.
 
        At this point, the client application can use the access token to authorize requests 
        against the resource server (the Force.com instance specified by the instance URL) 
        via the REST APIs, providing the access token as an HTTP header in 
        each request:
 
        Authorization: OAuth 00D50000000IZ3Z!AQ0AQDpEDKYsn7ioKug2aSmgCjgrPjG...
        */

        res.redirect('/');
    }); 
});