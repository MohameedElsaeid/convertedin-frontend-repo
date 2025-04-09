import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trim',
  standalone: true,
})
export class TrimPipe implements PipeTransform {
  transform(value: string, trimLength: number): string {
    return value
      ? value.length <= trimLength
        ? value
        : value.substring(0, trimLength) + '...'
      : value;
  }
}
