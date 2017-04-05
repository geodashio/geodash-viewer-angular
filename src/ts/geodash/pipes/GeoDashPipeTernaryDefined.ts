declare var extract: any;
declare var geodash: any;

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'ternary_defined'})
export class GeoDashPipeTernaryDefined implements PipeTransform {
  transform(value: any, definedValue: any, undefinedValue: any): any {

    return value ? definedValue : undefinedValue;

  }
}
