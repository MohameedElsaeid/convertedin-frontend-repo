import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'convertedin-suggestions-button',
  standalone: true,
  imports: [
    CommonModule,
    OverlayPanelModule,
    TranslateModule,
    DialogModule,
    AsyncPipe,
  ],
  templateUrl: './suggestions-button.component.html',
  styleUrls: ['./suggestions-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuggestionsButtonComponent {
  @Input() suggestion$!: Observable<string[]>;
  @Input() label = 'createCampaign.generateWithAi';
  @Input() targetEle: any;
  @Input() title!: string;
  @Input() selectBtnLabel!: string;
  @Output() selectSuggestions = new EventEmitter<string[]>();

  isLoading$ = new BehaviorSubject<boolean>(false);
  suggestions: string[] = [];
  openDialog = false;

  constructor(private cdr:ChangeDetectorRef,private destroyRef: DestroyRef){}

  getSuggestionsKeyword() {
    this.isLoading$.next(true);
    this.suggestion$
      .pipe(
        finalize(() => {
          this.isLoading$.next(false);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((res) => {
        this.suggestions = res;
        this.openDialog = true;
        this.cdr.markForCheck()
      });
  }
  
  onSuggestionSelect(val: string[]) {
    this.openDialog = false;
    this.selectSuggestions.emit(val);
  }
}
