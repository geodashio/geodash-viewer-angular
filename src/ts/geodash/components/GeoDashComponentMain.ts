declare var extract: any;
declare var geodash: any;

/* Components */
import { Component, OnInit, EventEmitter } from '@angular/core';
import {Http, Response} from '@angular/http';

/* Services */
import { GeoDashServiceBus }  from './../../geodash/services/GeoDashServiceBus';
import { GeoDashServiceBootloader }  from './../../geodash/services/GeoDashServiceBootloader';
import { GeoDashServiceCompile }  from './../../geodash/services/GeoDashServiceCompile';

@Component({
  selector: 'geodash-main',
  template: extract(['templates', 'merged', 'geodashMain.tpl.html'], geodash),
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

  constructor(private bus: GeoDashServiceBus, private bootloader: GeoDashServiceBootloader, private compileService: GeoDashServiceCompile) {

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
    this.bootloader.request(urls).subscribe(
      (data:any): void => {
        this.dashboard = data[0];
        this.bus.emit("primary", "geodash:loaded", <any>{ dashboard: this.dashboard }, this.name);
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

    if(name == "flyToLocation") {
      let renderData = <any>{
        "lat": extract("lat", data),
        "lon": extract("lon", data),
        "zoom": extract("zoom", data),
        "projection": extract("projection", data),
        "animations": ["pan", "bounce"]
      };
      this.bus.emit("render", "geodash:changeView", renderData, this.name);
    }
  }

}
