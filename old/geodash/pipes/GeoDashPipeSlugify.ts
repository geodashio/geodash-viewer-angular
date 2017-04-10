declare var extract: any;
declare var geodash: any;

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'slugify'})
export class GeoDashPipeSlugify implements PipeTransform {
  transform(value: any): any {

    if(geodash.util.isString(value))
    {
      return value.toLowerCase().replace(" ", "_").replace("-", "_").replace("=", "_");
    }
    else
    {
      return "";
    }
  }
}
