import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateCampaignRoutingModule } from './create-campaign-routing.module';
import { CreateCampaignComponent } from './create-campaign.component';
import { CampaignObjectiveComponent } from './components/campaign-obejctive/campaign-objective.component';
import { CampaignPlatformsComponent } from './components/campaign-platforms/campaign-platforms.component';
import { CampaignSettingsComponent } from './components/campaign-settings/campaign-settings.component';
import { CampaignSetupComponent } from './components/campaign-setup/campaign-setup.component';
import { CampaignAdsetsComponent } from './components/campaign-adsets/campaign-adsets.component';
import { CampaignAdsComponent } from './components/campaign-ads/campaign-ads.component';
import { CampaignConfigurationInfoComponent } from './shared/components/campaign-configuration-info/campaign-configuration-info.component';
import { CampaignSummaryComponent } from './components/campaign-summary/campaign-summary.component';
import { AudienceDefinitionComponent } from './components/audience-definition/audience-definition.component';
import { AdPreviewComponent } from './components/ad-preview/ad-preview.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { CreateCampaignService } from './shared/services/create-campaign.service';
import { CreateCampaignForm } from './shared/services/create-campaign';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { ReactiveFormsModule } from '@angular/forms';
import { CampaignsApiModule } from '@convertedin/api';
import { CampaignsQuery } from './shared/services/campaigns-query';
import { CampaignsQueryService } from './shared/services/campaigns-query.service';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import {ControlErrorsModule, PhoneNumberInputComponent} from '@convertedin/ui';
import { MenuModule } from 'primeng/menu';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeModule } from 'primeng/tree';
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { StepsModule } from 'primeng/steps';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';
import { CreateLeadFormComponent } from './components/create-lead-form/create-lead-form.component';
import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
  declarations: [
    CreateCampaignComponent,
    CampaignObjectiveComponent,
    CampaignPlatformsComponent,
    CampaignSettingsComponent,
    CampaignSetupComponent,
    CampaignAdsetsComponent,
    CampaignAdsComponent,
    CampaignConfigurationInfoComponent,
    CampaignSummaryComponent,
    AudienceDefinitionComponent,
    AdPreviewComponent,
    CreateLeadFormComponent,
  ],
    imports: [
        CommonModule,
        CreateCampaignRoutingModule,
        ConfirmDialogModule,
        ToastModule,
        DialogModule,
        InlineSVGModule,
        ReactiveFormsModule,
        RxReactiveFormsModule,
        CampaignsApiModule,
        CheckboxModule,
        TooltipModule,
        InputTextModule,
        DropdownModule,
        DividerModule,
        InputSwitchModule,
        RadioButtonModule,
        CalendarModule,
        ControlErrorsModule,
        MenuModule,
        SplitButtonModule,
        SliderModule,
        MultiSelectModule,
        TreeSelectModule,
        TreeModule,
        AccordionModule,
        AutoCompleteModule,
        CarouselModule,
        StepsModule,
        ButtonModule,
        InputTextareaModule,
        CardModule,
        PhoneNumberInputComponent,
        ProgressBarModule
    ],
  providers: [
    MessageService,
    ConfirmationService,
    {
      provide: CreateCampaignForm,
      useClass: CreateCampaignService,
    },
    {
      provide: CampaignsQuery,
      useClass: CampaignsQueryService,
    },
  ],
})
export class CreateCampaignModule {}
