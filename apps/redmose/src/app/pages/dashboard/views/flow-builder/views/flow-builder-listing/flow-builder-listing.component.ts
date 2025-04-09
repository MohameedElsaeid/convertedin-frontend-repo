import { Component, HostBinding, OnInit } from '@angular/core';
import { flowBuilderListingImports } from './imports';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  FlowBuilderApi,
  Flows,
  AutomationInsights,
  User,
  FlowsListingItem,
} from '@redmose/shared/api';
import { SpinnerComponent } from '@redmose/shared/components';
import { Observable, debounceTime, distinctUntilChanged, finalize, startWith, switchMap, tap } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { PaginationService } from '@redmose/shared/services';
import { Store } from '@ngrx/store';
import { selectUserData } from '@redmose/store/app';

@Component({
  selector: 'convertedin-flow-builder-listing',
  standalone: true,
  imports: [flowBuilderListingImports, SpinnerComponent,InputTextModule,ReactiveFormsModule],
  templateUrl: './flow-builder-listing.component.html',
  styleUrls: ['./flow-builder-listing.component.scss'],
  providers: [DialogService, PaginationService],
})
export class FlowBuilderListingComponent implements OnInit {
  //#region Declerations
  @HostBinding('class') class = 'flex flex-column p-5 gap-5 flex-grow-1';

  userData$!: Observable<User | undefined>;
  flows$!: Observable<Flows>;
  cards$!: Observable<{ data: AutomationInsights }>;
  flows: FlowsListingItem[] = [];
  isLoading = false;
  isInsightLoading = true;

  get dir() {
    return document.documentElement.dir;
  }


  //#endregion

 search = new FormControl("");
 searchTerm$ = this.search.valueChanges.pipe(debounceTime(400),distinctUntilChanged(),startWith(""))

  constructor(
    private __flowBuilderApi: FlowBuilderApi,
    private __store: Store,
    protected paginationService: PaginationService
  ) {}

  ngOnInit(): void {
    this.getFlows();
    this.cards$ = this.__flowBuilderApi.getAllOverviewCards().pipe(
      finalize(() => {
        this.isInsightLoading = false;
      })
    );

    this.userData$ = this.__store.select(selectUserData);
  }

  //#region Methods
  getFlows(): void {
    this.flows$ = this.searchTerm$.pipe(switchMap((q)=> {return this.__flowBuilderApi
      .getFlows(
        this.paginationService.pagination?.meta.per_page,
        this.paginationService.pagination?.meta.current_page,
        q
      )
      .pipe(distinctUntilChanged(),
        tap((data) => {
          this.paginationService.updatePagination<Flows>(data);
          this.flows = data.data;
        }),
        finalize(() => {
          this.isLoading = false;
        })
      );} ))
  }

  changePagination(event: any): void {
    this.isLoading = true;
    this.paginationService.paginationChange(event, () => {
      this.getFlows();
    });
  }
  //#endregion
}
