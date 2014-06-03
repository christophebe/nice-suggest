var _ = require("underscore");

Config = function() {

  this.proxyList = null;   // Based on the ProxyList defined in the node package "simple-proxies", not mandatory
  this.keywords = [];      // List of kw from which we have to find suggestions
  this.resultKeywords = []; // will contains all suggestions
  this.maxDeep = 3;
  this.withProxies =  false;
  this.language = null;
  this.keywords = null;
  this.addOriginalKeywords = true; // if true, add the original kw into the result list of suggestions

  this.setProxyList = function (value) {
    this.proxyList = value;
    this.withProxies = true;
    return this;
  }

  this.setKeywords = function (kwds) {

    var config = this;
    this.keywords = _.map(kwds, function(kw){ return {'keyword' : kw, 'deep' : config.maxDeep } });
    if (this.addOriginalKeywords) {
      this.resultKeywords = kwds;
    }

    return this;
  }

  this.setMaxDeep = function (value) {
    this.maxDeep = value;
    if (keywords != []) {
      this.keywords = _.map(keywords, function(kw){ return {'keyword' : kw.keyword, 'deep' : value } });
    }
    return this;
  }

  this.setWithProxies = function (value) {
    this.withProxies = value;
    return this;
  }

  this.setLanguage = function (value) {
    this.language = value;
    return this;
  }

  this.setAddOriginalKeywords = function (value) {
    this.addOriginalKeywords = value;
    return this;
  }

};

module.exports.Config = Config;
