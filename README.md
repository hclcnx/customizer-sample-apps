# customizer-sample-apps
This repo contains various Customizer sample apps for demo purposes

### Useful links and snippets for demo exercises:

#### Hello World Exercise - Use JS `lconn` object for dynamic capabilities

```dojo.query("span.shareSome-title")[0].textContent="Hello " + lconn.homepage.userName + "! ";```

#### Hello World Exercise - API sample code
```
var xhrargs = {
    url: "/connections/opensocial/rest/people/@me/@self",
    handleAs: "json"
};
var deferred = dojo.xhrGet(xhrargs);
deferred.then(
    function(results) {
        //console.log('JSON response = ' + JSON.stringify(results, null, 4));
        dojo.query("span.shareSome-title")[0].textContent="Hello " + results.entry.displayName + " !";
    }
);
```

#### Filtering Exercise - conditional match example
```
                "match": {
                    "condition": {
                        "keyword": "user-name",
                        "regex": "Samantha"
                    }
                }
```


#### CSS Exercises: - Periscope 
https://github.com/ibmcnxdev/cnx-custom-theme


#### CSS Exercises: Note the IBM Design Color Library
https://www.ibm.com/design/language/resources/color-library/

### Online Resources ###
* https://opencode4connections.org
* https://github.com/OpenCode4Connections/
* https://github.com/OpenCode4Connections/enhanced-activity-stream
* https://github.com/OpenCode4Connections/status-update-tone-analyzer
* https://github.com/OpenCode4Connections/bluemix-weather-widget
* https://github.com/OpenCode4Connections/watson-workspace-links
* https://github.com/ibmcnxdev/customizer/
* https://github.com/ibmcnxdev/customizer/blob/master/README.md
* https://github.com/ibmcnxdev/customizer/tree/master/docs
* https://github.com/ibmcnxdev/customizer/tree/master/samples
* https://github.com/ibmcnxdev/customizer/blob/master/docs/IBMConnectionsCustomizer.pdf
* http://bit.ly/2xmUuj5
* https://greasyfork.org/en
* https://tampermonkey.net/
* http://www.greasespot.net/
* https://zach-adams.com/2014/05/best-userscripts-tampermonkey-greasemonkey/
* https://www.lifewire.com/top-greasemonkey-tampermonkey-user-scripts-4134335

