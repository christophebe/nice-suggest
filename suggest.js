/**
 *
 * 	Command line app to get suggestions from a list of keywords
 *   It doesn't use proxies to make the requests but you can change the config
 *
 */


var suggest = require("./lib/suggest");
var log = require('./lib/logging').Logger;

if ( process.argv.length < 4 ) {
	process.stdout.write('usage: node suggest.js languageCode-contryCode [keyword1] [keyword2] ...\n');
	return;
}

var language = process.argv.slice(2,3); // structure = languageCode-CountryCode

var keywords = process.argv.slice(3);

log.info("Start Google suggest for : " + keywords );


var config = suggest.config()
                //.setMaxDeep(10)
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

});
