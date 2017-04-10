declare var extract: any;
declare var geodash: any;

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'md2html'})
export class GeoDashPipeMarkdownToHTML implements PipeTransform {
  transform(value: any, flag: any): any {

    return ((flag != false) && (flag != 0)) ? geodash.codec.md2html(value) : value;

  }
}
