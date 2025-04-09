import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[blockCopy]',
  standalone: true,
})
export class BlockCopyDirective {
  @HostListener('copy', ['$event']) blockCopy(e: KeyboardEvent) {
    e.preventDefault();
  }
}
