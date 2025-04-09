import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shuffledArray',
  standalone: true,
})
export class ShuffledArrayPipe implements PipeTransform {
  preNum: any;
  preValue: any;
  transform(value: any[], num: any): unknown {

    const len = value.length;
    num = num ? num % len : 0;
    if (len === 0 || num < 0 || num >= len) {
      return value.join(' | '); 
    }

    return value.slice(num).concat(value.slice(0, num)).join(' | ');
  }
}
