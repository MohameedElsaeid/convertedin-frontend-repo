import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy',
  standalone: true
})
export class FilterByPipe implements PipeTransform {

  transform(items: Array<any>, searchValue: string, ...keys: string[]): Array<any> {
    if (!items || !searchValue) return items;

    searchValue = searchValue.toLowerCase()
    return items.filter((item) =>
      keys.some(key => String(item[key]).toLocaleLowerCase().includes(searchValue)
      )
    )
  }

}
