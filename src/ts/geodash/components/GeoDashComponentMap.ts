declare var extract: any;
declare var geodash: any;

/* Components */
import { Component, OnInit, EventEmitter } from '@angular/core';

/* Services */
import { GeoDashServiceBus }  from './../../geodash/services/GeoDashServiceBus';

@Component({
  selector: 'geodash-map',
  template: extract(['templates', 'merged', 'geodashMap.tpl.html'], geodash),
})
export class GeoDashComponentMap implements OnInit {
  name = 'GeoDashComponentMap';

  constructor(private bus: GeoDashServiceBus) {

  }

  ngOnInit(): void {

  }

}
