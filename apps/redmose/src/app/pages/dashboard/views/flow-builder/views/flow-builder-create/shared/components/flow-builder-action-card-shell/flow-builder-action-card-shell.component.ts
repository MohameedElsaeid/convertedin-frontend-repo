import { NgClass } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'convertedin-flow-builder-action-card-shell',
  templateUrl: './flow-builder-action-card-shell.component.html',
  styleUrls: ['./flow-builder-action-card-shell.component.scss'],
  standalone: true,
  imports: [ButtonModule, DividerModule, NgClass],
})
export class FlowBuilderActionCardShellComponent {
  //#region Declerations
  @Input({ required: true }) title!: string;
  @Input({ required: true }) icon!: string;
  @Input() hasError!: boolean;
  @Output() deleteClicked: EventEmitter<void> = new EventEmitter();
  @HostBinding('class') class = 'w-full';
  @ViewChild('card') card: ElementRef;
  //#endregion

  //#region Methods
  triggerDelete(event: Event): void {
    event.stopPropagation();
    this.deleteClicked.emit();
  }

  activateFocus(): void {
    setTimeout(() => {
      this.card.nativeElement.focus();
    }, 0);
  }
  //#endregion
}
