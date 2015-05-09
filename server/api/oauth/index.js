'use strict';

var express = require('express');
var controller = require('./oauth.controller');

var router = express.Router();

var oauth2 = require('salesforce-oauth2');


router.get('/', function(request, response) {

        response.redirect('/');
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

});


module.exports = router;