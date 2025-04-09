import { Component, HostBinding, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FlowTemplates,
  FlowBuilderApi,
  FlowBuilderApiModule,
} from '@redmose/shared/api';
import { MenuItem } from 'primeng/api';
import { Observable, finalize, map } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '@redmose/shared/components';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { TabMenuModule } from 'primeng/tabmenu';
import { PaginationService } from '@redmose/shared/services';
import { LocalStorageConstants } from '@redmose/shared/constants';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-flow-builder-templates',
  standalone: true,
  imports: [
    CommonModule,
    TabMenuModule,
    DropdownModule,
    FlowBuilderApiModule,
    FormsModule,
    SpinnerComponent,
    PaginatorModule,
    TranslateModule,
  ],
  templateUrl: './flow-builder-templates.component.html',
  styleUrls: ['./flow-builder-templates.component.scss'],
  providers: [PaginationService],
})
export class FlowBuilderTemplatesComponent implements OnInit {
  //#region Declerations
  @HostBinding('class') class = 'flex flex-column gap-5 py-5 px-4 flex-grow-1';
  templateGroups$!: Observable<MenuItem[]>;
  templates$!: Observable<FlowTemplates>;
  private readonly __featuredId = 9;
  languages: Array<{
    label: string;
    value: string;
  }> = [
    {
      label: 'English',
      value: 'en',
    },
    {
      label: 'Portuguese',
      value: 'pt',
    },
    {
      label: 'العربيه',
      value: 'ar',
    },
  ];

  activeIndex!: MenuItem;
  activeLang!: string;
  loaders = {
    templates: true,
    categories: true,
  };
  get dir() {
    return document.documentElement.dir;
  }
  //#endregion

  constructor(
    private __flowBuilderApi: FlowBuilderApi,
    private __translate: TranslateService,
    protected paginationService: PaginationService
  ) {}

  ngOnInit(): void {
    this.activeLang = localStorage.getItem(LocalStorageConstants.LANGUAGE);
    this.getTemplateGroups();

    this.getFlowTemplates();
  }

  //#region Methods
  getTemplateGroups(): void {
    this.templateGroups$ = this.__flowBuilderApi.getTemplateGroups().pipe(
      finalize(() => {
        this.loaders.categories = false;
      }),
      map((data) => {
        const menuItems = data.groups.map((item) => {
          const menuItem: MenuItem = {
            label: item.name,
            icon: item.id === this.__featuredId ? 'pi-star-fill pi' : '',
            id: item.id.toString(),
          };

          return menuItem;
        });

        this.activeIndex = menuItems.find(
          (item) => item.id === `${this.__featuredId}`
        );

        return menuItems;
      })
    );
  }

  getFlowTemplates(): void {
    this.loaders.templates = true;
    this.templates$ = this.__flowBuilderApi
      .getFlowTemplates(
        parseInt(this.activeIndex?.id || '9'),
        this.activeLang,
        this.paginationService.pagination?.meta.per_page || 10,
        this.paginationService.pagination?.meta.current_page || 1
      )
      .pipe(
        map((data) => {
          this.paginationService.updatePagination<FlowTemplates>(data);
          return {
            ...data,
            data: [
              {
                id: 0,
                name: this.__translate.instant(
                  'automation.templates-blank-title'
                ),
                image: 'app-assets/images/Blank flow.jpg',
                body: this.__translate.instant(
                  'automation.templates-blank-subtitle'
                ),
              },
              ...data.data,
            ],
          };
        })
      )
      .pipe(
        finalize(() => {
          this.loaders.templates = false;
        })
      );
  }

  paginationChange(event: any): void {
    this.paginationService.paginationChange(event, () => {
      this.getFlowTemplates();
    });
  }
}
