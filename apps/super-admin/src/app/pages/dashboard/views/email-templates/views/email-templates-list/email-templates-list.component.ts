import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { EmailTemplateCardComponent } from './components';
import { Router, RouterLink } from '@angular/router';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { EmailTemplateApi } from '@super-admin/shared/api/email-template/base/email-template.base';
import { BehaviorSubject, Observable, finalize, map, tap } from 'rxjs';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { EmailTemplate } from '@super-admin/shared/api/email-template';
import { MetaApi, MetaPayload } from '@super-admin/shared/models';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
@Component({
  selector: 'convertedin-email-templates-list',
  templateUrl: './email-templates-list.component.html',
  styleUrls: ['./email-templates-list.component.scss'],
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    EmailTemplateCardComponent,
    RouterLink,
    PaginatorModule,
    ConfirmDialogModule,
    AsyncPipe,
    NgFor,
    NgIf,
    ProgressSpinnerModule,
  ],
  host: {
    class: 'flex flex-col p-6 grow',
  },
  providers: [ConfirmationService],
})
export class EmailTemplatesListComponent implements OnInit {
  search!: string;
  meta!: MetaApi;
  metaPayload: MetaPayload = {
    page: 1,
    per_page: 10,
  };
  isLoading$ = new BehaviorSubject(false);
  templateList$!: Observable<EmailTemplate[]>;

  constructor(
    private confirmationService: ConfirmationService,
    private emailTemplateApi: EmailTemplateApi,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getTemplateList();
  }
  onClickTemplate(template: EmailTemplate): void {
    this.router.navigate(['/dashboard/email-templates/edit/' + template.id]);
  }
  getTemplateList() {
    this.isLoading$.next(true);
    this.templateList$ = this.emailTemplateApi
      .getAllTemplate(this.metaPayload)
      .pipe(
        tap((res) => {
          this.meta = res.meta;
        }),
        map((res) => res.data),
        finalize(() => {
          this.isLoading$.next(false);
        })
      );
  }
  searchTemplate() {
    this.metaPayload = { page: 1, per_page: 10 };
    if (this.search) {
      this.metaPayload['search'] = this.search;
    }
    this.getTemplateList();
  }

  onPageChange(paginator: PaginatorState) {
    console.log(paginator);
    this.metaPayload = {
      page: paginator.page! + 1,
      per_page: paginator.rows!,
    };
    this.getTemplateList();
  }
  deleteTemplate(template: EmailTemplate) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this email template?',
      accept: () => {
        this.emailTemplateApi
          .deleteTemplate(template.id.toString())
          .subscribe((res) => {
            console.log(res);
            this.getTemplateList();
          });
      },
    });
  }
  changeTemplateStatus(template: EmailTemplate) {
    this.emailTemplateApi
      .changeTemplateStatus(template.id.toString())
      .subscribe((res) => {
        console.log(res);
      });
  }
}
