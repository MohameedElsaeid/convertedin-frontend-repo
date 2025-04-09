import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private __messageService: MessageService) {}

  displayToastError(summary: string, detail?: string): void {
    this.__messageService.add({
      key: 'cin-toast',
      severity: 'error',
      summary,
      detail,
    });
  }
}
