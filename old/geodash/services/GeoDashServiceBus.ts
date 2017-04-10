declare var extract: any;
declare var geodash: any;
declare var YAML: any;

import { Component, Injectable, OnInit, EventEmitter, ElementRef } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map'

@Injectable()
export class GeoDashServiceBus {

  public channels: EventEmitter<any>[];
  public listeners: any;

  constructor(private http: Http) {
    this.channels = [];
    this.listeners = {};
    ["primary", "intents", "render"].forEach((channel:any) => {
      this.listeners[channel] = {};
      this.channels[channel] = new EventEmitter();
      this.channels[channel].subscribe(
        (args:any): void => {
          let listeners = [].concat(
            extract([channel, "*"], this.listeners, []),
            extract([channel, args[0]], this.listeners, [])
          );
          for(let i = 0; i < listeners.length; i++) {
            listeners[i](args[0], args[1], args[2]);
          }
        },
        (err:any): void => console.error(err),
        () => console.log("Loaded!")
      );
    });

  }

  request(urls: string[]) {
    if(urls.length > 0)
    {
      return Observable.forkJoin(urls.map((url:string):any => {
        return this.http.get(url).map((res:Response):any => {
          if(res.ok) {
            var contentType = res.headers.get("content-type");
            if(contentType == "application/json")
            {
              return JSON.parse(res.text());
            }
            else if(contentType == "text/xml; subtype=gml/2.1.2")
            {
              return res.text();
            }
            else
            {
              return YAML.parse(res.text());
            }
          }
          else
          {
            return undefined;
          }
        })
      }));
    }
    else
    {
      return undefined;
    }
  }

  emit(channel: string, name: string, data: any, source: string): void {
    this.channels[channel].emit([name, data, source]);
  }

  listen(channel: string, name: string, callback: Function): void {
    this.listeners[channel][name] = extract([channel, name], this.listeners, []);
    this.listeners[channel][name].push(callback);
  }

  bubble(name: string, data: any, element: ElementRef): void {
    element.nativeElement.dispatchEvent(new CustomEvent(name, { detail: data, bubbles: true }));
  }

}
