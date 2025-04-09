import { Observable } from 'rxjs';
import {
  MessageBinding,
  Workflow,
  TemplateGroup,
  FlowTemplates,
  Flows,
  FlowAction,
  AutomationInsights,
  FlowsListingItem,
  SuitableMessageInterface,
} from '../models/interfaces';

export abstract class FlowBuilderApi {
  /**
   * Gets a list of automation flow templates
   * @param templateGroupId Id of templates category
   * @param lang Template language
   * @param per_page Number of items per page (for pagination)
   * @param page Automations page to navigate to (for pagination)
   */
  abstract getFlowTemplates(
    templateGroupId?: number,
    lang?: string,
    per_page?: number | string,
    page?: number
  ): Observable<FlowTemplates>;

  /**
   * Gets a list of automation flow templates categories
   */
  abstract getTemplateGroups(): Observable<{ groups: Array<TemplateGroup> }>;

  /**
   * Gets template automation flow based on provided ID
   * @param flowId Id of automation flow
   */
  abstract getFlowTemplate(flowId: number): Observable<Workflow>;

  /**
   * Gets a list of automation flow triggers
   */
  abstract fetchFlowStartStop(): Observable<Array<FlowAction>>;

  /**
   * Gets a list of binding attributes for current selected triggers
   * @param id Id of trigger to get attributes for
   */
  abstract fetchPredefinedParameters(id: number): Observable<MessageBinding[]>;

  /**
   * Creates a new automation flow
   * @param data Automation flow data
   */
  abstract createWorkflow(data: Workflow): Observable<any>;

  /**
   * Maps & convertes data to Workflow model
   * @param data Data to be converted
   */
  abstract mapWorkflow(data: any): Workflow;

  /**
   * Gets list of created automation flows
   * @param per_page Number of flows per page
   * @param page Page to navigate to
   * @param from Start index of items
   * @param q Start search the flow
   */
  abstract getFlows(
    per_page?: number | string,
    page?: number,
    q?: number | string,
    from?: number,
  ): Observable<Flows>;

  /**
   * Updates existing flow with new data
   * @param flow New flow to be updated
   * @param id Id of existing flow
   */
  abstract updateFlow(
    flow: Workflow | { published: 0 | 1 },
    id: number
  ): Observable<any>;

  /**
   * Deletes an existing automation flow
   * @param id Id of flow to be deleted
   */
  abstract deleteFlow(id: number): Observable<any>;

  /**
   * Gets automation flow data based on provided Id
   * @param id Id of existing automation flow
   */
  abstract getFlow(id: number): Observable<Workflow>;

  /**
   * Gets a list of Flow Overview Cards data
   */
  abstract getAllOverviewCards(): Observable<{ data: AutomationInsights }>

  /**
   * Gets a list of email configurations
   */
  abstract getEmailConfigurations(): Observable<any>;

  /**
   * Gets a list of email templates
   */
  abstract getEmailTemplates(): Observable<any>;

  /**
   * Fetches a template by its ID
   */
  abstract fetchTemplateById(id: number): Observable<any>;

  /**
   * Checks if message is suitable to be sent to my recipients
   */
  abstract checkMessageSuitability(message: string): Observable<SuitableMessageInterface>;
}
