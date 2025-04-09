import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[convertedinDragDrop]',
  standalone: true,
})
export class DragDropDirective {
  @Output() filesDropped = new EventEmitter<FileList>();
  private timeout: any;
  @HostBinding('class.fileover') fileOver: boolean = false;
  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = true;
    clearTimeout(this.timeout);
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.timeout = setTimeout(() => {
      this.fileOver = false;
    }, 100);
  }

  @HostListener('drop', ['$event']) onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.filesDropped.emit(files);
    }
  }
}
