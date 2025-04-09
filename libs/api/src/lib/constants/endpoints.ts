export class Endpoints {
  static readonly POPUP_FORMS_LIST = 'ajax/forms';
  static readonly CAMPAIGNS_OBJECTIVES = 'api/v1/objectives';
  static readonly CAMPAIGNS_PLATFORMS = 'api/v1/platforms';
  static readonly OBJECTIVES_EVENTS = (id: any) =>
    `api/v1/objectives/${id}/events`;

  static readonly OBJECTIVES_GOALS = (objective: number, platform: number) =>
    `api/v1/objectives/${objective}/goals?platform=${platform}`;

  static readonly PLATFORMS_PAGES = (id: any) => `api/v1/platforms/${id}/pages`;
  static readonly LANGUAGES = '';
  static readonly COUNTRIES = 'api/v1/countries';
  static readonly STORE_INFO = 'api/v1/active-store';
  static readonly CITES = (code: any, platform: any) =>
    `api/v1/countries/cities?country_codes=${code}&platform=${platform}`;
  static readonly LOOKALIKE = (platform: any) =>
    `api/v1/platforms/${platform}/lookalikes`;
  static readonly CUSTOM_AUDIENCE = (platform: any) =>
    `api/v1/platforms/${platform}/audiences`;
  static readonly DEMOGRAPHICS = (platform: any) =>
    `api/v1/platforms/${platform}/demographics`;
  static readonly BEHAVIORS = (platform: any) =>
    `api/v1/platforms/${platform}/behaviours`;
  static readonly INTERESTS = (platform: any) =>
    `api/v1/platforms/${platform}/interests`;
  static readonly PLATFORMS_PLATFORM = (platform: any) =>
    `api/v1/platforms/${platform}/channels`;
  static readonly PLACEMENT_CATEGORIES = (platform: any) =>
    `api/v1/platforms/${platform}/placement-categories`;
  static readonly PLACEMENT_PIXELS = (platform: any) =>
    `api/v1/platforms/${platform}/pixels`;
  static readonly CTA = (objective: any, platform: any) =>
    `api/v1/objectives/${objective}/ctas?platform=${platform}`;
  // static readonly UPLOAD = 'api/v1/uplaod';
  static readonly UPLOAD = 'dashboard/audiences/product/upload-images';
  static readonly UPLOAD_SERVICE = 'ajax/upload-service';
  static readonly CREATE_CAMPAIGN = 'api/v1/campaigns';

  static readonly FLOW_START_STOP =
    '/dashboard/campaigns/flow-builder/flows/actions';

  static readonly PREDEFINED_PARAMETERS = (startActionId: number) =>
    `/dashboard/campaigns/flow-builder/flows/predefined-parameters/${startActionId}`;

  static readonly LEAD_GENERATION_FORMS = (platforms: any, page: any) =>
    `/api/v1/platforms/${platforms}/pages/${page}/leadgen-forms`;

  static readonly CREATE_WORKFLOW =
    '/dashboard/campaigns/flow-builder/flows/store';
  static readonly CREATE_LEAD_FORM = (platform: any, page: any) =>
      `api/v1/platforms/${platform}/pages/${page}/leadgen-forms`;
  static readonly CAMPAIGN_BY_ID = (id:any) => `api/v1/campaigns/${id}`
}
