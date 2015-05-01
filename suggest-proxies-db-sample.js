/**
 *
 * 	Command line app to get suggestions from a list of keywords
 *   It loads proxies from a db by using the nodejs package : simple-proxies
 *
 */

var dbLoader = require("simple-proxies/lib/proxydbloader");
var dbStore  = require("simple-proxies/lib/mongoDBStore")
var suggest = require("./lib/suggest");
var log = require('./lib/logging').Logger;
var async = require("async");

if ( process.argv.length < 4 ) {
  process.stdout.write('usage: node suggest-proxies.js languageCode-contryCode [keyword1] [keyword2] ...\n');
  return;
}

var language = process.argv.slice(2,3); // structure = languageCode-CountryCode

var keywords = process.argv.slice(3);


//You can change the following db infos
var pm = new dbStore.MongoDBProxyStore({"url" : "mongodb://127.0.0.1:27017/seo", "collection" : "proxies"});

var proxyConfig = dbLoader.config().setPm(pm).setRemoveInvalidProxies(true);


async.waterfall([
      function(callback){
          pm.connect(function(error){
              if (error) {
                log.error("Error : impossible to connect to the DB : " + error);
                callback(error);
              }
              else {
                callback();
              }
          });
      },
      function(callback){
          dbLoader.loadProxies(proxyConfig, function(error, proxyList) {
              if (error) {
                log.error("Error during the proxies : " + error);
                callback(error);
                return;
              }

              if (proxyList.getNumberOfProxies() == 0) {
                log.error("No proxy available in the DB");
                callback(new Error("No proxy available in the DB"))
                return;
              }

              callback(null, proxyList);

          });
      },
      function(proxyList, callback){
          log.info("Start Google suggest for : " + keywords);
          var config = suggest.config()
                            .setProxyList(proxyList)
                            .setKeywords(keywords)
                            .setLanguage(language);

          // output the result on the console
          suggest.suggestKeywords(config, function(error, result) {
              if (error) {
                log.error(error);
              }

              result.forEach(function(suggest) {
                console.log(suggest);
              });
              callback();
          });
      }],
      function(error, results){
        pm.close();
      }

);
