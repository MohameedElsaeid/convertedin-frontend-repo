import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SidebarModule } from 'primeng/sidebar';
import { DropdownModule } from 'primeng/dropdown';
import { FlowBuilderApi, FlowBuilderApiModule } from '@redmose/shared/api';
import { map } from 'rxjs/operators';

@Component({
  selector: 'convertedin-flow-builder-email-templates-list',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    SidebarModule,
    DropdownModule, FlowBuilderApiModule

  ],
  templateUrl: './flow-builder-email-templates-list.component.html',
  styleUrls: ['./flow-builder-email-templates-list.component.scss']
})
export class FlowBuilderEmailTemplatesListComponent implements OnInit {
  languages = [
    { name: 'English', code: 'en' },
    { name: 'Arabic', code: 'ar' }
  ];
  $templates: any;

  @Output() selectTemplate: EventEmitter<any> = new EventEmitter();

  constructor(private __flowBuilderApiService: FlowBuilderApi
  ) {
  }

  fetchTemplates() {
    this.$templates = this.__flowBuilderApiService.getEmailTemplates().pipe(
      map(response => response.data)
    );
  }

  ngOnInit() {
    this.fetchTemplates();
  }

  previewEmail(template: any) {
    this.selectTemplate.emit({
      ...template,
      previewEmail: true
    });
  }
  selectEmail(template: any) {
    this.selectTemplate.emit({
      ...template,
      selectEmail: true
    });
  }
}
