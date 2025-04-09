import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '@redmose/shared/components';
import { Observable, finalize } from 'rxjs';
import { PeopleApi, Segment } from '@redmose/shared/api';

@Component({
  selector: 'convertedin-segments-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    AutoCompleteModule,
    FormsModule,
    SpinnerComponent,
  ],
  templateUrl: './segments-table.component.html',
  styleUrls: ['./segments-table.component.scss'],
})
export class SegmentsTableComponent implements OnInit {
  isLoading: boolean;
  $groups!: Observable<{ data: Segment[] }>;

  constructor(private _peopleApi: PeopleApi) {
    this.isLoading = true;
  }

  ngOnInit(): void {
    this.$groups = this._peopleApi.getAllSegmentGroups().pipe(
      finalize(() => {
        this.isLoading = false;
      })
    );
  }
}
