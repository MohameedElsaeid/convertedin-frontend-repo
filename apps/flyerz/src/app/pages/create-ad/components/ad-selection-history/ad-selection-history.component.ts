import { CommonModule } from '@angular/common';
import {
  Component,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  CreateAdApi,
  CreateAdChannelType,
  MatchAdSuggestions,
  ReachEstimate,
} from '@flyerz/shared/api';
import { CreateAdState } from '@flyerz/store/create-ad';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { getSocialMediaImg } from '../../utilities';

@Component({
  selector: 'convertedin-ad-selection-history',
  templateUrl: './ad-selection-history.component.html',
  styleUrls: ['./ad-selection-history.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule],
})
export class AdSelectionHistoryComponent implements OnChanges {
  //#region Declerations
  @HostBinding('class') class =
    'create-ad__details-container align-self-stretch gap-3 flex';
  @Input({ required: true }) adData!: CreateAdState;
  reachEstimate$!: Observable<{ data: ReachEstimate }>;
  get channelType() {
    return CreateAdChannelType;
  }
  get getSocialMediaImg() {
    return getSocialMediaImg;
  }
  //#endregion

  constructor(private __createAdApi: CreateAdApi) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.getReachEstimate(this.adData.adSuggestions!);
  }

  //#region Methods
  getReachEstimate(data: MatchAdSuggestions): void {
    this.reachEstimate$ = this.__createAdApi.createReachEstimate(data);
  }
  //#endregion
}
