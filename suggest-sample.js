/**
 *
 * 	Command line app to get suggestions from a list of keywords
 *
 */


var suggest = require("./lib/suggest");
//var suggest = require("nice-suggest");
var log = require('./lib/logging').Logger;
var async = require("async");

if ( process.argv.length < 4 ) {
  process.stdout.write('usage: node suggest-proxies-db-sample.js languageCode-contryCode [keyword1] [keyword2] ...\n');
  return;
}

var language = process.argv.slice(2,3); // structure = languageCode-CountryCode

var keywords = process.argv.slice(3);


log.info("Start Google suggest for : " + keywords);
var config = suggest.config()
                  .setMaxDeep(2)
                  .setKeywords(keywords)
                  .setLanguage(language);

suggest.suggestKeywords(config, function(error, result) {
    if (error) {
      log.error(error);
    }

    result.forEach(function(suggest) {
      console.log(suggest);
    });

});
