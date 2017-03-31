declare var extract: any;
declare var geodash: any;

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'ternary_defined'})
export class GeoDashPipeTernaryDefined implements PipeTransform {
  transform(value: any, args: any[]): any {

  return value ? args[0] : args[1];

  }
}
