// ==UserScript==
// @copyright    Copyright IBM Corp. 2018
// @name         OnTime Calendar
// @version      0.1
// @namespace    http://ibm.com
// @author       Brian Gleeson
// @include      *://apps.collabservintegration.com/*
// @exclude
// @run-at       document-end
// ==/UserScript==

require(["dojo/dom-class", "dijit/TitlePane", "dojo/domReady!"], function(domClass, TitlePane) {
  var waitFor = function(callback, elXpath) {
    var maxInter = 300; // number of intervals before expiring
    var waitTime = 100; // 1000=1 second
    var waitInter = 0; // current interval
    var intId = setInterval( function() {
      if (++waitInter >= maxInter) return;
      if (typeof(dojo) == "undefined") return;
      if (!dojo.query(elXpath, dojo.body()).length) return;
      clearInterval(intId);
      if (waitInter < maxInter) {
        callback();
      }
    }, waitTime);
  };

  var getCommunityID = function() {
    var url = window.location.href;
    var id = url.split("communityUuid=")[1].split("&")[0];
    return id;
  }

  var getCommunityMembers = function() {
    // communities/service/atom/community/members?communityUuid=[UUID]&ps=10000
    // Retrieve the list of community members
    var memberList = [];
    var commID = getCommunityID();
    var xhrargs = {
      url: "/communities/service/atom/community/members?communityUuid=" + commID + "&ps=10000",
      handleAs: "xml",
      headers: { "Content-Type": "application/atom+xml" },
      load: function(xmlDoc, ioArgs) {
        // parse the results of the XHR request
        var node = xmlDoc.getElementsByTagName("feed").item(0);

        if (node == null || node == undefined) {
          console.log("ATOM XML format is corrupted");
          return;
        }

        // If there are no 'entry' elements, then there are no members
        var entryList = node.getElementsByTagName("entry");
        var entriesLength = entryList.length;
        for (var i = 0; i < entriesLength; ++i) {
          // pull out the email value of all members
          var entry = entryList.item(i);
          var contributor = entry.getElementsByTagName('contributor').item(0);
          var email = contributor.getElementsByTagName('email');
          if (email != null && email != undefined && email.length > 0) {
            var emailValue = email.item(0).firstChild.data;
            memberList.push(emailValue);
          }
        }
        return memberList;
      },
      error: function(error, ioArgs) {
        console.log("Failed to fetch pending invites: ", error, ioArgs);
        return [];
      }
    };
    var deferred = dojo.xhrGet(xhrargs);
    return deferred;
  }

  var addOnBehalfWidget = function(data) {
    // Listen for result of proxy calls to get token
    var token = data.Token;
    var username = data.UserName;
    if(!!token) {
      var fetchMembers = getCommunityMembers();
      fetchMembers.then(function(members) {
        var onBehalfWidget = `
          <div id="widget-container-banner">
            <div id="onTimeSection">
              <div class="onTime Content view">
                <iframe src='https://demo.ontimesuite.com/ontime/ontimegcclient.nsf/webtoken?OpenPage&token=${token}&users=${JSON.stringify(members)}'
                  class='widgetFrame' width='100%' height='800' frameborder='0' style=''>
                </iframe>
              </div>
            </div>
          </div>`;

        var placeholderDiv = dojo.byId("placeholder");
        var titlePane1 = new TitlePane({title:"OnTime Calendar", content: onBehalfWidget});
        dojo.place(titlePane1.domNode, placeholderDiv, "replace");
        titlePane1.startup();
        domClass.add(titlePane1.domNode, "onTimeCollapseWidget");
      });
    }
  };

  var addOnTimeCommunityWidget = function() {
    var fetchMembers = getCommunityMembers();
    fetchMembers.then(function(members) {
      var onTimeCommunityWidget = `
        <div id="widget-container-banner" class="widgetContainer" role="presentation">
          <div id="onTimeSection">
            <div class="onTime Content view">
              <iframe src='https://demo.ontimesuite.com/ontime/ontimegcclient.nsf/web?open&users=${JSON.stringify(members)}'
                class='widgetFrame' width='100%' height='800' frameborder='0' style=''>
              </iframe>
            </div>
          </div>
        </div>`;
      var placeholderDiv = dojo.byId("placeholder");
      var titlePane2 = new TitlePane({title:"OnTime Calendar", content: onTimeCommunityWidget});
      dojo.place(titlePane2.domNode, placeholderDiv, "replace");
      titlePane2.startup();
      domClass.add(titlePane2.domNode, "onTimeCollapseWidget");
    });
  };

  // Add loading placeholder to page
  var content = dojo.query(".lotusContent")[0];
  var placeHolder = `
    <div id="placeholder">
      <div id="onTimeSection" class="lotusWidget2 lconnHideWidgetMenu" role="region">
        <h2 style="cursor: default" class="widgetTitle">OnTime Calendar</h2>
        <div id="onTimeSubArea" style="-webkit-user-select: text;" widgetloaded="true" widgetneedrefresh="false">
          <div id="onTime">
            <div class="onTime Content view">
              <div>Loading...</div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  dojo.place(placeHolder, content, "last");

  var proxyTest = function() {
    require(['dojo/request', 'dojo/topic'], (request, topic) => {
      request('/files/customizer/proxy?reponame=think-attendee-19&proxyFile=onTime/onTimeTokenProxy.json',
        {
          headers: {
            'X-Requested-With': null,
            'customizer-proxy': true,
            'Content-Type': 'application/json',
          },
          data: dojo.toJson({
            Main: {
              ApplID: 'ApiExplorer', ApplVer: '7', APIVer: 7,
            },
          }),
          handleAs: 'json',
          method: 'POST',
        }).then((tokenResponse) => {
        request('/files/customizer/proxy?reponame=think-attendee-19&proxyFile=onTime/onTimeUserProxy.json',
          {
            headers: {
              'X-Requested-With': null,
              'customizer-proxy': true,
              'Content-Type': 'application/json',
            },
            data: dojo.toJson({
              Main: {
                ApplID: 'ApiExplorer', ApplVer: '7', APIVer: 7, Token: tokenResponse.Token, OnBehalfOf: 'chris.holmes@ontime.com',
              },
            }),
            handleAs: 'json',
            method: 'POST',
          }).then((userResponse) => {
            addOnBehalfWidget(userResponse);
            // addOnTimeCommunityWidget();
        });
      });
    });
  }

  proxyTest();
});
