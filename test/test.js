/*
 * To run correctly the tests, you need a MongoDB running on localhost
 * see the dbconfig.json file
 *
 */

var assert = require("assert");
var suggest = require("../lib/suggest");



describe('Test Suggest', function(){


  describe('#TestConfig', function(){
    it('should return a valid Config Object', function(done){
        var config = suggest.config()
                //.setMaxDeep(10)
                .setKeywords(["seo", "marketing", "google"])
                .setLanguage("en-us");

   	 	assert.equal(3, config.maxDeep);
        assert.equal("seo", config.keywords[0].keyword);
        assert.equal(3, config.keywords[0].deep);
        assert.equal("en-us", config.language);
        assert.equal("marketing", config.resultKeywords[1]);
     	 done();


    });
  });




});
