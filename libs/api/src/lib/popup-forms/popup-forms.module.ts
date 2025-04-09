import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PopupFormsApi} from './base/popup-forms.base';
import {PopupFormsService} from './services/popup-forms.service';
import {QueryModule} from '../query/query.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    QueryModule
  ],
  providers:[
    {
      provide : PopupFormsApi,
      useClass : PopupFormsService
    }
  ]
})
export class PopupFormsApiModule { }
