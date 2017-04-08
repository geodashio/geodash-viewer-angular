/* Used for application-specific onverrides
 *
 */
geodash.config = {
  "templates": [
    "templates.merged",  // geodash.templates.merged.*
    "templates.server",  // geodash.templates.server.*
    "templates.static"   // geodash.templates.static.*
  ],
  "bootloader": {
    "loaders": [{
      "endpoints": function(data) {
        if(geodash.util.isDefined(data))
        {
          geodash.util.extend(geodash.var.endpoints, data);
        }
      },
      "pages": function(data) {
        if(geodash.util.isDefined(data))
        {
          geodash.util.extend(geodash.var.pages, data);
        }
      }
    }]
  },
  "click_radius": 2.0,
  "search": {
    "datasets": [geodash.typeahead.datasets],
    "codecs": [geodash.bloodhound.codec]
  },
  "dynamicStyleFunctionWorkspaces": [
    geodash.dynamicStyleFn
  ],
  "transport" : {
    "littleEndian": false
  },
  "popup": {
    "height": "309px",
    "context": {
      "e": extract,
      "extract": extract,
      "extractFloat": extractFloat
    },
    "listeners": {
      "show": []
    }
  },
  "whitelist": {
    "config": [
      "gist.githubusercontent.com"
    ]
  },
  "SpeechRecognition": geodash.util.coalesce([
    window.SpeechRecognition,
    window.webkitSpeechRecognition,
    window.mozSpeechRecognition,
    window.msSpeechRecognition,
    window.oSpeechRecognition
  ]),
  "speech": {
    "commands": [
      {
        "speech": ["stop", "stop(\\s*)listening"],
        "intents": ["stopListening"]
      },
      {
        "speech": ["zoom(\\s*)out", "out"],
        "intents": ["zoomOut"]
      },
      {
        "speech": [
          "zoom(\\s*)in", "zoomed(\\s*)in", "zoom", "zoo",
          "gym", "jim", "jem", "jym"
        ],
        "intents": ["zoomIn"]
      },
      {
        "speech": [
          "reset",
          "(pizza|reset)(\\s*)(X10|XM)",
          "reset(\\s*)(accent|extent|location)",
          "resource(\\s*)temp",
          "Lisa(\\s*)(Extant|Exton)",
          "Lisa(\\s*)and(\\s*)Stan",
          "Nissan(\\s*)Xterra"
        ],
        "intents": [{"name":"flyToExtent","data":{"extent":"initial"}}]
      },
      {
        "speech": [
          "fly(\\s*)to(\\s*)current(\\s*)location",
          "fly(\\s*)to(\\s*)my(\\s*)location",
          "fly(\\s*)to(\\s*)location",
          "go(\\s*)to(\\s*)current(\\s*)location",
          "got(\\s*)to(\\s*)my(\\s*)location"
        ],
        "intents": ["flyToCurrentLocation"]
      },
      {
        "speech": [
          "start(\\s*)geolocation",
          "starter(\\s*)location",
          "(start|dark)(\\s*)(deer|geer)(\\s*)location",
          "start(\\s*)tracking"
        ],
        "intents": ["startGeolocation"]
      },
      {
        "speech": ["stop(\\s*)geolocation", "stop(\\s*)tracking"],
        "intents": ["stopGeolocation"]
      },
      {
        "speech": ["show(\\s*)layer(\\s+)(.*)"],
        "intents": [
          { "name":"toggleFeatureLayer", "data": {"layer":"$3"} }
        ]
      },
      {
        "speech": ["zoom(\\s*)to(\\s+)(.*)"],
        "intents": [
          { "name":"zoomTo", "data": {"location":"$3"} }
        ]
      }
    ]
  }
};
