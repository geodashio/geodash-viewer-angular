declare var extract: any;
declare var geodash: any;
declare var ol: any;
declare var jsts: any;

/* Components */
import { Component, OnInit, EventEmitter } from '@angular/core';

/* Services */
import { GeoDashServiceBus }  from './../../geodash/services/GeoDashServiceBus';

@Component({
  selector: 'geodash-map-map',
  template: extract(['templates', 'merged', 'geodashMapMap.tpl.html'], geodash)
})
export class GeoDashComponentMapMap implements OnInit {
  name = 'GeoDashComponentMapMap';

  private dashboard: any;
  private state: any;

  constructor(private bus: GeoDashServiceBus) {

  }

  ngOnInit(): void {
    this.bus.listen("primary", "geodash:loaded", this.onLoaded);
    this.bus.listen("render", "geodash:changeView", this.onChangeView);
  }

  //onLoaded(data: any, source: any): void {
  onLoaded = (name: any, data: any, source: any): void => {
    console.log("GeoDashComponentMapMap: ", data, source);
    //
    this.dashboard = data["dashboard"];
    this.state = data["state"];

    // Initialize Map
    var listeners: any;
    geodash.var.map = geodash.init.map_ol3(<any>{
      "id": "map",
      "dashboard": this.dashboard,
      "state": this.state,
      "listeners": listeners
    });

    // Initialize JSTS
    if(typeof jsts != "undefined")
    {
      if(! geodash.util.isDefined(geodash.var.jsts_parser))
      {
        geodash.var.jsts_parser = new jsts.io.OL3Parser();
      }
    }

    // Baselayers
    if(extract("baselayers", this.dashboard, []).length > 0)
    {
      var baselayers = geodash.layers.init_baselayers_ol3(geodash.var.map, this.dashboard.baselayers);
      geodash.util.extend(geodash.var.baselayers, baselayers);
      // Load Default/Initial Base Layer
      var baseLayerID = this.dashboard.view.baselayer || this.dashboard.baselayers[0].id;
      geodash.var.map.addLayer(geodash.var.baselayers[baseLayerID]);
      //geodash.api.intend("viewChanged", {'baselayer': baseLayerID}, $scope);
      //geodash.api.intend("layerLoaded", {'type':'baselayer', 'layer': baseLayerID}, $scope);
    }

    // Feature Layers
    if(Array.isArray(extract("featurelayers", this.dashboard)))
    {
      for(var i = 0; i < this.dashboard.featurelayers.length; i++)
      {
        var fl = this.dashboard.featurelayers[i];
        //geodash.layers.init_featurelayer(fl.id, fl, $scope, live, dashboard, state);
        geodash.layers.init_featurelayer({
          "id": fl.id,
          "fl": fl,
          "dashboard":this.dashboard,
          "state": this.state
        });
      }
    }

    this.bus.emit("primary", "geodash:maploaded", <any>{}, this.name);

  }

  onChangeView = (name: any, data: any, source: any): void => {
    console.log("Changing view...");
    if(geodash.util.isDefined(extract("layer", data)))
    {
      geodash.navigate.layer(data)
    }
    else if(geodash.util.isDefined(extract("extent", data)))
    {
      var newExtent = undefined;
      var extent = extract("extent", data);
      if(geodash.util.isString(extent))
      {
        if(extent == "initial")
        {
          if(! geodash.var.map.getView().getAnimating())
          {
            //geodash.navigate.start($scope);
          }
        }
        else if(extent == "previous" || extent == "prev")
        {
          if(! geodash.var.map.getView().getAnimating())
          {
            //geodash.navigate.back($scope);
          }
        }
        else if(extent == "next" || extent == "forward")
        {
          if(! geodash.var.map.getView().getAnimating())
          {
            //geodash.navigate.forward($scope);
          }
        }
      }
      else
      {
        geodash.navigate.location({
          "animate": extract("animate", data),
          "duration": extract("duration", data),
          "extent": geodash.normalize.extent(extent, {
            "sourceProjection": "EPSG:4326",
            "targetProjection": geodash.var.map.getView().getProjection().getCode()
          })
        });
      }
    }
    else
    {
      geodash.navigate.location({
        "animate": extract("animate", data),
        "duration": extract("duration", data),
        "lat": extract("lat", data),
        "lon": extract("lon", data),
        "zoom": extract("zoom", data)
      });
    }
  }
}
