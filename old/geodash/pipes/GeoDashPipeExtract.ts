declare var extract: any;
declare var expand: any;
declare var geodash: any;

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'extract'})
export class GeoDashPipeExtract implements PipeTransform {
  transform(value: any, ...path: string[]): any {

    return path.length > 0 ? extract(expand(path), value) : undefined;

  }
}
