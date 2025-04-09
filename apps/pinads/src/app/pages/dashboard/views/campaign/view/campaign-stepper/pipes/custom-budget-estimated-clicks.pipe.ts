import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customBudgetEstimatedClicks',
  standalone: true,
})
export class CustomBudgetEstimatedClicksPipe implements PipeTransform {
  transform(value: any, recommendedBudget:string,recommendedClicks:number): string {
    if(!value) return '0';
    const estimatedClicks = (value / +recommendedBudget) * recommendedClicks;
    return estimatedClicks.toFixed(0)
  }
}
