import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'numberFormatter',
  standalone: true,
})
export class NumberFormatterPipe implements PipeTransform {
  constructor(private translate: TranslateService) {}
  transform(value: number): string {
    if (value === null || value === undefined) return '-';

    const absValue = Math.abs(value);
    if (absValue >= 1.0e9) {
      return (value / 1.0e9).toFixed(1) + ' ' + this.translate.instant('B');
    }
    if (absValue >= 1.0e6) {
      return (value / 1.0e6).toFixed(1) + ' ' + this.translate.instant('M');
    }
    if (absValue >= 1.0e3) {
      return (value / 1.0e3).toFixed(1) + ' ' + this.translate.instant('K');
    }
    return value.toString();
  }
}
