# think-attendee-19
Temporary repository for attendees of the IBM Think Customizer Workshop 2018

Log into IBM Connections Cloud - https://apps.na.collabserv.com

The App Registry URL is:
    https://apps.na.collabserv.com/appregistry/#/displayApps

### Useful links and snippets for lab exercises:

#### Hello World Exercise - Slide #31

```dojo.query("span.shareSome-title")[0].textContent="Hello " + lconn.homepage.userName + "! ";```

#### Hello World Exercise - Slide #34
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

#### CSS Exercises: - Slide #42
```"profiles/profilesCustomization.css"```

#### CSS Exercises: - Slide #45
https://github.com/ibmcnxdev/cnx-custom-theme

#### CSS Exercises: - Slide #48 - 
'think-attendee-x' where 'x' is the unique id index of your repo name  
```
{
    "name": "XTended Visual Update I",
    "type": "com.ibm.customizer.ui",
    "payload": {
        "include-files": [
             "visualUpdate/navbar-lab.css"
        ],
        "include-repo": {
            "name": "think-attendee-x"
        }
    },
    "path": "global",
    "application": "Visual Update I for IBM Connections",
    "state": "enabled"
}
````

#### CSS Exercises: - Slide #51
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

