import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {QueryApi} from './base/query-api';
import {QueryService} from './services/query.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers : [
    {
      provide: QueryApi,
      useClass : QueryService
    }
  ]
})
export class QueryModule { }
