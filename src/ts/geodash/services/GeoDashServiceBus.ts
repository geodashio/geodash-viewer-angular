declare var extract: any;
declare var geodash: any;

import { Component, Injectable, OnInit, EventEmitter } from '@angular/core';

@Injectable()
export class GeoDashServiceBus {

  public channels: EventEmitter<any>[];
  public listeners: any;

  //public primary: EventEmitter<any>;
  //public intents: EventEmitter<any>;

  constructor() {
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

  emit(channel: string, name: string, data: any, source: string): void {
    this.channels[channel].emit([name, data, source]);
  }

  listen(channel: string, name: string, callback: Function): void {
    //this.listeners[channel] = extract(channel, this.listeners, {});
    this.listeners[channel][name] = extract([channel, name], this.listeners, []);
    this.listeners[channel][name].push(callback);
  }

}
