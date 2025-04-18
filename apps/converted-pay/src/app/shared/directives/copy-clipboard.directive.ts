import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[copy-clipboard]',
  standalone: true,
})
export class CopyClipboardDirective {
  @Input("copy-clipboard")
  public payload!: string;

  @Output()
  public copied: EventEmitter<string> = new EventEmitter<string>();

  @HostListener("click", ["$event"])
  public onClick(event: MouseEvent): void {

    event.preventDefault();
    if (!this.payload)
      return;

    navigator.clipboard.writeText(this.payload);
    this.copied.emit(this.payload);
  }
}
