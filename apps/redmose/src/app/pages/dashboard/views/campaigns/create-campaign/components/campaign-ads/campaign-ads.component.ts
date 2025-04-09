import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { CreateCampaignService } from '../../shared/services/create-campaign.service';
import { Store } from '@ngrx/store';
import { CampaignsQuery } from '../../shared/services/campaigns-query';
import { MessageService } from 'primeng/api';
import { CampaignsApi } from '@convertedin/api';
import { setCampaignAdsetsFormValue } from '@redmose/store/actions/campaigns.action';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'convertedin-campaign-ads',
  templateUrl: './campaign-ads.component.html',
  styleUrls: ['./campaign-ads.component.scss'],
})
export class CampaignAdsComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  form: FormGroup;
  campaignState: any;
  formSubmitted = false;
  staticData: any;
  items: any;
  activeReplace: number;
  adsetsList: any;
  @ViewChild('upload')
  upload: ElementRef;
  leadGenerationFormStatus: any;
  totalFiles: number;
  completedFiles: number = 0; // Track completed files for progress
  overallProgress: number = 1; // Track overall progress
  showProgress: boolean = false; // Flag to show/hide progress
  hideProgressTimeout: any; // Timeout handle
  constructor(
    private createCampaignService: CreateCampaignService,
    private store: Store<any>,
    private campaignQuery: CampaignsQuery,
    private messageService: MessageService,
    private campaignsApi: CampaignsApi
  ) {
    this.items = [];
    this.store.select('campaigns').pipe(takeUntil(this.destroy$)).subscribe((state) => {
      this.campaignState = this.campaignQuery.parseCircularToJSON(this.campaignQuery.circularToJSON(state));
      this.formSubmitted = state.pagesConfigurations.adsets.dirty;
      this.setAdsetsList();
    });
    this.store.select('configuration').pipe(takeUntil(this.destroy$)).subscribe((state) => {
      this.staticData = state.staticData;
      this.checkIfAllDataIsLoaded();
    });
    this.campaignQuery.fetchPlatformsOfPixels(
      this.campaignState?.forms.platforms.platforms[0].id
    );

    this.fetchLeadForms();

    this.campaignQuery.fetchPlatformsCTA(
      this.campaignState.forms.objective.id,
      this.campaignState?.forms.platforms.platforms[0].id
    );

    if (!this.staticData?.cta) {
      this.campaignQuery.toggleLoader(true);
    }
  }

  get showIfGetCalls() {
    return this.campaignState?.forms?.objective?.id === 6;
  }

  get showIfNotGetLeads() {
    return this.campaignState?.forms?.objective?.id !== 5;
  }

  checkIfAllDataIsLoaded() {
    if (this.staticData?.cta && !this.form) {
      this.campaignQuery.toggleLoader(false);
      this.initForm();
      this.generateAdsTabsActions();
    }
  }

  fetchLeadForms() {
    this.campaignQuery.fetchLeadGenerationForms(
      this.campaignState?.forms.platforms.platforms[0].id,
      this.campaignState.forms.adsets.adsets[0].pageId.id
    );
  }

  setAdsetsList() {
    let items = [];
    this.campaignState?.forms?.adsets?.adsets?.forEach((adset, index) => {
      items.push({
        label: adset.name,
        value: index,
      });
    });
    this.adsetsList = items;
  }
  streamValuesToStore() {
    this.form.valueChanges
      .pipe(debounceTime(1500),takeUntil(this.destroy$))
      .subscribe((changes) => {
        setTimeout(() => {
          this.store.dispatch(
            setCampaignAdsetsFormValue({
              payload: {
                ...JSON.parse(JSON.stringify(this.form.value)),
                isValid: JSON.parse(JSON.stringify(this.form.valid)),
              },
            })
          );
        }, 100);
      });
  }

  initForm() {
    this.form = this.createCampaignService.createAdsetsForm(
      this.campaignState?.forms || {},
      true,
      this.campaignState?.forms?.objective?.id
    );
    this.streamValuesToStore();
    this.setActiveAdset(0);
    this.setActiveAds(0);
    // this.mediaTypeValueChanges()
    // this.generateAdsetsTabsActions();
  }

  formatTypeChange(i, x, type) {
    console.log(i, x, type);
    // if (type === 'single') {
    //     this.adsets.at(i).get('ads').at(x).get('media').setValidators([RxwebValidators.minLength({
    //         value: 1,
    //         message: 'Media is required',
    //     })]);
    //     this.adsets.at(i).get('ads').at(x).get('media').updateValueAndValidity();
    // } else {
    //     this.adsets.at(i).get('ads').at(x).get('media').setValidators([
    //         RxwebValidators.minLength({
    //             value:2,
    //             message: 'Please upload at least 2 images for the carousel',
    //         })
    //     ]);
    //     this.adsets.at(i).get('ads').at(x).get('media').updateValueAndValidity();
    // }
    if (type === 'single') {
      this.adsets
        .at(i)
        .get('ads')
        .at(x)
        .get('media')
        .setValidators([
          this.createCampaignService.minArrayLength(1, 'Media is required'),
        ]);
      this.adsets.at(i).get('ads').at(x).get('media').updateValueAndValidity();
    } else {
      this.adsets
        .at(i)
        .get('ads')
        .at(x)
        .get('media')
        .setValidators([
          this.createCampaignService.minArrayLength(
            2,
            'Please upload at least 2 images for the carousel'
          ),
        ]);
      this.adsets.at(i).get('ads').at(x).get('media').updateValueAndValidity();
    }
  }

  mediaTypeValueChanges() {
    // this.adsets.valueChanges.pipe(takeUntil(this.destroy$))
    this.adsets.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((changes) => {
        // Filter and process changes in the ads array
        changes.forEach((adset, index) => {
          if (adset && adset.ads) {
            adset.ads.forEach((ads, adsIndex) => {
              console.log(`Changes in ads for adset ${index}:`, adset.ads);
              if (ads.format === 'single') {
                this.adsets
                  .at(index)
                  .get('ads')
                  .at(adsIndex)
                  .setValidators([
                    RxwebValidators.minLength({
                      value: 1,
                      message: 'Media is required',
                      conditionalExpression: (x) => x.format === 'single',
                    }),
                  ]); // Example validators
              } else {
                this.adsets
                  .at(index)
                  .get('ads')
                  .at(adsIndex)
                  .setValidators([
                    RxwebValidators.minLength({
                      value: 2,
                      message:
                        'Please upload at least 2 images for the carousel',
                      conditionalExpression: (x) => x.format === 'carousel',
                    }),
                  ]);
              }
            });
            // Further processing logic for ads changes can go here
          }
        });
        this.adsets.updateValueAndValidity();
      });
  }

  get getAllErrors() {
    return this.createCampaignService.getAllErrors(this.form);
  }

  get controls(): any {
    return this.form ? this.form.controls : null;
  }

  get adsets(): any {
    return this.controls ? (this.controls['adsets'] as FormArray) : null;
  }

  identify(index, item) {
    return item;
  }

  identifyAdsets(index, item) {
    return item;
  }

  identifyAds(index, item) {
    return item;
  }

  identifyMedia(index, item) {
    return item;
  }

  deleteAd(i) {
    if (this.adsets.at(this.controls['active'].value).value.ads.length > 1) {
      this.adsets.at(this.controls['active'].value).get('ads').removeAt(i);
      this.generateAdsTabsActions();
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: 'You must have at least one ad.',
      });
    }
    if (i > 0) {
      this.setActiveAds(i - 1);
    } else {
      this.setActiveAds(0);
    }
  }

  createAdTabAction(i) {
    return [
      {
        label: 'Delete',
        icon: 'pi pi-times',
        index: i,
        command: () => {
          this.deleteAd(i);
        },
      },
    ];
  }

  generateAdsTabsActions() {
    this.items = [];
    this.adsets
      .at(this.controls['active'].value)
      .value.ads.forEach((adset: any, index: number) => {
        this.items.push(this.createAdTabAction(index) as any);
      });
  }

  addNewAd() {
    let index = this.campaignState.forms.adsets.active;
    this.adsets
      .at(index)
      .get('ads')
      .push(this.createCampaignService.adsFormGroup({}));
    //
    // console.log(index)
    // // todo remove in release 2
    // this.adsets.push(this.createCampaignService.createAdsetFormGroup({
    //   platformId: this.campaignState.forms.objective.platforms[0].id,
    //   platformLogo: this.campaignState.forms.objective.platforms[0].logo,
    // }))
    // this.setActiveAdset(this.adsets.length - 1);
    // this.generateAdsetsTabsActions();
  }

  async uploadFile(event, i, x) {
    // Show progress bar
    this.showProgress = true;

    // Get selected files from input element
    const files = event.target.files;

    // Maximum file size allowed (in MB and bytes)
    const maxSizeInMB = 5;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

    // Initialize counters for progress tracking
    this.totalFiles = files.length;
    this.completedFiles = 0;
    this.overallProgress = 0;

    // Iterate through each selected file
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        const file = files[key];

        // Validate file size
        if (file.size > maxSizeInBytes) {
          // Handle case where file size exceeds limit
          this.handleFileSizeExceeded(file, maxSizeInMB);
          continue; // Skip to next file
        }

        try {
          // Upload file to server
          const res = await this.uploadFileToServer(file);

          // Handle successful upload
          this.handleSuccessfulUpload(res, file, i, x);
        } catch (err) {
          // Handle error during upload
          this.handleErrorDuringUpload(err, file);
        }
      }
    }

    // Reset file input element
    this.upload.nativeElement.value = '';

    // Hide progress bar after 3 seconds
    this.hideProgressAfterDelay();
  }

  // Function to handle case where file size exceeds limit
  handleFileSizeExceeded(file: File, maxSizeInMB: number) {
    console.error(
      `File ${file.name} exceeds the size limit of ${maxSizeInMB} MB.`
    );
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: `File ${file.name} exceeds the size limit of ${maxSizeInMB} MB.`,
    });
    this.totalFiles--; // Decrease total files count on error
  }

  // Function to upload file to server
  async uploadFileToServer(file: File) {
    return await this.campaignsApi.upload(file).toPromise();
  }

  // Function to handle successful upload
  handleSuccessfulUpload(res: any, file: File, i: number, x: number) {
    // Create media object with uploaded file details
    const media = {
      id: res.data.id,
      imageUrl: res.data.image,
      type: file.type,
      title: file.name,
    };

    // Update media control in form based on active replace index
    if (this.activeReplace >= 0) {
      this.adsets
        .at(i)
        .get('ads')
        .at(x)
        .get('media')
        .at(this.activeReplace)
        .patchValue(media);
    } else {
      this.adsets
        .at(i)
        .get('ads')
        .at(x)
        .get('media')
        .push(this.createCampaignService.createMediaFormControl(media));
    }

    // Reset activeReplace index
    this.activeReplace = undefined;

    // Increment completed files count and update progress
    this.completedFiles++;
    this.updateOverallProgress();
  }

  // Function to handle error during upload
  handleErrorDuringUpload(err: any, file: File) {
    console.error(`Error uploading file ${file.name}:`, err);
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: `Error uploading file ${file.name}: ${
        err.error?.errors?.file?.[0] || err.message
      }`,
    });
    this.totalFiles--; // Decrease total files count on error
    // Do not increment completedFiles or update progress on error
  }

  // Function to update overall progress based on completed files
  updateOverallProgress() {
    if (this.totalFiles > 0) {
      this.overallProgress = Math.round(
        (this.completedFiles / this.totalFiles) * 100
      );
    } else {
      this.overallProgress = 0;
    }
  }

  // Function to hide progress bar after 3 seconds
  hideProgressAfterDelay() {
    setTimeout(() => {
      this.showProgress = false;
    }, 3000);
  }

  ngOnInit() {}

  removeMedia(i: number, x: number, z: number) {
    this.adsets.at(i).get('ads').at(x).get('media').removeAt(z);
  }

  replaceMedia(i: number, x: number, z: number) {
    this.activeReplace = z;
  }

  setActiveAdset(i: any) {
    console.log(i);
    this.form.patchValue({
      active: i,
    });
  }

  setActiveAds(i: number) {
    this.form.patchValue({
      activeAd: i,
    });
  }

  toggleLeadGenerationForm(status) {
    this.leadGenerationFormStatus = status;
    this.fetchLeadForms();
    console.log(status);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
