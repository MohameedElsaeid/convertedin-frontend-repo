import { Pipe, PipeTransform } from '@angular/core';
import { AccessControlItem } from '../models';

@Pipe({
  standalone: true,
  name: 'accessControl',
})
export class AccessControlPipe implements PipeTransform {
  transform(
    value: string | undefined,
    accessControlItems?: Array<AccessControlItem>
  ): boolean {
    if (value) {
      const accessControlItem = accessControlItems?.find(
        (item) => item.name === value
      );

      return accessControlItem?.enabled || false;
    }

    return true;
  }
}
