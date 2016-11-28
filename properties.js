define([], function () {
  'use strict';
  // *****************************************************************************
  // Dimensions & Measures
  // *****************************************************************************
  var dimensions = {
    uses: "dimensions",
    min: 3,
    max: 3
  };
  var measures = {
    uses: "measures",
    min: 0,
    max: 0
  };
  // *****************************************************************************
  // Appearance section
  // *****************************************************************************
  var appearanceSection = {
    uses: "settings"
  };

  // *****************************************************************************
  // Multilanguage section
  // *****************************************************************************

  // General Section
  var general_item1 = {
    ref: "properties.general.showlanguage",
    label: "Show client language",
    type: "string",
    component: "switch",
    options: [
      { value : "N", label : "No", translation : "No" },
      { value : "Y", label : "Yes", translation : "Yes" }
    ],
    defaultValue : "N"
  };
  var general_item2 = {
    ref: "properties.general.showflag",
    label: "Show flag image",
    type: "string",
    component: "switch",
    options: [
      { value: "N", label: "No", translation: "No" },
      { value: "Y", label: "Yes", translation: "Yes" }
    ],
    defaultValue: "Y"
  };
  var general_item3 = {
    ref: "properties.general.showlanguagechoice",
    label: "Enable user to change language",
    type: "string",
    component: "switch",
    options: [
      { value: "N", label: "No", translation: "No" },
      { value: "Y", label: "Yes", translation: "Yes" }
    ],
    defaultValue: "N"
  };
  var general_item4 = {
    ref: "properties.general.vlanguage",
    label: "Variable to be set with language",
    type: "string",
    expression: "optional",
    defaultValue: "vLanguage"
  };
  var general_item5 = {
    ref: "properties.general.availableLanguages",
    label: "Available languages (semicolon separated)",
    type: "string",
    expression: "optional",
    defaultValue: "='it;de;es;en-us'"
  };

  

  // Translate Section
  var objects_item1 = {
    ref: "properties.objects.translatesheettitles",
    label: "Sheet Title",
    type: "string",
    component: "switch",
    options : [
      { value : "N", label : "No", translation : "No" },
      { value : "Y", label : "Yes", translation : "Yes" }
    ],
    defaultValue : "N"
  };
  var objects_item2 = {
    ref: "properties.objects.translatetitles",
    label: "Titles",
    type: "string",
    component: "switch",
    options: [
      { value: "N", label: "No", translation: "No" },
      { value: "Y", label: "Yes", translation: "Yes" }
    ],
    defaultValue: "Y"
  };
  var objects_item3 = {
    ref: "properties.objects.translatesubtitles",
    label: "Sub Titles",
    type: "string",
    component: "switch",
    options: [
      { value: "N", label: "No", translation: "No" },
      { value: "Y", label: "Yes", translation: "Yes" }
    ],
    defaultValue: "Y"
  };
  var objects_item4 = {
    ref: "properties.objects.translatefooters",
    label: "Footers",
    type: "string",
    component: "switch",
    options: [
      { value: "N", label: "No", translation: "No" },
      { value: "Y", label: "Yes", translation: "Yes" }
    ],
    defaultValue: "Y"
  };
  var objects_item5 = {
    ref: "properties.objects.translateheadercell",
    label: "Columns Headers",
    type: "string",
    component: "switch",
    options: [
      { value: "N", label: "No", translation: "No" },
      { value: "Y", label: "Yes", translation: "Yes" }
    ],
    defaultValue: "Y"
  };

  // Define menù order
  var multilanguageSection = {
    component: "expandable-items",
    label: "Multilanguage properties",
    items: {
      header1: {
        type: "items",
        label: "General",
        items: {
          general_item1: general_item1,
          general_item2: general_item2,
          general_item3: general_item3,
          general_item4: general_item4,
          general_item5: general_item5
      }
      },
      header2: {
        type: "items",
        label: "Translate",
        items: {
          objects_item1: objects_item1,
          objects_item2: objects_item2,
          objects_item3: objects_item3,
          objects_item4: objects_item4,
          objects_item5: objects_item5
        }
      }

    }
  };

  // *****************************************************************************
  // Main properties panel definition
  // Only what is defined here is returned from properties.js
  // *****************************************************************************
  return {
    type: "items",
    component: "accordion",
    items: {
      dimensions: dimensions,
      measures: measures,
      appearance: appearanceSection,
      multilanguage: multilanguageSection
    }
  };
});