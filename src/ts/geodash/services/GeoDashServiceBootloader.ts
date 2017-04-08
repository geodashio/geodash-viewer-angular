declare var extract: any;
declare var geodash: any;

import { Component, Injectable, OnInit, EventEmitter, ElementRef } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map'

@Injectable()
export class GeoDashServiceBootloader {

  public loaders: any;

  constructor(private http:Http) {
    this.loaders = extract("config.bootloader.loaders", geodash) || [geodash.bootloader.loaders];
  }

  getLoaderFn = (name: string): Function => {
    var loaderFn: Function;
    if(geodash.util.isString(name) && name.length > 0)
    {
      if(geodash.util.isDefined(this.loaders))
      {
        for(var i = 0; i < this.loaders.length; i++)
        {
          var candidate = extract(name, this.loaders[i]);
          if(geodash.util.isFunction(candidate))
          {
            loaderFn = candidate;
            break;
          }
        }
      }
    }
    return loaderFn;
  }

  getResources = (element: ElementRef): any[] => {
    var resources = extract("nativeElement.dataset.dashboardResources", element);
    if(geodash.util.isDefined(resources) && resources != "")
    {
      if(geodash.util.isString(resources))
      {
        try { resources = JSON.parse(resources); } catch(err){ console.log("Error: could not load resources."); }
      }
    }
    return resources;
  }

}
