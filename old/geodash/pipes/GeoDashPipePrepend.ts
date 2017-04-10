declare var extract: any;
declare var geodash: any;

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'prepend'})
export class GeoDashPipePrepend implements PipeTransform {
  transform(value: any, arg: any): any {

    if(geodash.util.isString(value))
    {
      return arg + value;
    }
    else
    {
      return "" + arg + value;
    }
  }
}
