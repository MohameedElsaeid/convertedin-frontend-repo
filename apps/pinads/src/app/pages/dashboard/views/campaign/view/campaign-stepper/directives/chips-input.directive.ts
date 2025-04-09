import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[convertedinChipsInput]',
  standalone: true,
})
export class ChipsInputDirective {
  @HostListener('keydown.enter', ['$event']) onEnter(e: KeyboardEvent) {
    this.emitValue()
  }
  @Output() onAddChip = new EventEmitter();

  emitValue() {
    const elRef = this.el.nativeElement as HTMLInputElement;
    if (!elRef.value) return;
    this.onAddChip.emit(elRef.value);
    elRef.value = '';
  }

  constructor(private el: ElementRef) {}
}
