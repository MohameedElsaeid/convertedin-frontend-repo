import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CampaignsQuery } from './shared/services/campaigns-query';
import { MessageService } from 'primeng/api';
import {
  setAllFormValue,
  setSubmittedForm,
  setActiveCampaignForm,
} from '@redmose/store/actions/campaigns.action';

@Component({
  selector: 'convertedin-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.scss'],
})
export class CreateCampaignComponent implements OnInit {
  public visible = true;
  activeForm = 0;
  campaignState: any;
  activePageConfiguration: any;
  currentForm: any;
  mappedRequest: any;
  items = [
    {
      label: 'Campaign Settings',
    },
    {
      label: 'Target Audience',
    },
    {
      label: 'Ad Creatives',
    },
  ];

  constructor(
    private store: Store<any>,
    private campaignsQuery: CampaignsQuery,
    private messageService: MessageService
  ) {
    this.store.select('campaigns').subscribe((state) => {
      this.activeForm = state.activeForm;
      this.campaignState = JSON.parse(JSON.stringify(state));
      this.activePageConfiguration =
        this.campaignState?.pagesConfigurations[
          Object.keys(this.campaignState?.pagesConfigurations)[this.activeForm]
        ];
      this.currentForm =
        this.campaignState?.forms[
          Object.keys(this.campaignState?.forms)[this.activeForm]
        ];
      this.visible = this.campaignState.activeForm <= 2;
      if (this.campaignState?.forms?.objective) {
        // todo remove
        // localStorage.setItem('campaignState', JSON.stringify(this.campaignState))
      }
    });
    if (localStorage.getItem('campaignState')) {
      localStorage.removeItem('campaignState');
      // todo remove
      // this.setFromLocalStorage()
    }
  }

  setFromLocalStorage() {
    if (localStorage.getItem('campaignState')) {
      // save as draft
      this.store.dispatch(
        setAllFormValue({
          payload: JSON.parse(localStorage.getItem('campaignState')),
        })
      );
      this.store.dispatch(
        setSubmittedForm({
          key: 'setup',
          value: false,
        })
      );
      this.store.dispatch(
        setSubmittedForm({
          key: 'adsets',
          value: false,
        })
      );
    }
  }

  ngOnInit() {
    // this.setFromLocalStorage()
    this.campaignsQuery.fetchStaticData();
    // todo remove
    setTimeout(() => {
      // this.toggleForms(true)
    }, 1500);

    setTimeout(() => {
      // this.toggleForms(true)
    }, 2000);
  }

  showDialog() {
    this.visible = true;
  }

  toggleForms(next: boolean) {
    // console.log('active form', this.activeForm);
    // console.log(JSON.stringify(this.campaignState.forms))
    // console.log(this.campaignState.forms)

    // check if page is valid before moving to next page
    this.store.dispatch(
      setSubmittedForm({
        key: Object.keys(this.campaignState?.forms)[this.activeForm],
        value: true,
      })
    );
    if (next) {
      if (this.activeForm === 5 && this.campaignState.forms.adsets.isValid) {
        // console.log('next only');
        this.campaignsQuery.toggleLoader(true);
        // console.log('campaignState', this.campaignState)
        this.campaignsQuery.createCampaign(this.campaignState).subscribe(
          (res) => {
            // console.log('res', res);
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Your campaign created successfully.',
            });
            this.campaignsQuery.toggleLoader(false);
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: '',
            });
            this.campaignsQuery.toggleLoader(false);
          }
        );
      }
      if (this.currentForm?.isValid) {
        this.activeForm += 1;
        this.store.dispatch(
          setActiveCampaignForm({
            payload: this.activeForm,
          })
        );
      }
    } else if (this.activeForm > 0) {
      this.activeForm -= 1;
      this.store.dispatch(
        setActiveCampaignForm({
          payload: this.activeForm,
        })
      );
    }
  }

  nextPage() {
    this.toggleForms(true);
  }
}
