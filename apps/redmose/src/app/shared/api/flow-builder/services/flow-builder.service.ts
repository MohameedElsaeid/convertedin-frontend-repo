import { Injectable } from '@angular/core';
import { FlowBuilderApi } from '../base/flow-builder.base';
import { Observable } from 'rxjs';
import { QueryApi } from '@convertedin/api';
import { FlowBuilderEndpoints } from '../constants/flow-builder.constant';
import { WorkFlowAction } from '../models/enums';
import {
  SMSAction,
  TriggerAction,
  Workflow,
  TemplateGroup,
  FlowTemplates,
  Flows,
  FlowAction,
  AutomationInsights,
  FlowsListingItem,
  SuitableMessageInterface,
} from '../models/interfaces';

@Injectable()
export class FlowBuilderApiService extends FlowBuilderApi {
  constructor(private __queryApi: QueryApi) {
    super();
  }

  override getFlowTemplates(
    templateGroupId?: number,
    lang?: string,
    per_page?: number | string,
    page?: number
  ): Observable<FlowTemplates> {
    return this.__queryApi.get(FlowBuilderEndpoints.GET_FLOW_TEMPLATES, {
      params: {
        group: templateGroupId,
        lang,
        per_page,
        page
      }
    });
  }

  override getTemplateGroups(): Observable<{ groups: Array<TemplateGroup> }> {
    return this.__queryApi.get(FlowBuilderEndpoints.GET_FLOW_TEMPLATE_GROUPS);
  }

  override getFlowTemplate(flowId: number): Observable<Workflow> {
    return this.__queryApi.get(FlowBuilderEndpoints.GET_FLOW_TEMPLATE, {
      params: {
        flowId
      }
    });
  }

  override getFlow(id: number): Observable<Workflow> {
    return this.__queryApi.get(FlowBuilderEndpoints.GET_FLOW(id));
  }

  override deleteFlow(id: number): Observable<any> {
    return this.__queryApi.delete(FlowBuilderEndpoints.FLOWS + `/${id}`);
  }

  override updateFlow(
    flow: Workflow | { published: 0 | 1 },
    id: number
  ): Observable<any> {
    return this.__queryApi.update(FlowBuilderEndpoints.FLOWS + `/${id}`, flow);
  }

  override getFlows(
    per_page?: number | string,
    page?: number,
    q?: number | string,
    from?: number,
  ): Observable<Flows> {
    return this.__queryApi.get(FlowBuilderEndpoints.FLOWS, {
      params: {
        per_page,
        page,
        from,
        q,
      },
    });
  }

  override createWorkflow(data: Workflow): Observable<any> {
    return this.__queryApi.post(FlowBuilderEndpoints.FLOWS, data);
  }

  override fetchPredefinedParameters(id: number): Observable<any> {
    return this.__queryApi.get(FlowBuilderEndpoints.PREDEFINED_PARAMETERS(id));
  }

  override fetchFlowStartStop(): Observable<Array<FlowAction>> {
    return this.__queryApi.get(FlowBuilderEndpoints.FLOW_START_STOP);
  }

  override mapWorkflow(data: any): Workflow {
    const dataCopy = JSON.parse(JSON.stringify(data));

    if (
      dataCopy.steps[dataCopy.steps.length - 1]?.type === WorkFlowAction.DELAY
    ) {
      dataCopy.steps.pop();
    }

    const triggerStep = (dataCopy.steps as Array<any>).shift();

    return {
      ...this.createTriggerAction(triggerStep),
      steps: this.mapStepsArray(dataCopy.steps as Array<any>),
      name: triggerStep?.name
    };
  }

  private createTriggerAction(data: any): TriggerAction {
    return {
      start_condition: data.start_condition,
      stop_condition: data.stop_condition,
      flow_entrance: data.send_after,
      flow_entrance_type: data.send_after_type
    };
  }

  private mapStepsArray(steps: Array<any>): Array<SMSAction> {
    const stepsCopy = [...steps];
    return stepsCopy.reduce((items: any, item: any, index: any) => {
      let itemCopy = { ...item };
      if (
        itemCopy?.type === WorkFlowAction.SMS ||
        itemCopy?.type === WorkFlowAction.NOTIFICATION
      ) {
        itemCopy.body = item?.body?.message || '';
        itemCopy.preview_body = item?.body?.previewMessage || '';
      }
      if (itemCopy?.type === WorkFlowAction.EMAIL) {
        if (item.html.beforeBody) {
          item.html.body = item.html.beforeBody + item.html.body;
        }
        if (item.html.afterBody) {
          item.html.body = item.html.body + item.html.afterBody;
        }

        itemCopy = {};
        itemCopy.id = item.id;
        itemCopy.name = item.stepName;
        itemCopy.type = 'email';
        // itemCopy.body = item.html.body;
        // itemCopy.body = ``
        itemCopy.subject = item.subject;
        itemCopy.templateId = item.html.id;
        itemCopy.email_type = item.html.type;
        itemCopy.body = this.replaceFakeDataInEmailTemplate(item.html.body);
      }
      if (item?.type === WorkFlowAction.DELAY) {
        return [...items];
      }
      if (steps[index - 1]?.type === WorkFlowAction.DELAY) {
        return [
          ...items,
          {
            ...itemCopy,
            send_after: steps[index - 1].send_after,
            send_after_type: steps[index - 1].send_after_type
          }
        ];
      }
      return [...items, itemCopy];
    }, []);
  }

  private replaceFakeDataInEmailTemplate(template: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(template, 'text/html');

    // Select all tables with the class 'FakeData'
    const fakeDataTables = doc.querySelectorAll('table.FakeData');
    // Replace each table with the string '|| productList ||'
    fakeDataTables.forEach((table, i) => {
      if (i == 0) {
        const replacementNode = document.createTextNode('|| productsList ||');
        table.parentNode?.replaceChild(replacementNode, table);
        return;
      }
      table.parentNode?.removeChild(table);
    });
    const doctype = '<!DOCTYPE html>';
    return doctype + '\n' + doc.documentElement.outerHTML;
  }
  override getAllOverviewCards(): Observable<{ data: AutomationInsights }> {
    return this.__queryApi.get(FlowBuilderEndpoints.GET_OVERVIEW_CARDS);
  }

  // Get Email configurations
  getEmailConfigurations(): Observable<any> {
    return this.__queryApi.get(FlowBuilderEndpoints.GET_EMAIL_CONFIGURATIONS);
  }

  getEmailTemplates(): Observable<any> {
    return this.__queryApi.get(FlowBuilderEndpoints.GET_EMAIL_TEMPLATES);
  }
  fetchTemplateById(id: number): Observable<any> {
    return this.__queryApi.get(
      FlowBuilderEndpoints.GET_EMAIL_TEMPLATES_BY_ID(id)
    );
  }

  // Check if message is suitable to be sent to my recipients
  override checkMessageSuitability(message: string): Observable<SuitableMessageInterface> {
    return this.__queryApi.post(FlowBuilderEndpoints.CHECK_MESSAGE_SUITABILITY, { message });
  }
}
