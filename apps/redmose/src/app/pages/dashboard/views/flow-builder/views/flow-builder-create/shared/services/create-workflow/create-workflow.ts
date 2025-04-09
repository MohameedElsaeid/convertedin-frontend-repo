import { FormControl, FormGroup } from '@angular/forms';
import {
  SMSAction,
  WorkFlowAction,
  Workflow,
  WorkflowStep,
} from '@redmose/shared/api';

export abstract class CreateWorkflow {
  /**
   * Discards current workflow data configuration
   */
  abstract discardWorkflow(): void;
  /**
   * Initiates flow builder form array, if a workflow is provided the array is created & filled with flow data
   * If flow is not provided the array is created with trigger form as first form group
   * @param flow flow to be filled in form array
   */
  abstract initWorkflowForm(flow?: Workflow): void;

  /**
   * Adds new form to existing form array based on action type provided
   * @param index Index to place new form in (auto incremented by 1)
   * @param action Action type to be used to create form
   */
  abstract addNewAction(index: number, action: WorkFlowAction): void;

  /**
   * Deletes form from array based on index provided
   * @param index Index of form to be deleted
   */
  abstract deleteAction(index: number): void;

  /**
   * Creates a copy form provided form group
   * @param type Type of new form group
   * @param source Form group to be copied
   */
  abstract copyFormGroup(type: WorkFlowAction, source: FormGroup): FormGroup;

  /**
   * Updates active action value
   * @param newAction New action value to be updated
   */
  abstract setActiveAction(
    newAction: { type: WorkFlowAction; index: number } | undefined
  ): void;

  /**
   * Updates an existing form in form array, the form to be updated will be the form of the current active action index
   * @param newForm New form to be used to update existing form with
   */
  abstract updateExistingForm(newForm: FormGroup): void;

  /**
   * Adds period controls to provided form group
   * @param destination Form group to be updated
   * @param valueName Data key name of period value control
   * @param typeName Data key name of period type control
   */
  abstract addPeriodToForm(
    destination: FormGroup,
    valueName: string,
    typeName: string
  ): void;

  /**
   * Removes period controls from provided form
   * @param destination Form group to be updated
   * @param valueName Data key name of period value control
   * @param typeName Data key name of period type control
   */
  abstract removePeriodFromForm(
    destination: FormGroup,
    valueName: string,
    typeName: string
  ): void;

  /**
   * Adds delay form to form array
   * @param index Index to place new form in (auto incremented by 1)
   */
  protected abstract addDelayForm(index: number): void;

  /**
   * Adds SMS form to form array
   * @param index Index to place new form in (auto incremented by 1)
   */
  protected abstract addSMSForm(index: number): void;

  /**
   * Adds notifications form to form array
   * @param index Index to place new form in (auto incremented by 1)
   */
  protected abstract addNotificationsForm(index: number): void;

  /**
   * Creates & returns trigger form with controls & validations
   */
  protected abstract createTriggerForm(): FormGroup;

  /**
   * Creates & returns SMS form with controls & validations
   */
  protected abstract createSMSForm(): FormGroup;

  /**
   * Creates & returns Delay form with controls & validations
   */
  protected abstract createDelayForm(): FormGroup;

  /**
   * Creates & returns notifications form with controls & validations
   */
  protected abstract createNotificationsForm(): FormGroup;

  /**
   * Returns a new control for period value with validations
   */
  protected abstract createPeriodValueControl(): FormControl;

  /**
   * Returns a new control for period type with validations
   */
  protected abstract createPeriodTypeControl(): FormControl;

  /**
   * Fills form array with provided workflow values
   * @param workflow Flow to be used in filling values
   */
  protected abstract fillFormArray(workflow: Workflow): Array<FormGroup>;

  /**
   * Creates & returns new form group based on provided type
   * @param type Type of form to be created
   */
  protected abstract createWorkflowForm(type: WorkFlowAction): FormGroup;

  /**
   * Creates & fills trigger form with values provided
   * @param workflow Flow to fill with
   */
  protected abstract fillTriggerForm(workflow: Workflow): FormGroup<any>;

  /**
   * Fills SMS body of provided form
   * @param step Data to fill with
   * @param form Form to be filled
   */
  protected abstract fillSMSBody(step: SMSAction, form: FormGroup): void;
  /**
   * Fills Email body of provided form
   * @param step Data to fill with
   * @param form Form to be filled
   */
  protected abstract fillEmailBody(step: any, form: FormGroup): void;

  /**
   * Creates & fills delay form with values provided
   * @param step Step to fill with
   */
  protected abstract fillDelayForm(step: WorkflowStep): FormGroup;
  protected abstract splitHtml(htmlContent : string): any;
}
