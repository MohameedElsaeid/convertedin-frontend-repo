import { NgModule } from '@angular/core';
import { FlowBuilderApi } from './base/flow-builder.base';
import { FlowBuilderApiService } from './services/flow-builder.service';

@NgModule({
  providers: [
    {
      provide: FlowBuilderApi,
      useClass: FlowBuilderApiService,
    },
  ],
})
export class FlowBuilderApiModule {}
