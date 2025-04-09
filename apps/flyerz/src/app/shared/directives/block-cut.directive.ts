import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[blockCut]',
  standalone: true,
})
export class BlockCutDirective {
  @HostListener('cut', ['$event']) blockCut(e: KeyboardEvent) {
    e.preventDefault();
  }
}
