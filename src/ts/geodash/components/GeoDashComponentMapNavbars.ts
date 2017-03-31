declare var extract: any;
declare var geodash: any;

/* Components */
import { Component, OnInit, EventEmitter } from '@angular/core';

/* Services */
import { GeoDashServiceBus }  from './../../geodash/services/GeoDashServiceBus';
import { GeoDashServiceCompile } from './../../geodash/services/GeoDashServiceCompile';

@Component({
  selector: 'geodash-map-navbars',
  template: extract(['templates', 'merged', 'geodashMapNavbars.tpl.html'], geodash),
  providers: []
})
export class GeoDashComponentMapNavbars implements OnInit {

  private dashboard: any;
  private state: any;
  private navbars: any;

  public default_tooltip_placement: any;

  name = 'GeoDashComponentMapNavbars';

  constructor(private bus: GeoDashServiceBus, private compileService: GeoDashServiceCompile) {
    this.default_tooltip_placement =
    {
      "top": "bottom",
      "left": "right",
      "bottom": "top",
      "right": "left"
    };
    this.state = {};
    this.navbars = [];
  }

  ngOnInit(): void {
    this.bus.listen("primary", "geodash:loaded", this.onLoaded);
  }

  //onLoaded(data: any, source: any): void {
  onLoaded = (name: any, data: any, source: any): void => {
    console.log("GeoDashComponentMapNavbars: ", data, source);
    this.dashboard = data["dashboard"];
    this.state = data["state"];
    this.navbars = extract("navbars", this.dashboard, []).map((navbar: any): any => <any>{
        "classes": this.class_navbar(navbar),
        "style":  this.style_navbar(navbar),
        "tabs": extract("tabs", navbar, []).map((tab: any): any => geodash.util.extend(tab, <any>{
          "wrapper_classes":  this.class_tab_wrapper(navbar, tab),
          "wrapper_style":  this.style_tab_wrapper(navbar, tab),
          "classes":  this.class_tab(navbar, tab),
          "style":  this.style_tab(navbar, tab),
          "href":  this.link_url(navbar, tab),
          "target":  this.link_target(navbar, tab),
          "intents":  this.intents(navbar, tab),
          "tooltip": tab.tooltip,
          "placement":  this.tab_tooltip_placement(navbar, tab),
          "container":  this.tab_tooltip_container(navbar, tab),
          "title": tab.title
        }))
    });
    console.log("navbars =", this.navbars);
  }

  onClick = (event: any, navbar: any, tab: any): void => {
    console.log("tab: ", tab);
    var intents = extract("intents", tab, []);
    intents.forEach((intent:any) => {
      let data = this.render(intent.data, <any>{"navbar": navbar, "tab": tab});
      this.bus.emit("intents", intent.name, data, this.name);
    });
    event.preventDefault();
  }

  render = (object: any, ctx: any): any => {
    return geodash.util.arrayToObject(geodash.util.objectToArray(object).map((x:any) => {
      return <any>{
        "name": x.name,
        "value": this.interpolate(x.value)(ctx)
      };
    }));
  }

  interpolate = (template: string): any => {
      return (ctx:any) => this.compileService.compile(template, ctx);
  }

  class_navbar(navbar: any): any {
    var str = "geodash-map-navbar";

    var placement = extract("placement", navbar, "bottom");

    str += " geodash-placement-"+placement;

    if(geodash.util.isDefined(extract("switch", navbar))) {
      str += " geodash-radio-group";
    }

    if(placement == "left" || placement == "right")
    {
      str += "";
    }
    else // if(placement == "left" || placement == "right")
    {
      str += " row no-gutters";
    }

    var classes = extract("css.classes", navbar);
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
  }

  style_navbar(navbar: any): any {
    var styleMap = {};

    if(geodash.util.isDefined(extract("css.properties", navbar)))
    {
      geodash.util.extend(styleMap, geodash.util.arrayToObject(
        extract("css.properties", navbar),
        <any>{'$interpolate': this.interpolate, 'ctx': {'navbar': navbar}}
      ));
    }

    return styleMap;
  }

  class_tab_wrapper(navbar: any, tab: any): any {
    var classes = extract("wrapper.css.classes", tab);
    if(geodash.util.isDefined(classes))
    {
      if(geodash.util.isString(classes))
      {
        return classes;
      }
      else if(Array.isArray(classes))
      {
        return classes.join(" ");
      }
    }
    else
    {
      var placement = extract("placement", navbar, "bottom");
      if(placement == "left" || placement == "right")
      {
        return "row no-gutters";
      }
      else // if(placement == "left" || placement == "right")
      {
        return "col";
      }
    }
  }

  style_tab_wrapper = (navbar: any, tab: any) => {
    var styleMap = {
      "padding": "0px"
    };

    if(geodash.util.isDefined(extract("wrapper.css.properties", tab)))
    {
      geodash.util.extend(styleMap, geodash.util.arrayToObject(
        extract("wrapper.css.properties", tab),
        <any>{'$interpolate': this.interpolate, 'ctx': {'navbar': navbar, 'tab': tab}}
      ));
    }

    return styleMap;
  }

  class_tab(navbar: any, tab: any) {
    var str = "btn";

    if(geodash.util.isDefined(navbar.switch))
    {
      if(tab.value == extract(navbar.switch, this))
      {
        str += ' btn-primary selected geodash-radio geodash-on';
      }
      else
      {
        str += ' btn-default geodash-radio';
      }
    }
    else
    {
      str += ' btn-default';
    }

    if(! geodash.util.isDefined(extract("link", tab)))
    {
      str += " geodash-intent"
    }

    var placement = extract("placement", navbar, "bottom");
    /*if(placement == "left" || placement == "right")
    {
      str += " col";
    }*/

    var classes = extract("css.classes", tab);
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
  }

  style_tab = (navbar: any, tab: any) => {
    var styleMap = {};

    if(geodash.util.isDefined(extract("css.properties", tab)))
    {
      geodash.util.extend(styleMap, geodash.util.arrayToObject(
        extract("css.properties", tab),
        <any>{'$interpolate': this.interpolate, 'ctx': {'tab': tab}}
      ));
    }

    return styleMap;
  }

  link_url = (navbar: any, tab: any) => {
    var name = extract("page", navbar);
    if(geodash.util.isDefined(name))
    {
      var page = geodash.api.getPage(name);
      if(geodash.util.isDefined(page))
      {
        return this.interpolate(page)(<any>{'state': this.state });
      }
      else
      {
        return "";
      }
    }
    else
    {
      return extract("link.url", tab, "");
    }
  }

  link_target(navbar: any, tab: any) {
    var name = extract("page", navbar);
    if(geodash.util.isDefined(name))
    {
      return "_self";
    }
    else
    {
      return extract("link.target", tab, "");
    }
  }

  intents = (navbar: any, tab: any): any => {
    var data = [];
    var intents = extract("intents", tab) || extract("intents", navbar);
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
            var intentData = geodash.util.arrayToObject(
              intentProperties,
              <any>{$interpolate: this.interpolate, 'ctx': {'tab': tab}}
            );
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
  }

  markdown_tab(navbar: any, tab: any): any {
    if(geodash.util.isDefined(extract("markdown", tab)))
    {
      return extract("markdown", tab) ? 1 : 0;
    }

    if(geodash.util.isDefined(extract("markdown", navbar)))
    {
      return extract("markdown", navbar) ? 1 : 0;
    }

    return 1;
  }

  tab_tooltip_container(navbar: any, tab: any): any {
    return extract("tooltip.container", tab, "body");
  }

  tab_tooltip_placement(navbar: any, tab: any): any {
    return extract(
      "tooltip.placement",
      tab,
      this.default_tooltip_placement[extract("placement", navbar, "bottom")]
    );
  }
}
