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
                .setKeywords(["credit", "crisis", "strange world"])
                .setLanguage("en-us");

   	 	assert.equal(3, config.maxDeep);
        assert.equal("credit", config.keywords[0].keyword);
        assert.equal(3, config.keywords[0].deep);
        assert.equal("en-us", config.language);
        assert.equal("crisis", config.resultKeywords[1]);
     	 done();


    });
  });




});
