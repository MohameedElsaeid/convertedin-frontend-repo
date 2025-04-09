import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { provideUserApi, UserApi } from '@converted-pay/shared/api/user';
import { SpinnerComponent } from '@converted-pay/shared/components';
import { TranslateModule } from '@ngx-translate/core';
import { AccordionModule } from 'primeng/accordion';
import { finalize, map, Observable } from 'rxjs';

@Component({
  selector: 'convertedin-faq',
  standalone: true,
  imports: [
    AccordionModule,
    TranslateModule,
    NgFor,
    NgIf,
    AsyncPipe,
    SpinnerComponent,
  ],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  host: {
    class: 'block p-3 md:p-4',
  },
  providers: [provideUserApi()],
})
export class FaqComponent implements OnInit {
  faqList$!: Observable<any[]>;
  isLoading = false;
  activeIndex = [];
  constructor(private userApi: UserApi) {}
  ngOnInit(): void {
    this.getFaqList();
  }
  getFaqList() {
    this.isLoading = true;
    this.faqList$ = this.userApi.getFAQ().pipe(
      map((res) => res.data),
      finalize(() => (this.isLoading = false))
    );
  }
}
