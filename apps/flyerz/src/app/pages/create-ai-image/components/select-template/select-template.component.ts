import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AiTemplate, CreateAiMediaApi } from '@flyerz/shared/api';
import { PaginationService } from '@flyerz/shared/services';
import { Observable, finalize, tap } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import {
  CreateAdHeaderComponent,
  SpinnerComponent,
} from '@flyerz/shared/components';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Store } from '@ngrx/store';
import { CreateAiMediaActions } from '@flyerz/store/create-ai-media';

@Component({
  selector: 'convertedin-select-template',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    CreateAdHeaderComponent,
    SpinnerComponent,
    InfiniteScrollModule,
  ],
  templateUrl: './select-template.component.html',
  styleUrls: ['./select-template.component.scss'],
  providers: [PaginationService],
})
export class SelectTemplateComponent implements OnInit {
  //#region Declerations
  @HostBinding('class') class =
    'flex flex-grow-1 flex-column justify-content-center gap-6 align-items-center create-ad__step max-h-full';
  @Input() activeTemplate!: AiTemplate;

  templates$!: Observable<{ data: AiTemplate[] }>;
  loaders: { initial: boolean; paginated: boolean } = {
    initial: true,
    paginated: false,
  };
  //#endregion

  constructor(
    private __createAiMedia: CreateAiMediaApi,
    private __store: Store,
    protected _pagination: PaginationService<AiTemplate>
  ) {}

  ngOnInit(): void {
    this._pagination.init();
    this.getTemplates();
  }

  //#region Methods
  getTemplates(): void {
    if (!this._pagination.pagination.reachedTotalCount) {
      !this.loaders.initial && (this.loaders.paginated = true);
      this.templates$ = this.__createAiMedia
        .getImageTemplates(
          this._pagination.pagination.offset,
          this._pagination.pagination.limit
        )
        .pipe(
          tap(({ data }) => {
            this._pagination.processData(data);
          }),
          finalize(() => {
            this.loaders.initial = false;
            this.loaders.paginated = false;
          })
        );
    }
  }

  selectTemplate(template: AiTemplate): void {
    this.activeTemplate = template;
    this.__store.dispatch(
      CreateAiMediaActions.setCreateAiMediaTemplate({ template })
    );
  }
  //#endregion
}
