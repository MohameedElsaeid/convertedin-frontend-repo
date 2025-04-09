import { Observable } from 'rxjs';

export abstract class CampaignsApi {
  abstract fetchObjectives(): Observable<any>;

  abstract fetchPlatforms(): Observable<any>;

  abstract fetchObjectivesEvents(id: any): Observable<any>;

  abstract fetchObjectivesGoals(
    objective: number,
    platform: number
  ): Observable<any>;

  abstract fetchPlatformsPages(id: any): Observable<any>;

  abstract fetchLanguages(): Observable<any>;

  abstract fetchCountries(): Observable<any>;

  abstract fetchCities(code: any, platform: any): Observable<any>;

  abstract fetchLooklike(platform: any): Observable<any>;

  abstract fetchCustomAudience(platform: any): Observable<any>;

  abstract fetchDemoGraphics(platform: any): Observable<any>;

  abstract fetchDemoInterests(platform: any): Observable<any>;

  abstract fetchDemoBehaviors(platform: any): Observable<any>;

  abstract fetchPlatformsOfPlatform(platform: any): Observable<any>;

  abstract fetchPlatformsOfPlacements(platform: any): Observable<any>;

  abstract fetchPlatformsOfPixels(platform: any): Observable<any>;

  abstract fetchLeadGenerationForms(platform: any, page: any): Observable<any>;

  abstract fetchPlatformsCTA(objective: any, platform: any): Observable<any>;

  abstract upload(file: any): Observable<any>;

  abstract createCampaign(request: any): Observable<any>;

  abstract createNewLeadForm(
    value: any,
    platform: any,
    page: any
  ): Observable<any>;

  abstract fetchStoreInfo(): Observable<any>;
}
