import { Component, HostBinding } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProvideEmailTemplateApi } from '@super-admin/shared/api/email-template';

@Component({
  selector: 'convertedin-email-templates',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './email-templates.component.html',
  styleUrls: ['./email-templates.component.scss'],
  providers:[ProvideEmailTemplateApi()]
})
export class EmailTemplatesComponent {
  @HostBinding('class') class = 'flex flex-col grow h-[10000px]';
}
