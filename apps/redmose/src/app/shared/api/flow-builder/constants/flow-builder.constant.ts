export class FlowBuilderEndpoints {
  // Flowbuilder base endpoint
  static readonly FLOWS = '/dashboard/campaigns/flow-builder/flows';

  // Flow start stop endpoint
  static readonly FLOW_START_STOP = this.FLOWS + '/actions';

  // Predefined parameters endpoint
  static readonly PREDEFINED_PARAMETERS = (startActionId: number): string =>
    this.FLOWS + `/predefined-parameters/${startActionId}`;

  // Get flow endpoint
  static readonly GET_FLOW = (flowId: number): string =>
    this.FLOWS + `/${flowId}/edit`;

  // Get flow template endpoint
  static readonly GET_FLOW_TEMPLATE = this.FLOWS + '/create';

  // Get flow template Groups
  static readonly GET_FLOW_TEMPLATE_GROUPS = this.FLOWS + '/groups';

  // Get flow templates
  static readonly GET_FLOW_TEMPLATES = this.FLOWS + '/templates';

  // Get flow overview cards
  static readonly GET_OVERVIEW_CARDS = this.FLOWS + '/overview';

  // Get Email configurations
  static readonly GET_EMAIL_CONFIGURATIONS = this.FLOWS + '/email-config';

  static readonly GET_EMAIL_TEMPLATES = this.FLOWS + '/emailTemplates/';

  // fetch template by id
  static readonly GET_EMAIL_TEMPLATES_BY_ID = (templateId: number): string => `${this.FLOWS}/emailTemplate/${templateId}`

  // Check if message is suitable to be sent to my recipients
  static readonly CHECK_MESSAGE_SUITABILITY = `${this.FLOWS}/review-sms`;

}
