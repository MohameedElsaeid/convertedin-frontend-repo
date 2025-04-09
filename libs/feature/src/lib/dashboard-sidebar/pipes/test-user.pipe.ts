import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'testUser',
})
export class TestUserPipe implements PipeTransform {
  transform(value: boolean, isTestUser?: boolean): boolean {
    return value ? !!(value && isTestUser) : true;
  }
}
