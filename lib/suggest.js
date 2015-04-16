var request = require("request");
var async = require("async");
var _ = require("underscore");
var model = require("./model");
var log = require('./logging').Logger;


var config = function() {
  return new model.Config();
};

/*
 *  Main method used to find suggestion based on a Config object
 *
 *  Config       contains all the parameters (see in model.js to get all possibilities)
 *  endCallback  Call when all suggestions are found
 */


function suggestKeywords(config, endCallback) {


  // Keep Calm with Google => one suggest process at a time
  async.eachSeries(config.keywords,
      function(kw, callback) {
        log.debug("retrieve suggestion for : " + kw.keyword + " - " + kw.deep +
                  " please wait ... ");
        giveMeKwSuggestions(kw, config, function() {
            callback();
        });

      },

      function(error){
        log.debug("End of retrieving all suggestions");
        endCallback(error, config.resultKeywords);
      }
  );

}


/**
 * Search the Google suggest http service
 *
 * kwInfo		  Keyword from which the suggestions has to be found
 * config			Suggest config (language, country, withProxy, ...) based on the object Config (see in model.js)
 * callback    the usual callback when it is finished
 *
 */
function giveMeKwSuggestions(kwInfo, config, callback) {

    var defaults = {};
    if(config.proxyList) {
        var proxy = config.randomProxy ? config.proxyList.getRandomProxy().getUrl() : config.proxyList.getProxy().getUrl();
        defaults['proxy'] = proxy;
    }
	var r = request.defaults(defaults);

	r.get({

			// language = [language code]-[country code]
			uri:'http://suggestqueries.google.com/complete/search?hl=' + config.language + '&output=firefox&q=' +
          encodeURIComponent(kwInfo.keyword),

			encoding : 'binary'
		  },

		 function (error, response, body) {

        if (error) {
          log.error("Error when calling suggestqueries.google.com : " + error);
          callback(error);
          return;

        }

  			if (response.statusCode == 200) {
  				var result = JSON.parse(body);
    			var suggestions = result[1];


          suggestions.forEach(function(suggestion) {

    					if (!  _.contains(config.resultKeywords, suggestion)) {
    						config.resultKeywords.push(suggestion);
    					}


              if (kwInfo.deep > 0) {
                // Add suggestion on the initial list of keywords in order to
                // find suggestions on suggestions
                var found = _.find(config.keywords, function(kw){ return kw.keyword == suggestion; });

                if (! found ) {
                  var deep = kwInfo.deep-1;
                  config.keywords.push({'keyword' : suggestion, 'deep' : deep});
                }
              }

  				});

          callback();
  			}
  			else {
          callback(new Error("Invalid status code when calling suggestqueries.google.com : " + response.statusCode));

  			}
		}
	);

}


module.exports.suggestKeywords = suggestKeywords;
module.exports.config = config;
