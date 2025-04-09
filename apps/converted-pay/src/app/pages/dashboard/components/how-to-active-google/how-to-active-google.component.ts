import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-how-to-active-google',
  standalone: true,
  imports: [CommonModule,TranslateModule],
  templateUrl: './how-to-active-google.component.html',
  styleUrls: ['./how-to-active-google.component.scss'],
})
export class HowToActiveGoogleComponent {

  constructor(private dialogRef:DynamicDialogRef){}
  close(){
    this.dialogRef.close();
  }
}
