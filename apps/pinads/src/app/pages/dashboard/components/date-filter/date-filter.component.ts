import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-date-filter',
  standalone: true,
  imports: [
    CommonModule,
    CalendarModule,
    OverlayPanelModule,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss'],
})
export class DateFilterComponent implements OnChanges {
  @ViewChild(OverlayPanel) overlayPanel!: OverlayPanel;
  @Output() onchangeFilter = new EventEmitter();
  @Input() placeholder = '';
  selectedRangeDate: Array<Date> = [];
  startDate!: Date;
  endDate!: Date;
  readonly FILTER_TYPE = {
    CUSTOM: 'custom',
    LAST_WEEK: 'lastWeek',
    LAST_MONTH: 'lastMonth',
  };
  readonly filterTypeList = [
    { label: 'dateFilter.custom', key: this.FILTER_TYPE.CUSTOM },
    { label: 'dateFilter.lastWeek', key: this.FILTER_TYPE.LAST_WEEK },
    { label: 'dateFilter.lastMonth', key: this.FILTER_TYPE.LAST_MONTH },
  ];
  @Input()
  selectedType: any = this.FILTER_TYPE.CUSTOM;

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['selectedType'].currentValue) {
    //   this.onChangeType(changes['selectedType'].currentValue);
    // }
  }
  onChangeType(type: string) {
    this.selectedType = type;

    switch (type) {
      case this.FILTER_TYPE.LAST_MONTH:
        this.onChangeDate([
          new Date(new Date().setMonth(new Date().getMonth() - 1)),
          new Date(new Date().setMonth(new Date().getMonth())),
        ]);
        this.overlayPanel.hide();
        break;
      case this.FILTER_TYPE.LAST_WEEK:
        this.onChangeDate([
          new Date(new Date().setDate(new Date().getDate() - 7)),
          new Date(new Date().setDate(new Date().getDate())),
        ]);
        this.overlayPanel.hide();
        break;
    }
  }
  onChangeDate(value: Array<Date>) {
    this.selectedRangeDate = value;
    this.startDate = value[0];
    this.endDate = value[1];
    if (value[1] === null) return;
    if (value.length > 1 || value.length === 0) {
      this.onchangeFilter.emit(value);
      this.overlayPanel.hide();
    }
  }
  clear() {
    this.onChangeDate([]);
  }
}
