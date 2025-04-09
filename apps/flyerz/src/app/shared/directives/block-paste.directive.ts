import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[blockPaste]',
  standalone: true,
})
export class BlockPasteDirective {
  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
    e.preventDefault();
  }
}
