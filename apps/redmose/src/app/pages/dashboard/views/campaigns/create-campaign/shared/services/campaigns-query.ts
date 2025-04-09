import {Observable} from 'rxjs';

export abstract class CampaignsQuery {
    abstract fetchObjectives(): void;

    abstract fetchPlatforms(): void;

    abstract fetchObjectivesState(): Observable<any>;

    abstract fetchPlatformsState(): Observable<any>;

    abstract fetchStaticData(): void;

    abstract fetchObjectivesEvents(id): void;

    abstract fetchObjectivesGoals(objective: number, platform: number): void;

    abstract fetchLeadGenerationForms(platform: any, page: any): void;

    abstract fetchPlatformsPages(id): void;

    abstract fetchSelectedObjectiveState(): Observable<any>;

    abstract fetchCountries();

    abstract fetchCites(code, platform);

    abstract fetchLooklike(platform);

    abstract fetchCustomAudience(platform);

    abstract fetchDemoGraphics(platform);

    abstract fetchDemoBehaviors(platform);

    abstract fetchDemoInterests(platform);

    abstract fetchPlatformsOfPlatform(platform);

    abstract fetchPlatformsOfPlacements(platform);

    abstract fetchPlatformsOfPixels(platform);

    abstract fetchPlatformsCTA(objective, platform);

    abstract createCampaign(request): Observable<any>;

    abstract filterByLabel(data, searchText): any;

    abstract circularToJSON(obj): any;

    abstract parseCircularToJSON(obj): any;

    abstract toggleLoader(status);

    abstract createNewLeadForm(value, platform, page): Observable<any>
}
