import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {CreateCampaignService} from '../../shared/services/create-campaign.service';
import {MenuItem} from 'primeng/api';
import {CustomQuestionEnum, QuestionEnum} from '../../shared/enums/questions.enum'
import {CampaignsQuery} from '../../shared/services/campaigns-query';
import {Store} from '@ngrx/store';
import {RxwebValidators} from '@rxweb/reactive-form-validators';

interface City {
    name: string;
    code: string;
}


@Component({
    selector: 'convertedin-create-lead-form',
    templateUrl: './create-lead-form.component.html',
    styleUrls: ['./create-lead-form.component.scss'],
})
export class CreateLeadFormComponent implements OnInit {
    visible: any = true;
    form: FormGroup;
    cities!: City[];
    selectedCities!: City[];
    formSubmitted = false;
    customQuestionEnum = CustomQuestionEnum;
    questionEnum = QuestionEnum;
    activeStep = 0;
    @Output() formCreated = new EventEmitter<any>();
    @Output() closeEvent = new EventEmitter<any>();
    private campaignState: any;

    public preQuestionsList = [
        {
            'type': 'FULL_NAME',
            'key': 'full_name',
            disabled: true,
            label: 'Full Name',
            command: () => this.addPreQuestion(this.createCampaignService.preQuestions.FULL_NAME)
        },
        {
            'type': 'PHONE',
            'key': 'phone',
            disabled: false,
            label: 'Phone',
            command: () => this.addPreQuestion(this.createCampaignService.preQuestions.PHONE)
        },
        {
            'type': 'EMAIL',
            'key': 'email',
            disabled: true,
            label: 'Email',
            command: () => this.addPreQuestion(this.createCampaignService.preQuestions.EMAIL)
        }];

    splitBtn: MenuItem[] = [
        {
            label: 'Multiple Choice',
            icon: 'pi pi-stop-circle',
            command: () => this.addQuestion(CustomQuestionEnum.MULTIPLE)
        },
        {
            label: 'Short Answer',
            icon: 'pi pi-language',
            command: () => this.addQuestion(CustomQuestionEnum.SHORT)
        },
        // {
        //   label: 'Slider',
        //   icon: 'pi pi-arrow-right-arrow-left',
        // },
        // {
        //   separator: true,
        // },
    ];
     configuration: any;

    constructor(public createCampaignService: CreateCampaignService, private campaignsQuery: CampaignsQuery, private store: Store<any>,
    ) {
        this.form = this.createCampaignService.leadGenerationForm();
        this.controls.thank_you_page.get('button_type').valueChanges.subscribe((value: string) => {
            console.log(value)
            if (value === 'VIEW_WEBSITE' || value === 'DOWNLOAD') {
                this.controls.thank_you_page.get('website_url').setValidators([RxwebValidators.required({message: 'Url is required'}), RxwebValidators.url({message: 'Invalid url'})])
                this.controls.thank_you_page.get('website_url').updateValueAndValidity();
                this.controls.thank_you_page.get('phone').setValidators(null)
                this.controls.thank_you_page.get('phone').updateValueAndValidity();
            } else {
                this.controls.thank_you_page.get('website_url').setValidators(null)
                this.controls.thank_you_page.get('website_url').updateValueAndValidity();
                this.controls.thank_you_page.get('phone').setValidators([RxwebValidators.required({message: 'phone is required'})])

            }

        })
        this.store.select('campaigns').subscribe((state) => {
            this.campaignState = this.campaignsQuery.parseCircularToJSON(this.campaignsQuery.circularToJSON(state));
            // this.formSubmitted = state.pagesConfigurations.adsets.dirty;
            // this.setAdsetsList();
        });

        this.store.select('configuration').subscribe((state) => {
            this.configuration = this.campaignsQuery.parseCircularToJSON(this.campaignsQuery.circularToJSON(state));
        });
    }

    get questions(): FormArray {
        return this.controls.questions as FormArray
    }

    get controls(): any {
        return this.form.controls;
    }

    addQuestion(type: CustomQuestionEnum) {
        console.log(type)
        this.questions.push(this.createCampaignService.createQuestion(type))
    }

    ngOnInit() {
        this.cities = [
            {name: 'New York', code: 'NY'},
            {name: 'Rome', code: 'RM'},
            {name: 'London', code: 'LDN'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Paris', code: 'PRS'},
        ];
    }

    removeQuestion(i: number) {
        let value = this.questions.at(i).value
        if (value.type !== CustomQuestionEnum.MULTIPLE && value.type !== CustomQuestionEnum.MULTIPLE) {
            this.preQuestionsList.map((item) => {
                if (item.type === value.type) {
                    item.disabled = false
                }
                return item
            })
        }
        this.questions.removeAt(i)
    }

    removeAnswer(i: number, x: number) {
        const OPTIONS = this.questions.at(i).get('options') as FormArray;
        OPTIONS.removeAt(x);
    }

    addAnswer(i: number) {
        const OPTIONS = this.questions.at(i).get('options') as FormArray;

        OPTIONS.push(this.createCampaignService.answerControl())
    }

    addPreQuestion(value: any) {
        this.questions.push(this.createCampaignService.preQuestion(value))
        this.preQuestionsList.map((item) => {
            if (item.type === value.type) {
                item.disabled = true
            }
            return item
        })

    }

    questionsTrackby(index, item) {
        return index
    }

    optionsTrackby(index, item) {
        return index
    }

    nextStep() {
        if (this.activeStep < 4) {
            this.activeStep += 1;
        }
    }

    prevStep() {
        if (this.activeStep > 0) {
            this.activeStep -= 1;
        }
    }

    submitForm() {
        this.formSubmitted = true;
        console.log(this.form)
        if (this.form.valid) {
            this.campaignsQuery.toggleLoader(true);
            this.campaignsQuery.createNewLeadForm(this.form.value, this.campaignState?.forms?.platforms?.platforms[0]?.id, this.campaignState.forms?.adsets?.adsets[0]?.pageId?.id).subscribe((res) => {
                this.campaignsQuery.toggleLoader(false);
                this.formCreated.emit({
                    success : true
                })
            }, err=>{
                this.campaignsQuery.toggleLoader(false);
            })
        }
    }
// {
//     "data": [],
//     "errors": {
//         "questions.2.options.0.key": [
//             "The questions.2.options.0.key field has a duplicate value."
//         ],
//         "questions.2.options.1.key": [
//             "The questions.2.options.1.key field has a duplicate value."
//         ]
//     }
// }
    closePopup() {
      this.closeEvent.emit({
          close : true
      })
    }
}

