import { Component, HostBinding, OnInit } from '@angular/core';
import { studioImageServiceImports } from './imports';
import { AiServiceItem, CreateAiMediaApi } from '@flyerz/shared/api';
import { Observable, finalize, tap } from 'rxjs';
import { PaginationService } from '@flyerz/shared/services';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'convertedin-studio-image-service',
  standalone: true,
  imports: studioImageServiceImports,
  templateUrl: './studio-image-service.component.html',
  styleUrls: ['./studio-image-service.component.scss'],
  providers: [PaginationService],
})
export class StudioImageServiceComponent implements OnInit {
  @HostBinding('class') class = 'flex flex-column flex-grow-1';
  userItems$!: Observable<{ data: Array<AiServiceItem> }>;
  isLoading: boolean = true;
  options: AnimationOptions = {
    path: '/assets/lottie/image-studio.json',
  };
  get data() {
    return this._pagination.pagination.data;
  }
  //#endregion

  constructor(
    private __createAiMediaApi: CreateAiMediaApi,
    protected _pagination: PaginationService<AiServiceItem>
  ) {}

  ngOnInit(): void {
    this._pagination.init();
    this.getImages();
  }

  getImages(): void {
    if (!this._pagination.pagination.reachedTotalCount) {
      this.isLoading = true;
      this.userItems$ = this.__createAiMediaApi
        .getUserImages(
          this._pagination.pagination.offset,
          this._pagination.pagination.limit
        )
        .pipe(
          finalize(() => {
            this.isLoading = false;
          }),
          tap(({ data }) => {
            this._pagination.processData(data);
          })
        );
    }
  }
}
