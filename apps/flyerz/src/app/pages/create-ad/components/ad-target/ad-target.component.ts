import { Component, HostBinding, Input, OnInit, Type } from '@angular/core';
import { MatchAdSuggestions, Post } from '@flyerz/shared/api';
import {
  CreateAdActions,
  CreateAdState,
  selectAdSuggestions,
  selectAllCreateAd,
} from '@flyerz/store/create-ad';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { adTargetImports } from './imports';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'convertedin-ad-target',
  templateUrl: './ad-target.component.html',
  styleUrls: ['./ad-target.component.scss'],
  standalone: true,
  imports: adTargetImports,
})
export class AdTargetComponent implements OnInit {
  //#region Declerations
  @HostBinding('class') class =
    'flex flex-grow-1 flex-column justify-content-center gap-6 align-items-center create-ad__step create-ad__ad-target';
  @Input({ required: true }) post!: Post;
  @Input() hasData: boolean = false;
  isLoading: boolean = true;
  adData$!: Observable<CreateAdState>;
  aiData$!: Observable<{ data: MatchAdSuggestions }>;
  isTargetingCompleted: boolean = false;

  protected readonly _popups = {
    interests: (title: string) => {
      import('../popups/interests-popup/interests-popup.component').then(
        (component) => this.openPopup(component.InterestsPopupComponent, title)
      );
    },

    demographics: (title: string) => {
      import('../popups/demographic-popup/demographic-popup.component').then(
        (component) =>
          this.openPopup(component.DemographicPopupComponent, title)
      );
    },

    behaviours: (title: string) => {
      import('../popups/behaviour-popup/behaviour-popup.component').then(
        (component) => this.openPopup(component.BehaviourPopupComponent, title)
      );
    },
  };
  //#endregion

  constructor(private __store: Store, private __popup: DialogService) {}

  ngOnInit(): void {
    if (this.hasData) {
      this.aiData$ = this.__store.select(selectAdSuggestions);
      this.isTargetingCompleted = true;
    }
    this.adData$ = this.__store.select(selectAllCreateAd).pipe();
  }

  //#region Methods
  openPopup(component: Type<any>, title: string): void {
    this.__popup.open(component, {
      header: title,
      dismissableMask: false,
      styleClass: 'create-ad__suggestion-popup',
    });
  }

  deleteInterest(id: number): void {
    this.__store.dispatch(CreateAdActions.deleteInterestSuggestion({ id }));
  }

  deleteBehaviour(id: number): void {
    this.__store.dispatch(CreateAdActions.deleteBehaviourSuggestion({ id }));
  }

  deleteDemographic(id: number): void {
    this.__store.dispatch(CreateAdActions.deleteDemographicSuggestion({ id }));
  }
  //#endregion
}
