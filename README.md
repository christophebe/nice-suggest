# Google Suggest for NodeJS

This package provides a Google Keyword Suggest command line tool & component that you can used in your nodejs app.
The keyword suggest is done with the Google web service **suggestqueries.google.com**. It returns keyword suggestions based on a set of keywords.

It is also possible to find suggestions for the found suggestions with a max deep value.

Basic but do the job !

#Install

If you want to use the command line

```
npm install nice-suggest -g
```

If you want to use the component in your nodejs app
```
npm install nice-suggest --save
```


#Command Line tool

Easy !, on your terminal :

```
suggest
```

The command line will ask you several questions : keywords, language, country, use proxies or not.
This can take time if your keyword list is important and if you set a huge maxdeep value.



##Using this component in your own app

```
var suggest = require("nice-suggest");

var config = suggest.config()
                  .setMaxDeep(2)
                  .setKeywords(["keyword1", "keyword2"])
                  .setLanguage("en-us");

suggest.suggestKeywords(config, function(error, result) {
    if (error) {
      log.error(error);
    }

    result.forEach(function(suggest) {
      console.log(suggest);
    });

});

```



There are a couple of examples in the code project that show you how to use this component in a node app :
- suggest-sample.js : basic code without using proxies.
- suggest-proxies-file-sample.js : suggest with proxies that are in a file.
- suggest-proxies-db-sample.js : suggest with proxies that are in a MongoDB collection.
