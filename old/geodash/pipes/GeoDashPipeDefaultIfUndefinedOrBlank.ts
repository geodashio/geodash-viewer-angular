declare var extract: any;
declare var geodash: any;

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'default_if_undefined_or_blank'})
export class GeoDashPipeDefaultIfUndefinedOrBlank implements PipeTransform {
  transform(value: any, args: any[]): any {
    return value ? value : args[0];
  }
}
