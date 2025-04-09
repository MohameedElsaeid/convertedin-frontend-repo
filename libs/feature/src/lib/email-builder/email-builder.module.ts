import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailBuilderComponent } from './email-builder.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

@NgModule({
  declarations: [EmailBuilderComponent],
  imports: [CommonModule, NgxUiLoaderModule],
  exports : [EmailBuilderComponent]
})
export class EmailBuilderModule {}
