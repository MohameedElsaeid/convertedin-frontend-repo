import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { createAiImageImports } from './imports';
import { Observable, Subject, finalize, takeUntil } from 'rxjs';
import {
  CreateAiMediaActions,
  CreateAiMediaState,
  selectAllAiMedia,
} from '@flyerz/store/create-ai-media';
import { Store } from '@ngrx/store';
import { CreateAiMediaApi, provideCreateAiMediaApi } from '@flyerz/shared/api';
import { AnimationOptions } from 'ngx-lottie';
import { Router } from '@angular/router';

@Component({
  selector: 'convertedin-create-ai-image',
  standalone: true,
  imports: createAiImageImports,
  templateUrl: './create-ai-image.component.html',
  styleUrls: ['./create-ai-image.component.scss'],
  providers: [provideCreateAiMediaApi()],
})
export class CreateAiImageComponent implements OnInit, OnDestroy {
  //#region Declerations
  @HostBinding('class') class = 'flex flex-column flex-grow-1';
  createAiMedia$!: Observable<CreateAiMediaState>;
  isPaymentValid: boolean = false;
  loaders: { create: boolean; ai: boolean } = { ai: false, create: false };
  options: AnimationOptions = {
    path: '/assets/lottie/ai_loading.json',
  };
  private __unsubscriber: Subject<void> = new Subject();
  //#endregion

  constructor(
    private __store: Store,
    private __createAiMediaApi: CreateAiMediaApi,
    private __router: Router
  ) {}

  ngOnInit(): void {
    this.createAiMedia$ = this.__store.select(selectAllAiMedia);
  }

  ngOnDestroy(): void {
    this.__store.dispatch(CreateAiMediaActions.resetCreateAiMedia());
    this.__unsubscriber.next();
    this.__unsubscriber.complete();
  }

  //#region Methods
  indexChange(event: any, aiData: CreateAiMediaState): void {
    if (event.index === 2 && event.completed) {
      this.loaders.create = true;
      this.__createAiMediaApi
        .createImage(aiData.imageFile!, aiData.template!.id)
        .pipe(
          finalize(() => {
            this.loaders.create = false;
          }),
          takeUntil(this.__unsubscriber)
        )
        .subscribe((data) => {
          this.loaders.ai = true;
          const timeout = setTimeout(() => {
            this.__router.navigate(['/my-dashboard/studio/ai-image']);
            clearTimeout(timeout);
          }, 3000);
        });
    }
  }
  //#endregion
}
