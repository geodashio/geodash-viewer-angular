declare var extract: any;
declare var geodash: any;
declare var YAML: any;

import { Component, Injectable, OnInit, EventEmitter } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map'

@Injectable()
export class GeoDashServiceBootloader {

  constructor(private http:Http) {

  }

  request(urls: string[]) {
    if(urls.length > 0)
    {
      return Observable.forkJoin(
        this.http.get(urls[0]).map((res:Response) => {
          if(res.ok) {
            var contentType = res.headers.get("content-type");
            if(contentType == "application/json")
            {
              return JSON.parse(res.text());
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
        }),
      );
    }
    else
    {
      return undefined;
    }
  }

}
