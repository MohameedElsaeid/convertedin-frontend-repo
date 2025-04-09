import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AdLead, AdLeads, AdsApi } from '@flyerz/shared/api';
import { Observable, finalize, tap } from 'rxjs';
import { SpinnerComponent } from '@flyerz/shared/components';

@Component({
  selector: 'convertedin-ad-details-leads',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    TableModule,
    ButtonModule,
    SpinnerComponent,
  ],
  templateUrl: './ad-details-leads.component.html',
  styleUrls: ['./ad-details-leads.component.scss'],
})
export class AdDetailsLeadsComponent implements OnInit {
  //#region Declerations
  @Input({ required: true }) adId!: number;
  @HostBinding('class') class = 'flex-grow-1 flex flex-column gap-4 max-w-full';
  leads$!: Observable<AdLeads>;
  isLoading: boolean = true;
  isTableLoading: boolean = false;
  previousPaginationUrls: Array<string> = [];
  nextPaginationUrl?: string;
  data: Array<AdLead> = [];
  get dir() {
    return document.documentElement.dir;
  }
  //#endregion

  constructor(private __adsApi: AdsApi) {}

  ngOnInit(): void {
    this.getLeads();
  }

  //#region Methods
  getLeads(next?: string): void {
    this.leads$ = this.__adsApi.getAdLeads(this.adId, next).pipe(
      finalize(() => {
        this.isLoading = false;
        this.isTableLoading = false;
      }),
      tap(({ data }) => {
        this.nextPaginationUrl = data.next;
        this.data = data.data;
      })
    );
  }

  goToPrevious(): void {
    this.isTableLoading = true;
    this.getLeads(this.previousPaginationUrls.pop());
  }

  goToNext(): void {
    this.isTableLoading = true;
    this.previousPaginationUrls.push(this.nextPaginationUrl!);
    this.getLeads(this.nextPaginationUrl);
  }
  //#endregion
}
