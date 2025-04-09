import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dailyBudget',
  standalone: true,
})
export class DailyBudgetPipe implements PipeTransform {
  transform(value: any): unknown {
    return Number(+value / 30).toFixed(1);
  }
}
