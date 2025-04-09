import {Component, OnDestroy, OnInit} from '@angular/core';
import {CreateCampaignService} from '../../shared/services/create-campaign.service';
import {Store} from '@ngrx/store';
import {CampaignsQuery} from '../../shared/services/campaigns-query';
import {FormArray, FormGroup} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {prop, RxwebValidators, toDouble,} from '@rxweb/reactive-form-validators';
import {debounceTime, Subject, takeUntil} from 'rxjs';
import {TreeFilterEvent} from 'primeng/tree';
import {AutoCompleteCompleteEvent} from 'primeng/autocomplete';
import {unionBy} from 'lodash';
import {setCampaignAdsetsFormValue} from '@redmose/store/actions/campaigns.action';

@Component({
  selector: 'convertedin-campaign-adsets',
  templateUrl: './campaign-adsets.component.html',
  styleUrls: ['./campaign-adsets.component.scss'],
})
export class CampaignAdsetsComponent implements OnInit, OnDestroy{
  destroy$: Subject<boolean> = new Subject<boolean>();
  items: any = [];
  form: FormGroup;
  campaignState: any;
  formSubmitted = false;
  staticData: any;
  today = new Date();
  endDateMin: any;
  @prop()
  @toDouble()
  budget: number;
  demographics: any[] = [];
  behaviors: any[] = [];
  interests: any[] = [];
  
  isDemographicsLoaded: Boolean;
  isBehaviorsLoaded: Boolean;
  isInterestsLoaded: Boolean;

  demographicsSelection: any = {};
  behaviorsSelection: any = {};
  interestsSelection: any = {};

  mappedPlacements: any[] = [];
  goals: any;


  constructor(
    private createCampaignService: CreateCampaignService,
    private store: Store<any>,
    private campaignQuery: CampaignsQuery,
    private messageService: MessageService
  ) {
    this.items = [];
    this.campaignsSubscription();
    this.configurationsSubscription();
    if (!this.staticData?.pages) {
      this.campaignQuery.toggleLoader(true);
    }
    if (!this.staticData?.events) {
      this.campaignQuery.toggleLoader(true);
    }
  }

  campaignsSubscription() {
    this.store.select('campaigns').pipe(takeUntil(this.destroy$)).subscribe((state) => {
      let data = this.campaignQuery.parseCircularToJSON(this.campaignQuery.circularToJSON(state));
      this.campaignState = data;
      this.formSubmitted = this.campaignState?.forms?.adsets?.submitted;
    });
  }
  configurationsSubscription() {
    this.store.select('configuration').pipe(debounceTime(2000),takeUntil(this.destroy$)).subscribe((state) => {
      let data = this.campaignQuery.parseCircularToJSON(this.campaignQuery.circularToJSON(state))
      this.staticData = data.staticData;
      this.checkIfAllDataIsLoaded();
    });
  }
  isFirstTimeCalled; // check if this function loaded before to enhance performance //TODO REMOVE
  checkIfAllDataIsLoaded() {
    if (
      this.staticData?.demographics &&
      this.staticData?.behaviors &&
      this.staticData?.interests &&
      this.staticData?.countries &&
      this.staticData?.languages &&
      this.staticData?.platformsOfPlatform &&
      this.staticData?.placements &&
      this.staticData?.goals
    ) {
      this.campaignQuery.toggleLoader(false);
      if(!this.isFirstTimeCalled) {
        this.initForm();
        this.isFirstTimeCalled = true;
      }
      this.setDemographicsList();
      this.setBehaviorsList();
      this.setInterestsList(); 
      
      this.setLanguages();
      this.setGoals();
      this.fetchAllAdsetesCites();
      this.updatePlacementsInitial();
    }
  }

  setDemographicsList() {
    if (!this.isDemographicsLoaded && this.staticData?.demographics) {
      this.setDemographics();
      this.isDemographicsLoaded = true;
    }
  }
  setDemographics() {
    this.adsets.value.forEach((adset: any, index: number) => {
        if(adset?.targeting?.demographics?.list.length > 0) {
          this.demographics[index] = adset?.targeting?.demographics?.list
          this.demographicsSelection[index] = adset?.targeting?.demographics?.selection;
          this.setAdsetDemographics(index);
        } else {
          this.demographics[index] = this.staticData?.demographics
        }
    });
  }
  setAdsetDemographics(index,isDuplicate=false) {
      if(isDuplicate){
        this.adsets
        .at(index)
        .get('targeting')
        .get('demographics')
        .patchValue({
          list: this.campaignQuery.parseCircularToJSON(this.campaignQuery.circularToJSON(this.adsets?.value[index-1].targeting?.demographics?.list)),
        });
        this.demographics[index] = this.campaignQuery.parseCircularToJSON(this.campaignQuery.circularToJSON(this.adsets?.value[index].targeting?.demographics?.list))
        this.demographicsSelection[index] = this.campaignQuery.parseCircularToJSON(this.campaignQuery.circularToJSON(this.adsets?.value[index].targeting?.demographics?.selection));     
      } else {
        this.adsets
        .at(index)
        .get('targeting')
        .get('demographics')
        .patchValue({
          list: this.demographics[index] ? this.demographics[index] : this.staticData.demographics,
        });
      }
  }

  setInterestsList() {
    if (!this.isInterestsLoaded && this.staticData?.interests) {
      this.setInterests();
      this.isInterestsLoaded = true;
    }
  }
  setInterests() {
    this.adsets.value.forEach((adset: any, index: number) => {
      if(adset?.targeting?.demographics?.list.length > 0) {
        this.interests[index] = adset?.targeting?.interests?.list
        this.interestsSelection[index] = adset?.targeting?.interests?.selection;
        this.setAdsetInterests(index);
      } else {
        this.interests[index] = this.staticData?.interests
      }
    });
  }
  setAdsetInterests(index,isDuplicate=false) {
   if(isDuplicate) {
    this.adsets
    .at(index)
    .get('targeting')
    .get('interests')
    .patchValue({
      list: this.campaignQuery.parseCircularToJSON(this.campaignQuery.circularToJSON(this.adsets?.value[index-1].targeting?.interests?.list)),
    });
    this.interests[index] = this.campaignQuery.parseCircularToJSON(this.campaignQuery.circularToJSON(this.adsets?.value[index].targeting?.interests?.list))
    this.interestsSelection[index] = this.campaignQuery.parseCircularToJSON(this.campaignQuery.circularToJSON(this.adsets?.value[index].targeting?.interests?.selection));
   } else {
    this.adsets
    .at(index)
    .get('targeting')
    .get('interests')
    .patchValue({
      list: this.interests[index] ? this.interests[index] : this.staticData.interests,
    });
   }
  }

  setBehaviorsList() {
    if (!this.isBehaviorsLoaded && this.staticData?.behaviors) {
      this.setBehaviors();
      this.isBehaviorsLoaded = true;
    }
  }
  setBehaviors() {
    this.adsets.value.forEach((adset: any, index: number) => {
      if(adset?.targeting?.beahviours?.list.length > 0) {
        this.behaviors[index] = adset?.targeting?.beahviours?.list
        this.behaviorsSelection[index] = adset?.targeting?.beahviours?.selection;
        this.setAdsetBehaviors(index);
      } else {
        this.behaviors[index] = this.staticData?.behaviors
      }
    });
  }
  setAdsetBehaviors(index,isDuplicate=false) {
    if(isDuplicate) {
      this.adsets
      .at(index)
      .get('targeting')
      .get('beahviours')
      .patchValue({
        list: this.campaignQuery.parseCircularToJSON(this.campaignQuery.circularToJSON(this.adsets?.value[index-1].targeting?.beahviours?.list)),
      });
      this.behaviors[index] = this.campaignQuery.parseCircularToJSON(this.campaignQuery.circularToJSON(this.adsets?.value[index].targeting?.interests?.list))
      this.behaviorsSelection[index] = this.campaignQuery.parseCircularToJSON(this.campaignQuery.circularToJSON(this.adsets?.value[index].targeting?.beahviours?.selection));
     } else {
      this.adsets
      .at(index)
      .get('targeting')
      .get('beahviours')
      .patchValue({
        list: this.behaviors[index] ? this.behaviors[index] : this.staticData.behaviors,
      });
     }
  }
  

  setGoals() {
    (this.adsets as FormArray).controls.forEach(control => {
      if(!control.get('goal').value) {
        control.get('goal').patchValue(this.staticData.goals[0]);
        control.get('bid_startegy').patchValue('LOWEST_COST_WITHOUT_CAP');
      }
    });
  }

  setLanguages() {
    if (this.staticData.languages) {
      this.staticData.languages.unshift({
        id: 0,
        title: 'All Languages',
      });
    }
  }
  

  get controls(): any {
    return this.form ? this.form.controls : null;
  }

  get adsets(): any {
    return this.controls ? (this.controls['adsets'] as FormArray) : null;
  }
  streamValuesToStore() {
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$),debounceTime(2000))
      .subscribe((changes) => {
        this.setAdsForAdsetsIfExists();
        setTimeout(() => {
          this.store.dispatch(
            setCampaignAdsetsFormValue({
              payload: {
                ...this.campaignQuery.parseCircularToJSON(
                  this.campaignQuery.circularToJSON(this.form.value)
                ),
                isValid: this.campaignQuery.parseCircularToJSON(
                  this.campaignQuery.circularToJSON(this.form.valid)
                ),
              },
            })
          );
        }, 100);
      });
  }

  createAdsetTabAction(i) {
    let adsets = JSON.parse(JSON.stringify(this.adsets.value));
    return [
      {
        label: 'Duplicate',
        icon: 'pi pi-copy',
        index: i,
        command: (e) => {
          this.duplicateAdset(e.item.index);
        },
      },
      {
        label: 'Copy From',
        icon: 'pi pi-file-edit',
        index: i,
        items: adsets
          .filter((adset: any, index: number) => index !== i)
          .map((adset: any, index: number) => {
            return {
              label: adset.name,
              icon: 'pi pi-file-edit',
              index: i,
              copyIndex: index,
              command: (e) => {
                this.copyAdset(e.item.index, index);
              },
            };
          }),
      },
      // {
      //   label: 'Go to Ads',
      //   icon: 'pi pi-images',
      //   index: i,
      //   command: () => {
      //     // this.delete();
      //   },
      // },
      {separator: true},
      {
        label: 'Delete',
        icon: 'pi pi-times',
        index: i,
        command: () => {
          this.deleteAdset(i);
        },
      },
    ];
  }
  setAdsForAdsetsIfExists() {
    (this.form.get('adsets') as FormArray)?.controls?.forEach((adsetControl,index)=>{
      if(this.campaignState?.forms?.adsets?.adsets && 
        this.campaignState?.forms?.adsets?.adsets[index]?.ads?.length && 
        JSON.stringify(adsetControl.get('ads').value) !== JSON.stringify([...this.campaignState?.forms?.adsets?.adsets[index]?.ads])
      ) {
        adsetControl.get('ads').setValue([...this.campaignState?.forms?.adsets?.adsets[index]?.ads])
      }
    })
  }
  initForm() {
    this.form = this.createCampaignService.createAdsetsForm(
      this.campaignState?.forms || {}
    );
    this.streamValuesToStore();
    this.endDateMin = new Date();
    this.generateAdsetsTabsActions();
    this.setAdsetsPlacments();
    this.toggleRunningForever();
  }
  
  fetchAllAdsetesCites() {
    this.adsets.value.forEach((adset: any, index: number) => {
      if (
        adset.targeting.locations.countries.length &&
        !this.staticData.cites
      ) {
        this.fetchCites(index);
      }
    });
  }

  setAdsetsPlacments() {
    this.adsets.value.forEach((adset: any, index: number) => {
      this.setAllValues(index);
    });
  }

  generateAdsetsTabsActions() {
    this.items = [];
    this.adsets.value.forEach((adset: any, index: number) => {
      this.items.push(this.createAdsetTabAction(index) as any);
    });
  }

  ngOnInit() {
    // todo remove in release 2 and let it to be dynamic

    this.campaignQuery.fetchCountries();
    this.campaignQuery.fetchLooklike(
      this.campaignState?.forms.platforms.platforms[0].id
    );
    this.campaignQuery.fetchDemoGraphics(
      this.campaignState?.forms.platforms.platforms[0].id
    );
    this.campaignQuery.fetchDemoBehaviors(
      this.campaignState?.forms.platforms.platforms[0].id
    );
    this.campaignQuery.fetchDemoInterests(
      this.campaignState?.forms.platforms.platforms[0].id
    );
    this.campaignQuery.fetchPlatformsOfPlatform(
      this.campaignState?.forms.platforms.platforms[0].id
    );
    this.campaignQuery.fetchPlatformsOfPlacements(
      this.campaignState?.forms.platforms.platforms[0].id
    );
    this.campaignQuery.fetchCustomAudience(
      this.campaignState?.forms.platforms.platforms[0].id
    );

    this.campaignQuery.fetchObjectivesGoals(
      this.campaignState.forms.objective.id,
      this.campaignState?.forms.platforms.platforms[0].id
    );

    // if (!this.staticData.pages) {
    this.campaignQuery.fetchPlatformsPages(
      this.campaignState.forms.objective.platforms[0].id
    );

    this.campaignQuery.fetchObjectivesEvents(
        this.campaignState.forms.objective.id
    );
    // this.campaignQuery.fetchLeadGenerationForms(
    //   this.campaignState?.forms.platforms.platforms[0].id,
    //   1
    // );
    // }
    // this.fetchCustomAudience(0);
  }

  get getAllErrors() {
    return this.createCampaignService.getAllErrors(this.form);
  }

  setActiveAdset(i: number) {
    this.form.patchValue({
      active: i,
    });
  }

  addNewAdset() {
    // todo remove in release 2
    this.demographicsSelection[this.adsets.length] = [];
    this.adsets.push(
      this.createCampaignService.createAdsetFormGroup({
        platformId: this.campaignState.forms.objective.platforms[0].id,
        platformLogo: this.campaignState.forms.objective.platforms[0].logo,
      })
    );

    this.setAdsetDemographics(this.adsets.length - 1);
    this.setAdsetBehaviors(this.adsets.length - 1);
    this.setAdsetInterests(this.adsets.length - 1);
    this.setGoals();

    this.setActiveAdset(this.adsets.length - 1);
    
    this.generateAdsetsTabsActions();
    this.setAdsetsPlacments();
    this.toggleRunningForever();
  }

  duplicateAdset(i) {    
    this.demographicsSelection[this.adsets.length] = [];
    this.adsets.push(
      this.createCampaignService.createAdsetFormGroup(this.adsets.value[i])
    );

    this.setAdsetDemographics(this.adsets.length - 1,true);
    this.setAdsetBehaviors(this.adsets.length - 1,true);
    this.setAdsetInterests(this.adsets.length - 1,true);

    this.generateAdsetsTabsActions();
    this.setAdsetsPlacments();
    this.toggleRunningForever();
    setTimeout(() => {
      this.setActiveAdset(this.adsets.length - 1);
    }, 50);
  }

  copyAdset(i, x) {
    this.adsets.removeAt(i);
    this.adsets.insert(
      i,
      this.createCampaignService.createAdsetFormGroup(this.adsets.value[x])
    );
    this.setActiveAdset(this.adsets.length - 1);
    this.generateAdsetsTabsActions();
    this.setAdsetsPlacments();
    this.toggleRunningForever();
  }

  deleteAdset(i) {
    if (this.adsets.length > 1) {
      this.adsets.removeAt(i);
      this.generateAdsetsTabsActions();
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: 'You must have at least one adset.',
      });
    }
    if (i > 0) {
      this.setActiveAdset(i - 1);
    } else {
      this.setActiveAdset(0);
    }
  }

  validateStartEndDates(i) {
    // this.status = false
    const startDate = this.adsets.at(i).get('schedule').get('start')?.value;
    const endDate = this.adsets.at(i).get('schedule').get('end')?.value;
    let date = new Date();
    this.endDateMin = startDate;
    if (startDate && endDate) {
      if (startDate > endDate) {
        this.adsets.at(i).get('schedule').patchValue({end: null});
      } else {
      }
    }
  }

  identify(index, item) {
    return item.key;
  }

  identifyAdsets(index, item) {
    return item;
  }
  identifySubGoals(index, item) {
    return item;
  }


  fetchCites(i) {
    //todo
    this.campaignQuery.fetchCites(
      this.adsets.at(i).get('targeting').get('locations').get('countries').value,
      this.adsets.at(i).get('platformId').value
    );
  }

  fetchCustomAudience(i) {
    this.campaignQuery.fetchCustomAudience(
      this.adsets.at(i).get('platformId').value
    );
  }

  updatePlacementsWithFitleredData(index) {
    this.adsets
      .at(index)
      .get('targeting')
      .get('placement')
      .patchValue({
        placements: this.adsets
          .at(index)
          .get('targeting')
          .get('placement')
          .get('placements')
          .value.filter((placement) =>
            this.mappedPlacements[index].find((item) => item.id === placement)
          ),
      });
  }

  updatePlacements(index?: number) {
    let placments = [];
    let activePlatforms = this.adsets
      .at(index)
      .get('targeting')
      .get('placement')
      .get('platforms').value;
    this.staticData?.platformsOfPlatform
      .filter((platform) => activePlatforms.indexOf(platform.id) !== -1)
      .forEach((item) => {
        placments = unionBy(placments, item.placement_categories, 'id');
      });
    this.mappedPlacements[index] = placments;
    this.updatePlacementsWithFitleredData(index);
  }

  updatePlacementsInitial() {
    let placments = [];
    this.adsets.value.forEach((adset, index) => {
      let activePlatforms = adset.targeting.placement.platforms;
      this.staticData?.platformsOfPlatform
        .filter((platform) => activePlatforms.indexOf(platform.id) !== -1)
        .forEach((item) => {
          placments = unionBy(placments, item.placement_categories, 'id');
          this.mappedPlacements[index] = placments;
          this.updatePlacementsWithFitleredData(index);
        });
    });
  }

  onPlatformChange(id, index: number, platform?: any) {
    let platforms = this.adsets
      .at(index)
      .get('targeting')
      .get('placement')
      .get('platforms').value;
    let isFacebookSelected = platforms.find((platform: any) => platform === 1);
    let isInstagramSelected = platforms.find((platform: any) => platform === 2);
    let isAudienceNetworkSelected = platforms.find(
      (platform: any) => platform === 3
    );
    let isMessengerSelected = platforms.find((platform: any) => platform === 4);
    this.adsets
      .at(index)
      .get('targeting')
      .get('placement')
      .get('platforms')
      .clearValidators();
    if (
      (isAudienceNetworkSelected || isMessengerSelected) &&
      !isFacebookSelected
    ) {
      this.adsets
        .at(index)
        .get('targeting')
        .get('placement')
        .get('platforms')
        .addValidators(
          RxwebValidators.minLength({
            value: 100,
            message:
              'you can not select Audience Network or Messenger without Facebook',
          })
        );
    } else {
      this.adsets
        .at(index)
        .get('targeting')
        .get('placement')
        .get('platforms')
        .addValidators(
          RxwebValidators.minLength({
            value: 1,
            message: 'Platforms is required',
          })
        );
    }
    this.adsets
      .at(index)
      .get('targeting')
      .get('placement')
      .get('platforms')
      .updateValueAndValidity();
    this.updatePlacements(index);
  }

  toggleRunningForever() {
    if (this.adsets.value[0].budget) {
      this.adsets.value.forEach((adset, i) => {
        const lifetime = adset.budget.type === 'lifetime';
        if (lifetime) {
          this.adsets.at(i).get('schedule').patchValue({
            lifetime: true,
          });
        }
        this.updateEndDateValidation(i, adset.budget.type)
      });
    }
  }
  
  updateEndDateValidation(i,budget) {
    const endDateControl = (this.adsets as FormArray).at(i).get('schedule').get('end');
    endDateControl.clearValidators();
    endDateControl.addValidators([
      RxwebValidators.required({
        message: 'end date is required',
        conditionalExpression: (x) => x.lifetime === true && budget === 'lifetime',
      }),
    ])
    endDateControl.updateValueAndValidity();
  }

  setAllValues(i) {
    if (this.adsets.at(i).get('targeting').get('placement').get('type').value ==='auto') {
      this.adsets
        .at(i)
        .get('targeting')
        .get('placement')
        .patchValue({
          devices: ['desktop', 'mobile'],
        });
      if (this.staticData?.platformsOfPlatform) {
        this.adsets
          .at(i)
          .get('targeting')
          .get('placement')
          .patchValue({
            platforms: this.staticData?.platformsOfPlatform.map(
              (platform: any) => platform.id
            ),
          });
      }
      if (this.staticData?.placements) {
        this.adsets
          .at(i)
          .get('targeting')
          .get('placement')
          .patchValue({
            placements: this.staticData?.placements.map(
              (platform: any) => platform.id
            ),
          });
      }
      this.mappedPlacements[i] = this.staticData?.placements;
      this.updatePlacements(i);
    } else {
      this.mappedPlacements[i] = this.staticData?.placements;
      this.updatePlacements(i);
    }
  }

  search($event: AutoCompleteCompleteEvent) {
    let query = $event.query;
    // this.demographics = $event.filteredValue;
    let filteredData = this.campaignQuery.filterByLabel(
      JSON.parse(JSON.stringify(this.staticData?.demographics)),
      query
    );
    // this.store.dispatch(setAppStaticData({ payload: { key: 'demographics', value: filteredData } }))
  }

  mapData(data) {
    return data.map((item, index) => {
      const obj = {
        ...item,
        children: item.children || [],
      };
      delete obj.parent;
      delete obj.partialSelected;
      delete obj.size;

      if (item.children && item.children.length) {
        obj.children = this.mapData(item.children);
      }

      if (item.items && item.items.length) {
        obj.children = this.mapData(item.items);
      }

      return obj;
    });
  }

  mapChilds(item, node, selected) {
    return item.children.map((child: any) => {
      node.children.forEach((nodeChild: any) => {
        if (child.key === nodeChild.key) {
          child.selected = selected;
        }
        if (
          child.children &&
          child.children.length &&
          nodeChild.children &&
          nodeChild.children.length
        ) {
          child.children = this.mapChilds(child, nodeChild, selected);
        }
      });
      return child;
    });
  }

  toggleElements(data, node, selected) {
    let key = node.key;
    let count = 0;
    return data.map((item, index) => {
      let hasSelectedChild = false; // variable to track if any child has "selected" set to true
      let obj: any = {
        ...item,
      };
      if (item.key === key) {
        obj.selected = selected;
        if (selected) {
          count++;
        }
        obj.count = count;
        if (node.children && node.children.length) {
          obj.children = this.mapChilds(item, node, selected);
        }
      }

      if (item.children && item.children.length) {
        obj.children = this.toggleElements(item.children, node, selected);

        // Check if any child has "selected" set to true
        if (obj.children.some((child) => child.selected)) {
          hasSelectedChild = true;
        }
      }

      if (hasSelectedChild) {
        obj.selected = true; // Update the parent's "selected" status
      }

      return obj;
    });
  }

  getCounts(item, node, selected) {
    let count = 0; // variable to store the count of selected items

    item.children.forEach((child) => {
      node.children.forEach((nodeChild) => {
        if (child.key === nodeChild.key) {
          child.selected = selected;
          if (selected) {
            count++; // increment count if the item is selected
          }
        }
        if (
          child.children &&
          child.children.length &&
          nodeChild.children &&
          nodeChild.children.length
        ) {
          const childCount = this.mapChilds(child, nodeChild, selected);
          count += childCount; // add the child count to the parent count
        }
      });
    });

    return count;
  }

  toggleElementsSelection(data, node, selected, i, target) {
    this.adsets
      .at(i)
      .get('targeting')
      .get(target)
      .patchValue({
        list: this.toggleElements(
          data,
          this.campaignQuery.parseCircularToJSON(this.campaignQuery.circularToJSON(node)),
          selected
        ),
      });
  }

  removeFromSelection(item, i, target) {
    switch (target) {
      case 'demographics':
        this.demographicsSelection[i].splice(
          this.demographicsSelection[i].findIndex(
            (node: any) => node.key === item.key
          ),
          1
        );
        break;
      case 'beahviours':
        this.behaviorsSelection[i].splice(
          this.behaviorsSelection[i].findIndex(
            (node: any) => node.key === item.key
          ),
          1
        );
        break;
      case 'interests':
        this.interestsSelection[i].splice(
          this.interestsSelection[i].findIndex(
            (node: any) => node.key === item.key
          ),
          1
        );
        break;
    }
    // this.demographicsSelection[i].splice(this.demographicsSelection[i].findIndex((node: any) => node.key === item.key), 1)
  }

  removeItem(item, i, target) {
    let data = this.adsets.at(i).get('targeting').get(target).get('list').value;
    this.toggleElementsSelection(
      data,
      this.campaignQuery.parseCircularToJSON(this.campaignQuery.circularToJSON(item)),
      false,
      i,
      target
    );
    this.removeFromSelection(item, i, target);
  }

  onNodeSelect($event: any, i: number, target: string, selected: boolean) {
    let data = this.adsets.at(i).get('targeting').get(target).get('list').value;
    this.toggleElementsSelection(
      data,
      this.campaignQuery.parseCircularToJSON(this.campaignQuery.circularToJSON($event.node)),
      selected,
      i,
      target
    );
  }

  onNodeChange($event: any, i: number, target: string) {
    this.adsets.at(i).get('targeting').get(target).get('selection').setValue([... $event]);
    switch (target) {
      case 'demographics':
        this.adsets.at(i).get('targeting').get(target).get('list').setValue(this.demographics[i]);
        break;
      case 'interests': 
        this.adsets.at(i).get('targeting').get(target).get('list').setValue(this.interests[i]);
        break;
      case 'beahviours': 
      this.adsets.at(i).get('targeting').get(target).get('list').setValue(this.behaviors[i]);
        break;
    }    
  }

  createSubGoals(x) {
    const addSet = this.adsets.at(x);
    addSet.get('bid_startegy')?.patchValue('LOWEST_COST_WITHOUT_CAP');
    addSet.get('bid_amount')?.patchValue(null);
    const value = addSet.get('goal').value;
    const subGoals = addSet.get('subGoals') as FormArray;
    if (value.inputs.length) {
      value.inputs.forEach((input) => {
        subGoals.push(this.createCampaignService.subGoalItem(input))
      })
    } else {
      subGoals.clear();
    }
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();    
  }
}
