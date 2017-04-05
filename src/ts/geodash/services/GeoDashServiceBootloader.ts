declare var extract: any;
declare var geodash: any;

import { Component, Injectable, OnInit, EventEmitter } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map'

@Injectable()
export class GeoDashServiceBootloader {

  constructor(private http:Http) {

  }


}
