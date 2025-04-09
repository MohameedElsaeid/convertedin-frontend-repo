import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AccordionModule } from 'primeng/accordion';
@Component({
  selector: 'convertedin-faq',
  standalone: true,
  imports: [AccordionModule,TranslateModule,NgFor,NgIf],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  host: {
    class: 'block p-3 md:p-4',
  },
})
export class FaqComponent {
  
}
