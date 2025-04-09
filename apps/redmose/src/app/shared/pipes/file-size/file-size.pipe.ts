import { Pipe, PipeTransform } from '@angular/core';
import { FileSize } from '@redmose/shared/models/types';

@Pipe({
  name: 'fileSize',
  standalone: true,
})
export class FileSizePipe implements PipeTransform {
  transform(value: number, size: FileSize): string {
    return `${this.getFileSize(value, size).toFixed(2)} ${size}`;
  }

  private getFileSize(size: number, sizeMode: FileSize): number {
    let newSize = 0;
    switch (sizeMode) {
      case 'KB':
        newSize = size * 0.001;
        break;

      case 'MB':
        newSize = size * 0.000001;
        break;
    }
    return newSize;
  }
}
