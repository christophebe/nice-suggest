#!/usr/bin/env node

/**
 * 	Command line app to get suggestions from a list of keywords
 *
 */

var inquirer    = require("inquirer");
var log         = require("../lib/logging").Logger;
var proxyLoader = require("simple-proxies/lib/proxyfileloader");
var suggest     = require("../lib/suggest");


if ( process.argv.length != 2 ) {
	process.stdout.write('usage: suggest \n');
	return;
}


var findSuggests = function (language, keywords, maxDeep, proxyList) {

  var config = suggest.config()
                  .setProxyList(proxyList)
                  .setMaxDeep(maxDeep)
                  .setKeywords(keywords)
                  .setLanguage(language);


  log.info("Start Google suggest for : " + keywords + " with a maxdeep of " + config.maxDeep);

  suggest.suggestKeywords(config, function(error, result) {
    if (error) {
      log.error(error);
    }

    result.forEach(function(suggest) {
      console.log(suggest);
    });

  });

}

var findSuggestsWithProxies = function (language, keywords, maxDeep, proxyFile) {

    var proxyConfig = proxyLoader.config().setProxyFile(proxyFile);

    proxyLoader.loadProxyFile(proxyConfig, function(error, proxyList) {
        if (error) {
          log.error("Error during loading proxies : " + error);
          return;
        }

        if (proxyList.getNumberOfProxies() == 0) {
          log.error("No proxy available in the file");
          return;
        }

        findSuggests(language, keywords, maxDeep, proxyList);

    });

}

var getQuestions = function() {

  return [{"type": "input", "name" : "keywords", "message" : "a list of comma separated keywords"},
          {"type": "input", "name" : "language", "message" : "LanguageCode-ContryCode", "default" : "en-us"},
          {"type": "input", "name" : "maxDeep", "message" : "maxDeep", "default" : 5},
          {"type": "confirm", "name" : "withProxies", "message" : "With Proxies"},
          {"type": "input", "name" : "proxyFile", "message" : "proxyFile", default: "./proxies.txt",
           "when" : function(a){ return a.withProxies}
          }];

}


inquirer.prompt(getQuestions(), function( answers ) {

    var keywords = answers.keywords.split(',');

    if (! answers.withProxies) {
      findSuggests(answers.language, keywords, answers.maxDeep);
    }
    else {
      findSuggestsWithProxies(answers.language, keywords, answers.maxDeep, answers.proxyFile);
    }

});
