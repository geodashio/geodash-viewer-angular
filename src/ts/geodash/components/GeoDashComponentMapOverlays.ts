declare var extract: any;
declare var geodash: any;

/* Components */
import { Component, OnInit, EventEmitter } from '@angular/core';

/* Services */
import { GeoDashServiceBus }  from './../../geodash/services/GeoDashServiceBus';
import { GeoDashServiceCompile } from './../../geodash/services/GeoDashServiceCompile';

@Component({
  selector: 'geodash-map-overlays',
  template: extract(['templates', 'merged', 'geodashMapOverlays.tpl.html'], geodash),
  providers: []
})
export class GeoDashComponentMapOverlays implements OnInit {

  public dashboard: any;
  public state: any;

  name = 'GeoDashComponentMapOverlays';

  constructor(private bus: GeoDashServiceBus, private compileService: GeoDashServiceCompile) {

  }

  ngOnInit(): void {
    this.bus.listen("primary", "geodash:loaded", this.onLoaded);
  }

  //onLoaded(data: any, source: any): void {
  onLoaded = (data: any, source: any): void => {
    console.log("GeoDashComponentMapOverlays: ", data, source);
    this.dashboard = data["dashboard"];
    this.state = data["state"];
  }

  interpolate = (template: string): any => {
      return (ctx:any) => this.compileService.compile(template, ctx);
  };


  imageURL(overlay: any): string {
    if(geodash.util.isString(extract("image.url", overlay)) && extract("image.url", overlay).length > 0)
    {
      return extract("image.url", overlay);
    }
    else if(geodash.util.isDefined(extract("image.asset", overlay)) && extract("image.asset", overlay).length > 0 )
    {
      return extract(["var", "assets", extract("image.asset", overlay), "url"], geodash);
    }
    else
    {
      return "";
    }
  };

  class_overlay(overlay: any): string {
    var str = "geodash-map-overlay";
    if(geodash.util.isDefined(extract("intents", overlay)) || geodash.util.isDefined(extract("intent", overlay)))
    {
      str += " geodash-intent";
    }

    var classes = extract("css.classes", overlay);
    if(geodash.util.isDefined(classes))
    {
      if(geodash.util.isString(classes))
      {
        str += " " + classes;
      }
      else if(Array.isArray(classes))
      {
        str += " " + classes.join(" ");
      }
    }

    return str;
  };

  style(type: string, overlay: any): any {
    var styleMap = <any>{};

    geodash.util.extend(styleMap, <any>{
      "top": extract("position.top", overlay, 'auto'),
      "bottom": extract("position.bottom", overlay, 'auto'),
      "left": extract("position.left", overlay, 'auto'),
      "right": extract("position.right", overlay, 'auto'),
      "width": extract("width", overlay, 'initial'),
      "height": extract("height", overlay, 'initial'),
      "padding": "0px",
      "margin": "0px",
      "background": "transparent",
      "opacity": "1.0"
    });

    if(type == "text")
    {
      geodash.util.extend(styleMap, <any>{
        "font-family": extract("text.font.family", overlay, 'Arial'),
        "font-size": extract("text.font.size", overlay, '12px'),
        "font-style": extract("text.font.style", overlay, 'normal'),
        "text-shadow": extract("text.shadow", overlay, 'none')
      });
    }
    else if(type == "image")
    {
      geodash.util.extend(styleMap, <any>{
        "display": "inline-block"
      });
    }

    if(geodash.util.isDefined(extract("intents", overlay)) || geodash.util.isDefined(extract("intent", overlay)))
    {
      geodash.util.extend(styleMap, <any>{
        "cursor": "pointer"
      });
    }

    if(geodash.util.isDefined(extract("css.properties", overlay)))
    {
      geodash.util.extend(styleMap, geodash.util.arrayToObject(extract("css.properties", overlay)));
    }

    return styleMap;
  };

  intents = (overlay: any): any => {
    var data = [];
    var intents = extract("intents", overlay);
    if(Array.isArray(intents))
    {
      for(var i = 0; i < intents.length; i++)
      {
        var intent = intents[i];
        var intentName = intent.name;
        if(geodash.util.isDefined(intentName))
        {
          var intentProperties = intent.properties;
          if(geodash.util.isDefined(intentProperties))
          {
            var intentData = geodash.util.arrayToObject(intentProperties, <any>{'$interpolate': this.interpolate, 'ctx': <any>{'overlay': overlay}});
            data.push({ "name": intent.name, "data": intentData });
          }
          else
          {
            data.push({ "name": intent.name });
          }
        }
      }
    }
    return data;
  };

}