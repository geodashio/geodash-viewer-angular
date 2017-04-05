declare var extract: any;
declare var geodash: any;

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'append'})
export class GeoDashPipeAppend implements PipeTransform {
  transform(value: any, arg: any): any {

    if(geodash.util.isString(value))
    {
      return value + arg;
    }
    else
    {
      return "" + value + arg;
    }
  }
}
