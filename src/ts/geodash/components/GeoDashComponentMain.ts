declare var extract: any;
declare var geodash: any;
declare var $: any;
declare var ol: any;

/* Components */
import { Component, OnInit, EventEmitter, ElementRef } from '@angular/core';
import {Http, Response} from '@angular/http';

/* Services */
import { GeoDashServiceBus }  from './../../geodash/services/GeoDashServiceBus';
import { GeoDashServiceBootloader }  from './../../geodash/services/GeoDashServiceBootloader';
import { GeoDashServiceCompile }  from './../../geodash/services/GeoDashServiceCompile';

var templates = extract("config.", geodash)

@Component({
  selector: 'geodash-main',
  template: geodash.api.getTemplate('geodashMain.tpl.html'),
  providers: [
    GeoDashServiceBus,
    GeoDashServiceBootloader,
    GeoDashServiceCompile
  ]
})
export class GeoDashComponentMain implements OnInit {
  name = 'GeoDashComponentMain';

  public dashboard: any;
  public state: any;

  constructor(private element: ElementRef, private bus: GeoDashServiceBus, private bootloader: GeoDashServiceBootloader, private compileService: GeoDashServiceCompile) {

  }

  ngOnInit(): void {

    this.bus.listen("primary", "geodash:maploaded", this.onMapLoaded);
    this.bus.listen("intents", "*", this.onIntent);

    var urls = [
      geodash.util.coalesce([
        geodash.util.getHashValue("main:config"),
        geodash.util.getQueryStringValue("main:config")
      ])
    ];
    this.bus.request(urls).subscribe(
      (data:any): void => {
        this.dashboard = data[0];
        this.state = geodash.var.state = geodash.init.state({
          //"state": state,
          //"stateschema": stateschema,
          "dashboard": this.dashboard
        });
        /*Object.define("geodash.var.dashboard", {
          get: {
            return this.dastbord;
          }
        });*/
        geodash.var.dashboard = () => this.dashboard;
        geodash.var.state = () => this.state;
        this.bus.emit("primary", "geodash:loaded", <any>{ dashboard: this.dashboard, state: this.state }, this.name);
      },
      (err:any): void => console.error(err),
      () => console.log("Loading complete!")
    )
  }

  onMapLoaded = (name: any, data: any, source: any): void => {
    console.log("Map Loaded!");
  }

  onIntent = (name: any, data: any, source: any): void => {
    console.log("Recived Intent: ", name, data, source);

    if(name == "flyToLocation")
    {
      let renderData = <any>{
        "lat": extract("lat", data),
        "lon": extract("lon", data),
        "zoom": extract("zoom", data),
        "projection": extract("projection", data),
        "animations": ["pan", "bounce"]
      };
      this.bus.emit("render", "geodash:changeView", renderData, this.name);
    }
    else if(name == "zoomIn")
    {
      var z = geodash.var.map.getView().getZoom();
      var maxZoom = extract("view.maxZoom", this.dashboard, 18);
      var newZoom = Math.min(z+1, maxZoom);
      var animate = extract("animate", data, true);
      let renderData = <any>{ 'zoom': newZoom, 'animate': animate };
      this.bus.emit("render", "geodash:changeView", renderData, this.name);
    }
    else if(name == "zoomOut")
    {
      var z = geodash.var.map.getView().getZoom();
      var minZoom = extract("view.minZoom", this.dashboard, 0);
      var newZoom = Math.max(z-1, minZoom);
      var animate = extract("animate", data, true);
      let renderData = <any>{ 'zoom': newZoom, 'animate': animate };
      this.bus.emit("render", "geodash:changeView", renderData, this.name);
    }
    else if(name == "zoomToLayer")
    {
      var layer = data.layer;
      if(geodash.util.isDefined(layer))
      {
        let i: number = this.state.view.featurelayers.indexOf(layer);
        if(i != -1)
        {
          this.bus.emit("render", "geodash:changeView", {'layer': layer}, this.name);
        }
      }
    }
    else if(name == "toggleFeatureLayer")
    {
      var layer = data.layer;
      let i: number = this.state.view.featurelayers.indexOf(layer);
      if(i != -1)
      {
        this.state.view.featurelayers.splice(i, 1);
      }
      else
      {
        this.state.view.featurelayers.push(layer);
      }
      this.bus.emit("render", "geodash:refresh", {'state': this.state}, this.name);
    }
    else if(name = "clickedOnMap")
    {
      console.log("Clicked on Map!", data, "from", source);
      //
      var map = geodash.var.map;
      var z = this.state.view.z;
      var visibleFeatureLayers = this.state.view.featurelayers;
      console.log("visibleFeatureLayers", visibleFeatureLayers);
      var featurelayers_geojson = <any>[];
      var featurelayers_by_featuretype = <any>{};
      var fields_by_featuretype = <any>{};
      var urls = [];
      for(var i = 0; i < visibleFeatureLayers.length; i++)
      {
        var fl = geodash.api.getFeatureLayer(visibleFeatureLayers[i]);
        if(geodash.util.isDefined(extract("popup.panes", fl)))
        {
          var type_lc = extract("type", fl, "").toLowerCase();
          if(type_lc == "geojson")
          {
            featurelayers_geojson.push(fl.id);
          }
          else if(geodash.util.isDefined(extract("wfs", fl)))
          {
            var params = {
              service: "wfs",
              version: extract("wfs.version", fl, '1.0.0'),
              request: "GetFeature",
              srsName: "EPSG:4326",
            };

            var targetLocation = geodash.normalize.point(data);
            var bbox = geodash.tilemath.point_to_bbox(data.location.lon, data.location.lat, z, 4).join(",");
            var typeNames = extract('wfs.layers', fl, undefined) || extract('wms.layers', fl, undefined) || [] ;
            if(geodash.util.isString(typeNames))
            {
              typeNames = typeNames.split(",");
            }
            for(var j = 0; j < typeNames.length; j++)
            {
              var typeName = typeNames[j];
              var url = fl.wfs.url + "?" + geodash.util.objectToArray(geodash.util.extend(params, {typeNames: typeName, bbox: bbox}))
                .map((x:any) => { return x.name+"="+encodeURIComponent(x.value); }).join("&");

              urls.push(url);
              fields_by_featuretype[typeName.toLowerCase()] = geodash.layers.aggregate_fields(fl);
              featurelayers_by_featuretype[typeName.toLowerCase()] = fl;
              if(!typeName.toLowerCase().startsWith("geonode:"))
              {
                featurelayers_by_featuretype["geonode:"+typeName.toLowerCase()] = fl;
              }
            }
          }
        }
      }

      var featureAndLocation = undefined;
      if(featurelayers_geojson.length > 0)
      {
        featureAndLocation = map.forEachFeatureAtPixel(
          [data.pixel.x, data.pixel.y],
          function(feature:any, layer:any){
            // Will attempt to coerce points to lat/lon if possible
            var options = {"projection": {"source": map.getView().getProjection(), "target": "EPSG:4326"}};
            return {
              'layer': layer.get('id'),
              'feature': geodash.normalize.feature(feature, options),
              'location': geodash.normalize.point(ol.proj.toLonLat(map.getCoordinateFromPixel([data.pixel.x, data.pixel.y]), map.getView().getProjection()))
            };
          },
          {
            layerFilter: function(layer:any) {
              return featurelayers_geojson.indexOf(layer.get('id')) != -1;
            }
          }
        );
      }

      if(geodash.util.isDefined(featureAndLocation))
      {
        var intentData = <any>{
          'featureLayer': geodash.api.getFeatureLayer(featureAndLocation.layer),
          'feature': featureAndLocation.feature,
          'location': featureAndLocation.location
        };
        this.bus.emit("render", "geodash:openPopup", intentData, this.name);
      }
      else
      {
        if(urls.length > 0)
        {
          this.bus.request(urls).subscribe(
            (responses:any): void => {
              //var features = geodash.http.build_features(featureData, fields_by_featuretype);
              let features:any = responses.map((response:any): any => {
                return geodash.codec.parseFeatures(response, fields_by_featuretype);
              }).reduce((a:any, b:any) => a.concat(b));

              console.log("Features: ", features);
              if(features.length > 0 )
              {
                var featureAndLocation = geodash.vecmath.getClosestFeatureAndLocation(features, targetLocation);
                var fl = featurelayers_by_featuretype[featureAndLocation.feature.featuretype] || featurelayers_by_featuretype["geonode:"+featureAndLocation.feature.featuretype];
                var intentData = <any>{
                  'featureLayer': fl,
                  'feature': geodash.normalize.feature(featureAndLocation.feature),
                  'location': geodash.normalize.point(featureAndLocation.location)
                };
                this.bus.emit("render", "geodash:openPopup", intentData, this.name);
              }
              else
              {
                $("#popup").popover('dispose');
                map.getOverlays().item(0).setPosition(undefined);
              }
            },
            (err:any): void => console.error(err),
            () => console.log("Loading complete!")
          );
        }
        else
        {
          $("#popup").popover('dispose');
          map.getOverlays().item(0).setPosition(undefined);
        }
      }
    }
  }

}
