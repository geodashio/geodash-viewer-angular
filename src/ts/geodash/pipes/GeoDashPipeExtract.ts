declare var extract: any;
declare var expand: any;
declare var geodash: any;

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'extract'})
export class GeoDashPipeExtract implements PipeTransform {
  transform(value: any, args: any[]): any {

    return args.length > 0 ? extract(expand(args), value) : undefined;

  }
}
