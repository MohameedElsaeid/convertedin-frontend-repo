import {Injectable} from '@angular/core';
import {CampaignsQuery} from './campaigns-query';
import {CampaignsApi} from '@convertedin/api';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {setAppStaticData} from '@redmose/store/actions/app.action';
import {parse, stringify } from 'flatted';

@Injectable({
    providedIn: 'root',
})
export class CampaignsQueryService implements CampaignsQuery {
    constructor(
        private campaignApi: CampaignsApi,
        private store: Store<any>,
        private ngxUiLoaderService: NgxUiLoaderService
    ) {
    }

    fetchObjectives(): void {
        this.campaignApi.fetchObjectives().subscribe((res) => {
            let data = res.data;
            this.store.dispatch(
                setAppStaticData({
                    payload: {
                        key: 'objectives',
                        value: JSON.parse(JSON.stringify(data)),
                    },
                })
            );
        });
    }

    fetchPlatforms(): void {
        this.campaignApi.fetchPlatforms().subscribe((res) => {
            this.store.dispatch(
                setAppStaticData({
                    payload: {
                        key: 'platforms',
                        value: res.data,
                    },
                })
            );
        });
    }

    fetchObjectivesState(): Observable<any> {
        return this.store.select('configuration').pipe(
            map((state) => {
                if (state?.staticData?.objectives) {
                    let data = JSON.parse(JSON.stringify(state?.staticData?.objectives));
                    return data?.map((obj: any) => {
                        let item = JSON.parse(JSON.stringify(obj));
                        // item.image = obj.image.replace('4200', '8000');
                        // item.platforms.map((platform: any) => {
                        //   platform.logo = platform.logo.replace('4200', '8000');
                        //   return platform
                        // })
                        item.good_for = item.good_for.split(',');
                        return item;
                    });
                }
            })
        );
    }

    fetchPlatformsState(): Observable<any> {
        return this.store.select('configuration').pipe(
            map((state) => {
                if (state?.staticData?.platforms) {
                    return state?.staticData?.platforms.map((obj: any) => {
                        let item = JSON.parse(JSON.stringify(obj));
                        // item.logo = obj.logo.replace('4200', '8000');
                        return item;
                    });
                }
            })
        );
    }

    fetchSelectedObjectiveState(): Observable<any> {
        return this.store.select('campaigns').pipe(
            map((state) => {
                return JSON.parse(JSON.stringify(state?.forms)) || null;
            })
        );
    }

    fetchObjectivesEvents(id): void {
        this.campaignApi.fetchObjectivesEvents(id).subscribe((res) => {
            this.store.dispatch(
                setAppStaticData({
                    payload: {
                        key: 'events',
                        value: res.data.map((item) => {
                            console.log(item);
                            return {
                                ...item,
                                id: item.id.replace(/ /g, '_'),
                            };
                        }),
                    },
                })
            );
        });
    }

    fetchObjectivesGoals(objective: number, platform: number): void {
        this.campaignApi.fetchObjectivesGoals(objective, platform).subscribe((res) => {
            this.store.dispatch(
                setAppStaticData({
                    payload: {
                        key: 'goals',
                        value: res.data
                    },
                })
            );
        });
    }

    fetchPlatformsPages(id): void {
        this.campaignApi.fetchPlatformsPages(id).subscribe((res) => {
            this.store.dispatch(
                setAppStaticData({
                    payload: {
                        key: 'pages',
                        value: res.data,
                    },
                })
            );
        });
    }

    fetchCountries(): void {
        this.campaignApi.fetchCountries().subscribe((res) => {
            this.store.dispatch(
                setAppStaticData({
                    payload: {
                        key: 'countries',
                        value: res.data,
                    },
                })
            );
        });
    }

    fetchCites(code, platform): void {
        this.campaignApi.fetchCities(code, platform).subscribe((res) => {
            this.store.dispatch(
                setAppStaticData({
                    payload: {
                        key: 'cites',
                        value: res.data,
                    },
                })
            );
        });
    }

    fetchLooklike(platform): void {
        this.campaignApi.fetchLooklike(platform).subscribe((res) => {
            this.store.dispatch(
                setAppStaticData({
                    payload: {
                        key: 'lookalike',
                        value: res.data,
                    },
                })
            );
        });
    }

    fetchCustomAudience(platform): void {
        this.campaignApi.fetchCustomAudience(platform).subscribe((res) => {
            this.store.dispatch(
                setAppStaticData({
                    payload: {
                        key: 'customAudience',
                        value: res.data,
                    },
                })
            );
        });
    }

    fetchDemoGraphics(platform): void {
        this.campaignApi.fetchDemoGraphics(platform).subscribe((res) => {
            this.store.dispatch(
                setAppStaticData({
                    payload: {
                        key: 'demographics',
                        value: res.data,
                    },
                })
            );
        });
    }

    fetchDemoBehaviors(platform): void {
        this.campaignApi.fetchDemoBehaviors(platform).subscribe((res) => {
            this.store.dispatch(
                setAppStaticData({
                    payload: {
                        key: 'behaviors',
                        value: res.data,
                    },
                })
            );
        });
    }

    fetchDemoInterests(platform): void {
        this.campaignApi.fetchDemoInterests(platform).subscribe((res) => {
            this.store.dispatch(
                setAppStaticData({
                    payload: {
                        key: 'interests',
                        value: res.data,
                    },
                })
            );
        });
    }

    fetchPlatformsOfPlatform(platform): void {
        this.campaignApi.fetchPlatformsOfPlatform(platform).subscribe((res) => {
            this.store.dispatch(
                setAppStaticData({
                    payload: {
                        key: 'platformsOfPlatform',
                        value: res.data,
                        // value: [
                        //     {
                        //       "id": 1,
                        //       "name": "Facebook",
                        //       "placement_categories": [
                        //         {
                        //           "id": 1,
                        //           "name": "Feed",
                        //           "platform_id": 1,
                        //           "description": "Get high visibility for your business with ads in feeds"
                        //         },
                        //         {
                        //           "id": 2,
                        //           "name": "Stories and Reels",
                        //           "platform_id": 1,
                        //           "description": "Tell a rich, visual story with immersive, fullscreen vertical ads"
                        //         },
                        //         {
                        //           "id": 3,
                        //           "name": "In-stream ads for videos and reels",
                        //           "platform_id": 1,
                        //           "description": "Reach people before, during, or after they watch a video or reel"
                        //         },
                        //         {
                        //           "id": 4,
                        //           "name": "Search results",
                        //           "platform_id": 1,
                        //           "description": "Get visibility for your business as people search"
                        //         }
                        //       ]
                        //     },
                        //     {
                        //       "id": 2,
                        //       "name": "Instagram",
                        //       "placement_categories": [
                        //         {
                        //           "id": 1,
                        //           "name": "Feed",
                        //           "platform_id": 1,
                        //           "description": "Get high visibility for your business with ads in feeds"
                        //         },
                        //         {
                        //           "id": 2,
                        //           "name": "Stories and Reels",
                        //           "platform_id": 1,
                        //           "description": "Tell a rich, visual story with immersive, fullscreen vertical ads"
                        //         },
                        //         {
                        //           "id": 4,
                        //           "name": "Search results",
                        //           "platform_id": 1,
                        //           "description": "Get visibility for your business as people search"
                        //         }
                        //       ]
                        //     },
                        //     {
                        //       "id": 3,
                        //       "name": "Audience network",
                        //       "placement_categories": [
                        //         {
                        //           "id": 6,
                        //           "name": "Apps and sites",
                        //           "platform_id": 1,
                        //           "description": "Expand your reach with ads in external apps and websites"
                        //         }
                        //       ]
                        //     },
                        //     {
                        //       "id": 4,
                        //       "name": "Messenger",
                        //       "placement_categories": [
                        //         {
                        //           "id": 1,
                        //           "name": "Feed",
                        //           "platform_id": 1,
                        //           "description": "Get high visibility for your business with ads in feeds"
                        //         },
                        //         {
                        //           "id": 2,
                        //           "name": "Stories and Reels",
                        //           "platform_id": 1,
                        //           "description": "Tell a rich, visual story with immersive, fullscreen vertical ads"
                        //         }
                        //       ]
                        //     }
                        //   ]
                    },
                })
            );
        });
    }

    fetchPlatformsOfPlacements(platform): void {
        this.campaignApi.fetchPlatformsOfPlacements(platform).subscribe((res) => {
            this.store.dispatch(
                setAppStaticData({
                    payload: {
                        key: 'placements',
                        value: res.data,
                    },
                })
            );
        });
    }

    fetchLeadGenerationForms(platform, page): void {
        this.campaignApi.fetchLeadGenerationForms(platform, page).subscribe((res) => {
            this.store.dispatch(
                setAppStaticData({
                    payload: {
                        key: 'leadGenerationForm',
                        value: res.data.data,
                    },
                })
            );
        });
    }

    fetchPlatformsOfPixels(platform): void {
        this.campaignApi.fetchPlatformsOfPixels(platform).subscribe((res) => {
            this.store.dispatch(
                setAppStaticData({
                    payload: {
                        key: 'websitesEvents',
                        value: res.data,
                    },
                })
            );
        });
    }

    fetchPlatformsCTA(objective, platform): void {
        this.campaignApi.fetchPlatformsCTA(objective, platform).subscribe((res) => {
            this.store.dispatch(
                setAppStaticData({
                    payload: {
                        key: 'cta',
                        value: res,
                    },
                })
            );
        });
    }

    fetchStaticData() {
        this.fetchObjectives();
        this.fetchPlatforms();
        this.fetchStoreInfo();
    }

    getSelectedIds(data) {
        const selectedIds = [];

        for (const item of data.list) {
            if (item.selected && !item.children) {
                selectedIds.push(item.id);
            }

            if (item.children) {
                selectedIds.push(...this.getSelectedIds({list: item.children}));
            }
        }
        console.log(selectedIds);
        // return Array.from(new Set(selectedIds))
        return Array.from(new Set(selectedIds));
    }

    formatGoals(goals, subGoals) {
        return {
            value: goals?.id,
            parameters: subGoals.map(subGoal => ({
                key: subGoal?.key,
                value: subGoal?.value
            }))
        }
    }

    mapFormValuesToRequest(data) {
        const FORM_VALUE = data.forms;
        console.log(FORM_VALUE)
        return {
            template_id: 0,
            objective: FORM_VALUE.objective.id,
            platforms: FORM_VALUE.platforms.platforms
                .map((platform: any) => platform.id)
                .filter((id: any) => id !== 2),
            type: FORM_VALUE.settings.settings,
            campaign: {
                name: FORM_VALUE.setup.name,
                conversion_event: FORM_VALUE.setup.conversion_event,
                schedule: FORM_VALUE.setup.schedule,
                budget: FORM_VALUE.setup.budget,
            },
            adsets: FORM_VALUE.adsets.adsets.map((adset: any) => {
                return {
                    platform_id: adset.platformId,
                    name: adset.name,
                    page_id: parseInt(adset.pageId.page_id),
                    catalog_id: null,
                    product_set_id: null,
                    goal: this.formatGoals(adset.goal, adset.subGoals),
                    bid_startegy: adset.bid_startegy,
                    bid_amount: adset.bid_amount,
                    budget: adset.budget,
                    targeting: {
                        locations: adset.targeting.locations,
                        age: {
                            from: adset.targeting.age[0],
                            to: adset.targeting.age[1],
                        },
                        gender: adset.targeting.gender,
                        demographics: this.getSelectedIds({
                            list: adset.targeting.demographics.list,
                        }),
                        interests: this.getSelectedIds({
                            list: adset.targeting.interests.list,
                        }),
                        behaviors: this.getSelectedIds({
                            list: adset.targeting.beahviours.list,
                        }),
                        languages: adset.targeting.languages,
                        placement: adset.targeting.placement,
                    },
                    ads: adset.ads
                        ? adset.ads.map((ad: any) => {
                            return {
                                name: ad.name,
                                format: ad.format,
                                media:
                                    ad.format && ad.format === 'single'
                                        ? [
                                            {
                                                type: 'upload',
                                                id: ad.media[0].id,
                                                url: ad.media[0].url,
                                                description: ad.media[0].description,
                                                headline: ad.media[0].headline,
                                            },
                                        ]
                                        : ad.media.map((media: any) => {
                                            return {
                                                type: 'upload',
                                                id: media.id,
                                                url: media.url,
                                                description: media.description,
                                                headline: media.headline,
                                            };
                                        }),
                                message: ad.message,
                                cta: {
                                    title: ad.cta.title ? ad.cta.title.id : null,
                                    lead_gen_form_id: ad.cta.lead_gen_form_id,
                                    phone: {
                                        country_code: ad?.cta?.phone?.countryCode,
                                        number: ad?.cta?.phone?.number
                                    },
                                },
                                // 'url_parameters': {
                                //   'website_events': ad.urlParameters.websiteEvents
                                // },
                                utm_params: {
                                    source: ad.utmParams.source,
                                    medium: ad.utmParams.medium,
                                    name: ad.utmParams.name,
                                    content: ad.utmParams.content,
                                },
                            };
                        })
                        : [],
                };
            }),
        };
    }

    filterByLabel(data, searchText) {
        let results = [];
        // Base case
        if (!data || !Array.isArray(data)) {
            return null;
        }

        // Recursive case
        for (let i = 0; i < data.length; i++) {
            let itemLabel = data[i].label.toLowerCase();
            if (itemLabel.includes(searchText.toLowerCase())) {
                return data[i];
            }

            const result = this.filterByLabel(data[i].children, searchText);
            if (result) {
                return result;
            }
        }

        return null; // Label not found
    }

    createCampaign(request) {
        let data = this.mapFormValuesToRequest(request);
        console.log('map data=>', data);
        // return of(data)
        return this.campaignApi.createCampaign(data).pipe(
            map((res) => {
                console.log(res);
            })
        );
    }

    toggleLoader(status) {
        status
            ? this.ngxUiLoaderService.startLoader('default-loader')
            : this.ngxUiLoaderService.stopLoader('default-loader');
    }

    circularToJSON(obj) {
        return stringify(obj);
    }

    parseCircularToJSON(JSONString) {
        return parse(JSONString)
    }

    fetchStoreInfo(){
        this.campaignApi.fetchStoreInfo().pipe(map((res)=> res.data)).subscribe((res) => {
            this.store.dispatch(
            setAppStaticData({
                payload: {
                    key: 'storeInfo',
                    value: res,
                },
            })
            );
        });
    }
    
    createNewLeadForm(value, platform, page): Observable<any> {
        console.log(value)
        const REQUEST = {
            'name': value.name,
            'question_page_custom_headline': value.question_page_custom_headline,
            'questions':
                value.questions.map((item) => {
                    switch (item.type) {
                        case 'CUSTOM':
                            if (item.controlType === 'short') {
                                item = {
                                    type: item.type,
                                    key: item.label.replace(/\s/g, '_'),
                                    label: item.label
                                }
                            } else if (item.controlType === 'multiple') {
                                item = {
                                    type: item.type,
                                    key: item.label.replace(/\s/g, '_'),
                                    label: item.label,
                                    options: item.options.map((option) => {
                                        return {
                                            value: option.label,
                                            key: option.label.replace(/\s/g, '_')
                                        }
                                    })
                                }
                            }
                            break;
                        case 'FULL_NAME':
                            item = {
                                type: item.type,
                                key: item.label.replace(/\s/g, '_'),
                            }
                            break;
                        case 'EMAIL':
                            item = {
                                type: item.type,
                                key: item.label.replace(/\s/g, '_'),
                            }
                            break;
                        case 'PHONE':
                            item = {
                                type: item.type,
                                key: item.label.replace(/\s/g, '_'),
                            }
                    }

                    return item
                }),
            'thank_you_page': {
                'title': value.thank_you_page.title,
                'body': value.thank_you_page.body,
                'button_type': value.thank_you_page.button_type,
                'button_text': value.thank_you_page.button_text,
                'website_url': value.thank_you_page.website_url,
                'phone': {
                    'country_code': value.thank_you_page.phone ? value.thank_you_page.phone.countryCode : null,
                    'number': value.thank_you_page.phone ? value.thank_you_page.phone.number : null
                }
            }
        }

        if (value.thank_you_page.button_type === 'VIEW_WEBSITE' || value.thank_you_page.button_type === 'DOWNLOAD') {
            delete REQUEST.thank_you_page.phone;
        } else if (value.thank_you_page.button_type === 'CALL_BUSINESS') {
            delete REQUEST.thank_you_page.website_url
        }

        return this.campaignApi.createNewLeadForm(REQUEST, platform, page);
    }
}
