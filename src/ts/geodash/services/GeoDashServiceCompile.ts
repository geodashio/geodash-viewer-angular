declare var extract: any;
declare var geodash: any;

import { Component, Injectable, OnInit, EventEmitter } from '@angular/core';

@Injectable()
export class GeoDashServiceCompile {

  private splitter: any;

  constructor() {
    this.splitter = new RegExp("^{{(?:\\s*)(.*?)(?:\\s*)}}$", "gi")
  }

  compile(template: string, ctx: any): string {
    //console.log("compiling ", template, "with context", ctx);
    //var m = "{{ feature.attributes.date | date : 'months' }} months".match(new RegExp("({{.*}}|.*)", "gi"));
    if(geodash.util.isString(template))
    {

      let parts = template.split(new RegExp("({{[^}]*}})", "gi")).map((x:any) => {
        var y = this.splitter.exec(x);
        if(y)
        {
          return extract(y[1], ctx, "");
        }
        else
        {
          return x;
        }
      });

      return parts.join("");
    }
    else
    {
      return "";
    }

  }
}
