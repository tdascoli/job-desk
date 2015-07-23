#!/bin/env node
//  OpenShift sample Node application
var http = require('http');
// Scope
var server = {};
var express = require('express');

server.app = (function() {
  return express();
}());

//Get the environment variables we need.
var ipaddr  = process.env.OPENSHIFT_NODEJS_IP || "localhost";
var port    = process.env.OPENSHIFT_NODEJS_PORT || 8888;

server.app.use(express.static(process.cwd() + '/src/main/'));

http.createServer(server.app).listen(port, ipaddr);

console.log("Server running at http://" + ipaddr + ":" + port + "/");
