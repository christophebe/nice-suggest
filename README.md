# Google Suggest for NodeJS


This package provides a Google Suggest script based on the Google web service **suggestqueries.google.com**.
It returns keyword suggestions based on a set of keywords.

It is also possible to find suggestions for the found suggestions with a max deep value.

This Google Suggest component can also be used inside your own application.


##Node Scripts

There are 2 command line scripts in this package :
- suggest.js : Find suggestions based on a set of keywords.
- suggest-proxies.js : exactly the same as suggest.js through proxies. This script use [Simple Proxies](https://github.com/christophebe/simple-proxies).

###How to use thoses scripts ?

- Install NodeJS
- get the code from this Git repo

Use the following command line from the project :
```
node suggest.js languageCode-contryCode [keyword1] [keyword2] ...
```

Ex. :

```
node suggest.js en-us credit crisis strange\ world
```

This is the same arguments for suggest-proxies.js.
By default, suggest-proxies.js try to connect to a local MongoDB to retrieve the proxies.
I advise you to read the doc from [Simple Proxies](https://github.com/christophebe/simple-proxies) and feel free to change the code in this script to load proxies in another way.



##How to install this package into your node.js app ?

```javascript
$ npm install nice-suggest [--save]
```
or add it into your package.json :

```javascript
"dependencies": {
       "nice-suggest": "*"
    }

$ npm install

```

## Sample code for your own application

```javascript
var suggest = require("./lib/suggest");

var keywords = ["SEO", "Panda"];
var language = "fr-fr" //language-country (iso code)
var config = suggest.config()
                .setMaxDeep(10)         // Set the number of level to find suggestions of suggestions
                .setKeywords(keywords)
                .setLanguage(language);


suggest.suggestKeywords(config, function(error, suggestions) {
  if (error) {
    console.log(error);
  }

  suggestions.forEach(function(suggest) {
    console.log(suggest);
  });

});


```
