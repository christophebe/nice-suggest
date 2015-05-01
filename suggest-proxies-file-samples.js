/**
 *
 * 	Command line app to get suggestions from a list of keywords
 *  It loads proxies from a db by using the nodejs package : simple-proxies
 *  https://github.com/christophebe/simple-proxies
 *
 */

var proxyLoader = require("simple-proxies/lib/proxyfileloader");
var suggest = require("./lib/suggest");
var log = require('./lib/logging').Logger;
var async = require("async");

var PROXY_FILE = "./proxies.txt";

var findSuggests = function (language, keywords) {

  var config = suggest.config()
                  .setMaxDeep(1)
                  .setKeywords(keywords)
                  .setLanguage(language);


  log.info("Start Google suggest for : " + keywords + " with a maxdeep of " + config.maxDeep + " (can take time) ...");

  suggest.suggestKeywords(config, function(error, result) {
    if (error) {
      log.error(error);
    }

    result.forEach(function(suggest) {
      console.log(suggest);
    });

  });

}


if ( process.argv.length < 4 ) {
  process.stdout.write('usage: node suggest-proxies-file-sample.js languageCode-contryCode [keyword1] [keyword2] ...\n');
  return;
}

var language = process.argv.slice(2,3); // structure = languageCode-CountryCode
var keywords = process.argv.slice(3);

var proxyConfig = proxyLoader.config().setProxyFile(PROXY_FILE);
console.log("Checking proxies ...");

proxyLoader.loadProxyFile(proxyConfig, function(error, proxyList) {
    if (error) {
      log.error("Error during loading proxies : " + error);
      return;
    }

    if (proxyList.getNumberOfProxies() == 0) {
      log.error("No proxy available in the file");
      return;
    }

    findSuggests(language, keywords);

});
