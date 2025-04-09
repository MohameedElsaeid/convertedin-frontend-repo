import { Pipe, PipeTransform } from '@angular/core';

const MINUTE_IN_SECONDS=60

@Pipe({
  name: 'countDownTimer',
  standalone: true
})
export class CountDownTimerPipe implements PipeTransform {

  transform(val: number | null): unknown {
    if (!val) return '00:00'
    const minute = Math.floor(val / MINUTE_IN_SECONDS);
    const seconds = Math.floor(val % MINUTE_IN_SECONDS)
    const formatedMinute = minute >= 10 ? minute : '0' + minute
    const formatedval = seconds >= 10 ? seconds : '0' + seconds
    return formatedMinute.toString() + ":" + formatedval.toString();
  }

}
