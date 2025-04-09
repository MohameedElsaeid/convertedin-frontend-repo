import { Injectable } from '@angular/core';
import { CreateCampaignForm } from './create-campaign';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import {
  NumericValueType,
  RxwebValidators,
} from '@rxweb/reactive-form-validators';
import { CustomQuestionEnum } from '../enums/questions.enum';

@Injectable({
  providedIn: 'root',
})
export class CreateCampaignService implements CreateCampaignForm {
  cbo: boolean = false;
  public preQuestions = {
    FULL_NAME: {
      type: 'FULL_NAME',
      key: 'full_name',
      disabled: false,
      label: 'Full Name',
    },
    PHONE: {
      type: 'PHONE',
      key: 'phone',
      disabled: false,
      label: 'Phone',
    },
    EMAIL: {
      type: 'EMAIL',
      key: 'email',
      disabled: false,
      label: 'Email',
    },
  };

  constructor(private formBuilder: FormBuilder) {}

  createObjectiveForm(value: any = {}): any {
    return this.formBuilder.group({
      objective: [value.objective || null, RxwebValidators.required()],
    });
  }

  generatePlatformsFormGroup(platforms: any): any {
    let data = [];
    for (let key in platforms) {
      data.push(
        this.formBuilder.group({
          type: key,
          platforms: this.formBuilder.array(
            platforms[key].map((platform: any) => {
              return this.formBuilder.group({
                active: platform.active,
                id: platform.id,
                name: platform.name,
                enabled_for_user: platform.enabled_for_user,
                logo: platform.logo,
                //todo remove this
                // selected: [{value: platform.id === 1, disabled: !platform.enabled_for_user}]
                selected: [
                  {
                    value: platform.selected && platform.enabled_for_user,
                    disabled: !platform.enabled_for_user,
                  },
                ],
              });
            })
          ),
        })
      );
    }
    return this.formBuilder.array(data);
  }

  createPlatformsForm(allPlatforms: any, value?: any): any {
    return this.formBuilder.group({
      items: this.generatePlatformsFormGroup(allPlatforms),
    });
  }

  createSettingsForm(value?: any): any {
    return this.formBuilder.group({
      type: [value.type || null, RxwebValidators.required()],
      settings: [value.settings || null, RxwebValidators.required()],
    });
  }

  createSetupForm(value?: any, objectiveId?: any): any {
    // let conversionEvent = [];
    // //hide conversion event for get leads objective
    // if (objectiveId !== 5 && objectiveId !== 6) {
    //     conversionEvent.push(RxwebValidators.required({message: 'Conversion event is required'}))
    // }
    return this.formBuilder.group({
      name: [
        value.name || null,
        [
          RxwebValidators.required({
            message: 'Campaign name is required',
          }),
        ],
      ],
      // conversion_event: [value.conversion_event || null, conversionEvent],
      budget: this.formBuilder.group({
        cbo: [
          value?.budget?.cbo !== undefined ? value?.budget?.cbo : true,
          [RxwebValidators.required()],
        ],
        type: [value?.budget?.type || 'daily', [RxwebValidators.required()]],
        value: [
          value?.budget?.value || null,
          [
            RxwebValidators.required({
              message: 'Budget value is required',
              conditionalExpression: (x) => x.cbo === true,
            }),
            RxwebValidators.numeric({
              acceptValue: NumericValueType.PositiveNumber,
              allowDecimal: true,
              message: 'Budget value must be a positive number',
              persistZero: false,
              isFormat: true,
              conditionalExpression: (x) => x.cbo === true,
            }),
            RxwebValidators.minNumber({
              value: 1,
              message: 'Budget value must be greater than 0',
              conditionalExpression: (x) => x.cbo === true,
            }),
          ],
        ],
        bid_strategy: [value?.budget?.bid_strategy || 'CPC', [RxwebValidators.required()]],
        bid_amount: [value?.budget?.bid_amount || null,
          [
            RxwebValidators.required({
              message: 'Biding Amount value is required',
              conditionalExpression: (x) => x.cbo === true && x.bid_strategy === 'CPC',
            }),
            RxwebValidators.numeric({
              acceptValue: NumericValueType.PositiveNumber,
              allowDecimal: true,
              message: 'Biding Amount must be a positive number',
              persistZero: false,
              isFormat: true,
              conditionalExpression: (x) => x.cbo === true,
            }),
            RxwebValidators.minNumber({
              value: 1,
              message: 'Biding Amount must be greater than 0',
              conditionalExpression: (x) => x.cbo === true,
            }),
          ],
        ]
      }),
      schedule: this.formBuilder.group({
        lifetime: [
          value?.schedule?.lifetime !== undefined
            ? value?.schedule?.lifetime
            : true,
          [RxwebValidators.required()],
        ],
        start: [
          value?.schedule?.start
            ? new Date(value?.schedule?.start)
            : new Date(),
          [
            RxwebValidators.required({ message: 'Start date is required' }),
            RxwebValidators.minDate({
              value: new Date().toLocaleDateString(),
              message: 'Invalid start date',
            }),
          ],
        ],
        end: [
          value?.schedule?.end ? new Date(value?.schedule?.end) : null,
          [
            RxwebValidators.required({
              message: 'end date is required',
              conditionalExpression: (x,control) => x.lifetime === false && this?.cbo === true && control?.budget?.type === 'lifetime',
            }),
          ],
        ],
      }),
    });
  }

  createMediaFormControl(value?: any): any {
    console.log(value);
    return this.formBuilder.group({
      type: [value.type || null, RxwebValidators.required()],
      title: [value.title || null, RxwebValidators.required()],
      id: [value.id || null, RxwebValidators.required()],
      imageUrl: [value.imageUrl || null, RxwebValidators.required()],
      url: [
        value.url || null,
        [
          RxwebValidators.required({ message: 'URL is required' }),
          RxwebValidators.url({
            message: 'Invalid URL',
          }),
        ],
      ],
      description: [
        value.description || null,
        RxwebValidators.required({ message: 'Description text is required' }),
      ],
      headline: [
        value.headline || null,
        RxwebValidators.required({ message: 'Headline is required' }),
      ],
    });
  }

  // Custom validator function with a message parameter
  minArrayLength(minLength: number, message: string) {
    return (formArray: AbstractControl): { [key: string]: any } | null => {
      if (formArray instanceof FormArray) {
        // Check if the length of the FormArray matches the required length
        if (formArray.length >= minLength) {
          return null; // No error if the length is correct
        } else {
          return {
            minArrayLength: {
              valid: false,
              requiredLength: minLength,
              actualLength: formArray.length,
              message: message, // Include the custom error message
            },
          };
        }
      }
      return null;
    };
  }

  adsFormGroup(value, objectiveId?: any) {
    console.log('objectiveId', objectiveId);
    let ctaTitleValidation = [];
    let leadGenFormIdValidation = [];
    if (objectiveId === 5) {
      leadGenFormIdValidation.push(
        RxwebValidators.required({ message: 'Lead gen form is required' })
      );
    }
    let phoneValidation = [];
    if (objectiveId === 6) {
      phoneValidation.push(
        RxwebValidators.required({ message: 'Phone is required' })
      );
    }

    return this.formBuilder.group({
      name: [
        value.name || 'Ad',
        RxwebValidators.required({ message: 'Ad name is required' }),
      ],
      format: [
        value.format || 'single',
        RxwebValidators.required({ message: 'Ad format is required' }),
      ],
      media: this.formBuilder.array(
        value.media
          ? value.media.map((item) => this.createMediaFormControl(item))
          : [],
        [this.minArrayLength(1, 'Media is required')]
      ),
      message: [
        value.message || null,
        RxwebValidators.required({ message: 'Primary text is required' }),
      ],
      cta: this.formBuilder.group({
        title: [
          value?.cta?.title ? value?.cta?.title : null,
          RxwebValidators.required({ message: 'CTA is required' }),
        ],
        lead_gen_form_id: [
          value?.cta?.lead_gen_form_id ? value?.cta?.lead_gen_form_id : null,
          leadGenFormIdValidation,
        ],
        phone: [value?.cta?.phone ? value?.cta?.phone : null],
      }),
      // urlParameters: this.formBuilder.group({
      //   websiteEvents: [value?.urlParameters?.websiteEvents ? value?.urlParameters?.websiteEvents : null, RxwebValidators.required({message: 'Website events is required'})],
      // }),
      utmParams: this.formBuilder.group({
        source: [
          value?.urlParameters?.source ? value?.utmParams?.source : null,
        ],
        medium: [
          value?.urlParameters?.medium ? value?.utmParams?.medium : null,
        ],
        name: [value?.urlParameters?.name ? value?.utmParams?.name : null],
        content: [
          value?.urlParameters?.content ? value?.utmParams?.content : null,
        ],
      }),
    });
  }

  createAds(value, objectiveId?: any) {
    return this.formBuilder.array(
      value && value.length
        ? value.map((ad: any) => {
            return this.adsFormGroup(ad, objectiveId);
          })
        : [this.adsFormGroup({})]
    );
  }

  subGoalItem(input) {
    console.log('test', input.validation);
    return this.formBuilder.group({
      key: [input.key || null],
      value: [
        input.value || null,
        input.validation
          ? [
              RxwebValidators.maxNumber({
                message: `Max number is ${input.validation.max}`,
                value: input.validation.max,
              }),
              RxwebValidators.minNumber({
                message: `Min number is ${input.validation.min}`,
                value: input.validation.min,
              }),
              RxwebValidators.required({ message: 'Value is required' }),
            ]
          : [],
      ],
      type: [input.type || null],
      validation: this.formBuilder.group(input.validation),
    });
  }

  createAdsetFormGroup(data, ads?: boolean, cbo?: boolean, objectiveId?: any) {
    if (cbo !== undefined) {
      this.cbo = cbo;
    }

    // let conversionEvent = [];
    // //hide conversion event for get leads objective
    // if (objectiveId !== 5 && objectiveId !== 6) {
    //     conversionEvent.push(RxwebValidators.required({message: 'Conversion event is required'}))
    // }

    let value = JSON.parse(JSON.stringify(data));
    let adsArray = ads ? this.createAds(value.ads, objectiveId) : [];
    return this.formBuilder.group({
      platformId: [value.platformId || null, RxwebValidators.required()],
      platformLogo: [value.platformLogo || null],
      name: [
        value.name || 'Adset',
        RxwebValidators.required({ message: 'Adset name is required' }),
      ],
      pageId: [
        value.pageId || null,
        RxwebValidators.required({ message: 'Page is required' }),
      ],
      pageIdSource: [value.pageIdSource || null],
      conversion_event: [value.conversion_event || null],
      cbo: [this.cbo],
      goal: [value.goal || null],
      subGoals: this.formBuilder.array(
        value.subGoals && value.subGoals.length
          ? value.subGoals.map((item: any) => {
              return this.subGoalItem(item);
            })
          : []
      ),
      bid_startegy: [ this.cbo ? null : value.bid_startegy || null],
      bid_amount: [value.bid_amount || null,[
        RxwebValidators.numeric({
          acceptValue: NumericValueType.PositiveNumber,
          allowDecimal: true,
          message: 'Bid amount must be a positive number',
          persistZero: false,
          isFormat: true,
        }),
        RxwebValidators.minNumber({
          value: 1,
          message: 'Bid amount must be greater than 0',
        }),
      ]],
      budget: this.cbo
        ? null
        : this.formBuilder.group({
            type: [
              value?.budget?.type || 'daily',
              [RxwebValidators.required()],
            ],
            value: [
              value?.budget?.value || null,
              [
                RxwebValidators.required({
                  message: 'Budget value is required',
                }),
                RxwebValidators.numeric({
                  acceptValue: NumericValueType.PositiveNumber,
                  allowDecimal: true,
                  message: 'Budget value must be a positive number',
                  persistZero: false,
                  isFormat: true,
                }),
                RxwebValidators.minNumber({
                  value: 1,
                  message: 'Budget value must be greater than 0',
                }),
              ],
            ],
          }),
      schedule: this.formBuilder.group({
        lifetime: [
          value?.schedule?.lifetime !== undefined
            ? value?.schedule?.lifetime
            : false,
          [RxwebValidators.required()],
        ],
        start: [
          value?.schedule?.start && value?.schedule?.lifetime
            ? new Date(value?.schedule?.start)
            : new Date(),
          [
            RxwebValidators.required({ message: 'Start date is required' }),
            RxwebValidators.minDate({
              value: new Date().toLocaleDateString(),
              message: 'Invalid start date',
            }),
          ],
        ],
        end: [
          value?.schedule?.end ? new Date(value?.schedule?.end) : null,
          [
            RxwebValidators.required({
              message: 'end date is required',
              conditionalExpression: (x) => x.lifetime === true
            }),
          ],
        ],
      }),
      catalogId: '',
      productSetId: '',
      targeting: this.formBuilder.group({
        locations: this.formBuilder.group({
          countries: [
            value.targeting && value.targeting.locations.countries
              ? value.targeting.locations.countries
              : [],
            RxwebValidators.minLength({
              value: 1,
              message: 'Country is required',
            }),
          ],
          cities: [
            value.targeting && value.targeting.locations.cities
              ? value.targeting.locations.cities
              : [],
          ],
        }),
        age: [
          value.targeting && value.targeting.age
            ? value.targeting.age
            : [18, 65],
        ],
        gender: [
          value.targeting && value.targeting.gender
            ? value.targeting.gender
            : 'all',
        ],
        lookalike: [
          value.targeting && value.targeting.lookalike
            ? value.targeting.lookalike
            : null,
        ],
        customAudience: [
          value.targeting && value.targeting.customAudience
            ? value.targeting.customAudience
            : null,
        ],
        demographics: this.formBuilder.group({
          list: [
            value.targeting && value.targeting.demographics.list
              ? value.targeting.demographics.list
              : [],
          ],
          selection: [
            value.targeting && value.targeting.demographics.selection
              ? value.targeting.demographics.selection
              : [],
          ],
          count: [
            value.targeting && value.targeting.demographics.count
              ? value.targeting.demographics.count
              : 0,
          ],
        }),
        interests: this.formBuilder.group({
          list: [
            value.targeting && value.targeting.interests.list
              ? value.targeting.interests.list
              : [],
          ],
          selection: [
            value.targeting && value.targeting.interests.selection
              ? value.targeting.interests.selection
              : [],
          ],
        }),
        beahviours: this.formBuilder.group({
          list: [
            value.targeting && value.targeting.beahviours.list
              ? value.targeting.beahviours.list
              : [],
          ],
          selection: [
            value.targeting && value.targeting.beahviours.selection
              ? value.targeting.beahviours.selection
              : [],
          ],
        }),
        languages: [
          value.targeting && value.targeting.languages
            ? value.targeting.languages
            : [],
        ],
        placement: this.formBuilder.group({
          type: [
            value.targeting && value.targeting.placement.type
              ? value.targeting.placement.type
              : 'auto',
          ],
          devices: [
            value.targeting && value.targeting.placement.devices
              ? value.targeting.placement.devices
              : ['desktop'],
            RxwebValidators.minLength({
              value: 1,
              message: 'Devices is required',
            }),
          ],
          platforms: [
            value.targeting && value.targeting.placement.platforms
              ? value.targeting.placement.platforms
              : [],
            RxwebValidators.minLength({
              value: 1,
              message: 'Platforms is required',
            }),
          ],
          placements: [
            value.targeting && value.targeting.placement.placements
              ? value.targeting.placement.placements
              : [],
            RxwebValidators.minLength({
              value: 1,
              message: 'Platforms is required',
            }),
          ],
        }),
      }),
      ads: adsArray,
    });
  }

  createAdsetsForm(value?: any, ads?: boolean, objectiveId?: any): any {
    let parsedValue = JSON.parse(JSON.stringify(value));
    parsedValue.platforms.platforms = parsedValue.platforms.platforms.filter(
      (item: any) => item.id !== 2
    );
    let adsets = [];
    if (
      parsedValue.adsets &&
      parsedValue.adsets.adsets &&
      parsedValue.adsets.adsets.length
    ) {
      adsets = parsedValue.adsets.adsets.map((adset: any) => {
        return this.createAdsetFormGroup(
          adset,
          ads,
          parsedValue.setup.budget.cbo,
          objectiveId
        );
      });
    } else {
      adsets = parsedValue.platforms.platforms.map((platform: any) => {
        return this.createAdsetFormGroup(
          {
            platformId: platform.id,
            platformLogo: platform.logo,
          },
          ads,
          parsedValue.setup.budget.cbo,
          objectiveId
        );
      });
    }
    return this.formBuilder.group({
      adsets: this.formBuilder.array(adsets),
      active: parsedValue.adsets.active ? parsedValue.adsets.active : 0,
      activeAd: parsedValue.adsets.activeAd ? parsedValue.adsets.activeAd : 0,
    });
  }

  getFormValidationErrors(form: FormGroup) {
    console.log(
      '%c ==>> Validation Errors: ',
      'color: red; font-weight: bold; font-size:25px;'
    );

    let totalErrors = 0;

    Object.keys(form.controls).forEach((key) => {
      const controlErrors: ValidationErrors = form.get(key).errors;
      if (controlErrors != null) {
        totalErrors++;
        Object.keys(controlErrors).forEach((keyError) => {
          console.log(
            'Key control: ' + key + ', keyError: ' + keyError + ', err value: ',
            controlErrors[keyError]
          );
        });
      }
    });
  }

  getAllErrors(form: FormGroup | FormArray): { [key: string]: any } | null {
    let hasError = false;
    const result = Object.keys(form.controls).reduce((acc, key) => {
      const control = form.get(key);
      const errors =
        control instanceof FormGroup || control instanceof FormArray
          ? this.getAllErrors(control as any)
          : control.errors;
      if (errors) {
        acc[key] = errors;
        hasError = true;
      }
      return acc;
    }, {} as { [key: string]: any });
    return hasError ? result : null;
  }

  shortAnswerGroup() {
    return this.formBuilder.group({
      type: [RxwebValidators.required({ message: 'Form name is required' })],
      key: [RxwebValidators.required({ message: 'Form name is required' })],
    });
  }

  singleAnswerGroup(value: any = {}) {
    return this.formBuilder.group({
      type: [
        'CUSTOM',
        RxwebValidators.required({ message: 'Type is required' }),
      ],
      key: [
        value.key || null,
        RxwebValidators.required({ message: 'Key name is required' }),
      ],
      label: [RxwebValidators.required({ message: 'Label name is required' })],
    });
  }

  multipleAnswerGroup(value: any = {}) {
    return this.formBuilder.group({
      type: [
        'CUSTOM',
        RxwebValidators.required({ message: 'Type is required' }),
      ],
      key: [
        value.key || null,
        RxwebValidators.required({ message: 'Key name is required' }),
      ],
      label: [
        value.label || null,
        RxwebValidators.required({ message: 'Label name is required' }),
      ],
      options: this.formBuilder.array([]),
    });
  }

  leadGenerationForm(value: any = {}): FormGroup {
    return this.formBuilder.group({
      name: [
        value.name || null,
        [
          RxwebValidators.required({
            message: 'This field is required',
          }),
        ],
      ],
      question_page_custom_headline: [
        value.question_page_custom_headline || null,
        [RxwebValidators.required({ message: 'This field is required' })],
      ],
      questions: this.formBuilder.array(
        [
          this.preQuestion(this.preQuestions.FULL_NAME),
          this.preQuestion(this.preQuestions.EMAIL),
        ],
        RxwebValidators.minLength({
          value: 1,
          message: 'At least one question is required',
        })
      ),
      thank_you_page: this.formBuilder.group({
        title: [
          value && value.thank_you_page && value.thank_you_page.title
            ? value.thank_you_page.title
            : null,
          [
            RxwebValidators.required({
              message: 'This field is required',
            }),
          ],
        ],
        body: [
          value && value.thank_you_page && value.thank_you_page.body
            ? value.thank_you_page.body
            : null,
          [
            RxwebValidators.required({
              message: 'This field is required',
            }),
          ],
        ],
        button_type: [
          value && value.thank_you_page && value.thank_you_page.button_type
            ? value.thank_you_page.button_type
            : null,
          [
            RxwebValidators.required({
              message: 'This field is required',
            }),
          ],
        ],
        button_text: [
          value && value.thank_you_page && value.thank_you_page.button_text
            ? value.thank_you_page.button_text
            : null,
          [
            RxwebValidators.required({
              message: 'This field is required',
            }),
          ],
        ],
        website_url: [
          value && value.thank_you_page && value.thank_you_page.website_url
            ? value.thank_you_page.website_url
            : null,
        ],
        phone: [
          value && value.thank_you_page && value.thank_you_page.phone
            ? value.thank_you_page.phone
            : null,
        ],
      }),
    });
  }

  shortQuestionFormGroup() {
    return this.formBuilder.group({
      type: ['CUSTOM'],
      controlType: CustomQuestionEnum.SHORT,
      key: [null],
      label: [
        null,
        RxwebValidators.required({ message: 'this field is required' }),
      ],
    });
  }

  multipleQuestionFormGroup() {
    return this.formBuilder.group({
      type: ['CUSTOM'],
      controlType: CustomQuestionEnum.MULTIPLE,
      key: [null],
      label: [
        null,
        RxwebValidators.required({ message: 'this field is required' }),
      ],
      options: this.formBuilder.array([this.answerControl()]),
    });
  }

  preQuestion(value: any = {}) {
    // const VALIDATIONS = [
    //    RxwebValidators.alpha({message: 'Invalid Name'})
    // ];
    // switch (value.type) {
    //     case QuestionEnum.EMAIL:
    //         VALIDATIONS.push(RxwebValidators.email({message: 'Invalid email'}));
    //         break
    //     case QuestionEnum.FULL_NAME:
    //         VALIDATIONS.push(RxwebValidators.alpha({message: 'Invalid Name'}));
    //         break
    //     case QuestionEnum.PHONE :
    //         // VALIDATIONS.push(RxwebValidators.numeric({
    //         //     acceptValue: NumericValueType.PositiveNumber,
    //         //     allowDecimal: false,
    //         //     message: 'Only numbers accepted'
    //         // }));
    //         // VALIDATIONS.push(RxwebValidators.minLength({value: 6, message: 'Invalid phone number'}));
    // }

    return this.formBuilder.group({
      key: [value.key || null],
      type: [
        value.type || null,
        RxwebValidators.required({ message: 'this field is required' }),
      ],
      label: [value.label || null],
      answer: [
        value.answer || null,
        [
          // RxwebValidators.required({message: 'this field is required'}),
          // RxwebValidators.alpha({message: 'Invalid text'})
        ],
      ],
    });
  }

  answerControl(value: any = {}) {
    return this.formBuilder.group({
      key: [value.key || null],
      label: [
        value.label || null,
        RxwebValidators.required({ message: 'this field is required' }),
      ],
    });
  }

  createQuestion(type: CustomQuestionEnum) {
    switch (type) {
      case CustomQuestionEnum.SHORT:
        return this.shortQuestionFormGroup();
      case CustomQuestionEnum.MULTIPLE:
        return this.multipleQuestionFormGroup();
      default:
        return this.shortQuestionFormGroup();
    }
  }
}
