import { Component, HostBinding, OnInit } from '@angular/core';
import { studioVideoServiceImports } from './imports';
import { AiServiceItem, CreateAiMediaApi } from '@flyerz/shared/api';
import { Observable, finalize } from 'rxjs';

@Component({
  selector: 'convertedin-studio-video-service',
  standalone: true,
  imports: studioVideoServiceImports,
  templateUrl: './studio-video-service.component.html',
  styleUrls: ['./studio-video-service.component.scss'],
})
export class StudioVideoServiceComponent implements OnInit {
  @HostBinding('class') class = 'flex flex-column flex-grow-1';
  userItems$!: Observable<any>;
  isLoading: boolean = true;
  //#endregion

  constructor(private __createAiMediaApi: CreateAiMediaApi) {}

  ngOnInit(): void {
    this.userItems$ = this.__createAiMediaApi.getUserVideos().pipe(
      finalize(() => {
        this.isLoading = false;
      })
    );
  }
}
