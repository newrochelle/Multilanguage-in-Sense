/**
 * @module      clr-Multilanguage
 * @classdesc   Qlik Sense Extension for Multilanguage management
 * @return      Return an array with the definition properties
 * @version     0.1.0
 * @copyright   Qlik 2016
 * @author      Corrado Lorefice <Corrado.Lorefice@qlik.com>
 */
define([
    'qlik',
		'jquery',
    './properties'
],
	function (qlik, $, properties) {
	  'use strict';

	  return {
	    // Define what the properties panel looks like
	    definition: properties,

	    initialProperties: {
	      qHyperCubeDef : {
	        qDimensions : [],
	        qMeasures : [],
	        qInitialDataFetch : [{
	          qWidth : 3,
	          qHeight : 3300
	        }]
	      }
	    },

	    snapshot: {
	      canTakeSnapshot: true
	    },

	    controller: ["$scope", "$rootScope", function (s, r) {
	      //console.log(s, r);
	      console.log('controller');
	      function prepareBrowserLanguage() {
	        //alert("prepareBrowserLanguage");

	        var browserLanguage,
            tokens;
	        browserLanguage = navigator.language.toLowerCase() || "en-gb";
	        if (browserLanguage.length > 3) {
	          tokens = browserLanguage.split("-");
	          if (tokens[0] === tokens[1]) {
	            browserLanguage = tokens[0];
	          }
	        }

	        return browserLanguage;
	      }

	      //r.browserLanguage = prepareBrowserLanguage();
	      //r.languagechoice = r.browserLanguage;

	      if (!r.languagechoice) {
	        r.browserLanguage = prepareBrowserLanguage();
	        r.languagechoice = r.browserLanguage;
	      }

	      if (!s.layout.properties.general.vlanguage) {
	        qlik.currApp().variable.setContent('vLanguage', r.browserLanguage);
        }
	      else {
	        qlik.currApp().variable.setContent(s.layout.properties.general.vlanguage, r.browserLanguage);
        }

	      s.$watch(
          function () {
            if (s.layout.properties.general.showflag) {
              return {
                showFlag: s.layout.properties.general.showflag,
                showLanguage: s.layout.properties.general.showlanguage
              };
            }
          },
          function (newValue, oldValue) {
            if (newValue.showFlag !== oldValue.showFlag) {
              //console.log("showflag", newValue.showFlag, oldValue.showFlag);
            }
            if (newValue.showLanguage !== oldValue.showLanguage) {
              //console.log("showlanguage", newValue.showLanguage, oldValue.showLanguage);
            }
          },
          true
        );

	    }],

      //// Initialization
	    //init: function () {
	    //  console.log('init');
	    //},

      //// Resize
	    //resize: function ($element, layout) {
	    //  //console.log("resize");
	    //},

	    // Paint/Rendering logic
	    paint: function ($element, layout) {
	      var self = this;
	      console.log("paint");

	      function createContainer() {

	        function translate(translationDirection) {

	          function domSearchAndReplace(domObj, translationDirection) {

	            for (i = 0; i < domObj.length; i++) {
	              self.backendApi.eachDataRow(function (rownum, row) {
	                Search = "";
	                Replace = "";
	                row.forEach(function (cell, index) {
	                  if (cell.qIsOtherCell) {
	                    cell.qText = self.backendApi.getDimensionInfos()[index].othersLabel;
	                  }
	                  if (index === 0 && translationDirection === false) { Search = cell.qText.trim(); }
	                  if (index === 1 && translationDirection === false) { Replace = cell.qText.trim(); }
	                  if (index === 1 && translationDirection === true) { Search = cell.qText.trim(); }
	                  if (index === 0 && translationDirection === true) { Replace = cell.qText.trim(); }
	                  if (index === 2) { UI = cell.qText.trim(); }
	                });
	                if (UI.indexOf(blanguage) > -1) {
	                  domObj[i].textContent = domObj[i].textContent.replace(new RegExp('\\b' + Search + '\\b', "g"), Replace);
	                }
	              });

	            }

	            return domObj;
	          }

	          if (translatesheettitles === "Y") {
	            var sheettitles = $("#sheet-title").children("span");
	            domSearchAndReplace(sheettitles, translationDirection);
	          }

	          if (translateheadercell === "Y") {
	            var tables = $("th.qv-st-header-cell-dimension"); //$("th.qv-st-header-cell").filter(function (index) { return $(".ng-binding", this).length === 1; });
	            for (var i = 0; i < tables.length; i++) {
	              self.backendApi.eachDataRow(function (rownum, row) {
	                Search = "";
	                Replace = "";
	                row.forEach(function (cell, index) {
	                  if (cell.qIsOtherCell) {
	                    cell.qText = self.backendApi.getDimensionInfos()[index].othersLabel;
	                  }
	                  if (index === 0 && translationDirection === false) { Search = cell.qText.trim(); }
	                  if (index === 1 && translationDirection === false) { Replace = cell.qText.trim(); }
	                  if (index === 1 && translationDirection === true) { Search = cell.qText.trim(); }
	                  if (index === 0 && translationDirection === true) { Replace = cell.qText.trim(); }
	                  if (index === 2) { UI = cell.qText.trim(); }
	                });
	                if (UI.indexOf(blanguage) > -1) {
	                  tables[i].textContent = tables[i].textContent.replace(new RegExp('\\b' + Search + '\\b', "g"), Replace);
	                }
	              });
	            }
	          }

	          if (translatetitles === "Y") {
	            //var titles = $(".qv-object-header").children("span[ng-if]");
	            var titles = $("div.qv-object-title-text");
	            domSearchAndReplace(titles, translationDirection);

	            var titles = $("span.title");
	            domSearchAndReplace(titles, translationDirection);
	          }

	          if (translatesubtitles === "Y") {
	            var subtitles = $(".qv-object-subtitle");
	            domSearchAndReplace(subtitles, translationDirection);
	          }

	          if (translatefooters === "Y") {
	            var footers = $(".qv-object-footnote");
	            domSearchAndReplace(footers, translationDirection);
	          }

	          if (translatefooters === "Y") {
	            var container = $(".qv-breadcrumb-container").find('[ng-style]');
	            domSearchAndReplace(container, translationDirection);
	          }

	        }

	        var id = "container_" + layout.qInfo.qId;

	        if (document.getElementById(id)) { $("#" + id).empty(); }
	        else { $element.append($("<div />").attr("id", id).width($element.width()).height($element.height())); }

	        var extDiv = $("#" + id);
	        var showlanguage = layout.properties.general.showlanguage;
	        var showflag = layout.properties.general.showflag;
	        var showlanguagechoice = layout.properties.general.showlanguagechoice;
	        var translateheadercell = layout.properties.objects.translateheadercell;
	        var translatetitles = layout.properties.objects.translatetitles;
	        var translatesheettitles = layout.properties.objects.translatesheettitles;
	        var translatesubtitles = layout.properties.objects.translatesubtitles;
	        var translatefooters = layout.properties.objects.translatefooters;
	        var blanguage = self.$scope.$parent.$root.browserLanguage;
	        var languagechoice = self.$scope.$parent.$root.languagechoice;

	        var Search = "", Replace = "", UI = "", html = "";

	        if (showflag === "Y") {
	          html += "<img src=\"/extensions/clr-multilanguage/img/flag-" + blanguage + ".png\">&nbsp;";
	        }

	        if (showlanguage === "Y") {
	          html += blanguage;
	        }

	        if (showlanguagechoice === "Y") {
	          var languageOptions = layout.properties.general.availableLanguages.split(';');
	          html += '<fieldset style="border:0">';
	          html += '<select name="clr-multilanguage-language" id="clr-multilanguage-language">';
	          if (languageOptions.length == 0) alert('No languages configured.');

	          for (var o = 0; o < languageOptions.length; o++) {
	            /* list selected language */
	            if (languagechoice == languageOptions[o].split('^')[0]) {
	              html += '<option value="' + languageOptions[o].split('^')[0] + '" data-class="language">'
                    + (languageOptions[o].split('^')[1] || languageOptions[o].split('^')[0]) + '</option>';
	            }
	          }

	          for (var o = 0; o < languageOptions.length; o++) {
	            /* list all languages */
	            if (languagechoice != languageOptions[o].split('^')[0]) {
	              html += '<option value="' + languageOptions[o].split('^')[0] + '" data-class="language">'
                    + (languageOptions[o].split('^')[1] || languageOptions[o].split('^')[0]) + '</option>';
	            }
	          }
	          html += '</select>';
	          html += '</fieldset>';
	        }

          // If browser language is equal to the choosen language, execute translate with false
	        if (blanguage == languagechoice) {
	          translate(false);
	        }

          // Render the UI in the DIV element
	        extDiv.append(html);

	        if (showlanguagechoice === "Y") {

	          if (self.$scope.$parent.$root.languageWatch) //check for watch exists
	            self.$scope.$parent.$root.languageWatch(); //this line will destruct watch if its already there
	            self.$scope.$parent.$root.languageWatch = self.$scope.$watch(function () {
	            if (document.getElementById("clr-multilanguage-language").value) {
	              return {
	                changeLanguage: document.getElementById("clr-multilanguage-language").value
	              };
	            }
	          },
            function (newValue, oldValue) {
              if (newValue.changeLanguage !== oldValue.changeLanguage) {
                self.$scope.$parent.$root.languagechoice = newValue.changeLanguage;
                translate(true);
                self.$scope.$parent.$root.browserLanguage = newValue.changeLanguage;
                if (!layout.setvlanguage)
                  qlik.currApp().variable.setContent('vLanguage', newValue.changeLanguage);
                else {
                  qlik.currApp().variable.setContent(layout.properties.general.vlanguage, newValue.changeLanguage);
                }
                //qlik.currApp().variable.getContent('vLanguage', function (reply) {
                //  alert(JSON.stringify(reply.qContent.qString));
                //});
                //debugger;
                createContainer();
              }
            },
            true
          );

	        }

	      }

	      createContainer();

	    }

	  };


	});