import { Injectable } from '@angular/core';
import { CampaignsApi } from '../base/campaigns';
import { map, Observable } from 'rxjs';
import { QueryApi } from '@convertedin/api';
import { Endpoints } from '../../constants/endpoints';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CampaignsService implements CampaignsApi {
  constructor(private queryApi: QueryApi) {}

  fetchObjectives(): Observable<any> {
    return this.queryApi.get(Endpoints.CAMPAIGNS_OBJECTIVES);
  }

  fetchPlatforms(): Observable<any> {
    return this.queryApi.get(Endpoints.CAMPAIGNS_PLATFORMS);
  }

  fetchObjectivesEvents(id: any): Observable<any> {
    return this.queryApi.get(Endpoints.OBJECTIVES_EVENTS(id));
  }

  fetchObjectivesGoals(objective: number, platform: number): Observable<any> {
    return this.queryApi.get(Endpoints.OBJECTIVES_GOALS(objective, platform));
  }

  fetchPlatformsPages(id: any): Observable<any> {
    return this.queryApi.get(Endpoints.PLATFORMS_PAGES(id));
  }

  fetchLanguages(): Observable<any> {
    return this.queryApi.get(Endpoints.LANGUAGES);
  }

  fetchCountries(): Observable<any> {
    return this.queryApi.get(Endpoints.COUNTRIES);
  }

  fetchCities(code: any, platform: any): Observable<any> {
    return this.queryApi.get(Endpoints.CITES(code, platform));
  }

  fetchLooklike(platform: any): Observable<any> {
    return this.queryApi.get(Endpoints.LOOKALIKE(platform));
  }

  fetchCustomAudience(platform: any): Observable<any> {
    return this.queryApi.get(Endpoints.CUSTOM_AUDIENCE(platform));
  }
  randomId(length = 6) {
    return Math.random()
      .toString(36)
      .substring(2, length + 2);
  }

  mainCategoryId = null;

  mapData(data: any) {
    return data.map((item: any, index: any) => {
      if (item.mainCategoryId) {
        this.mainCategoryId = item.mainCategoryId;
      }
      const obj = {
        ...item,
        key: item.label + new Date().getTime() + this.randomId(),
        mainCategoryId: this.mainCategoryId,
        selected: false,
        // label: item.name,
        // data: item.name,
        // icon: 'pi pi-fw pi-inbox',
        // children: []
      };

      if (item.children && item.children.length) {
        obj.children = this.mapData(item.children);
      }

      if (item.items && item.items.length) {
        obj.children = this.mapData(item.items);
      }

      return JSON.parse(JSON.stringify(obj));
    });
  }

  fetchDemoGraphics(platform: any): Observable<any> {
    return this.queryApi.get(Endpoints.DEMOGRAPHICS(platform)).pipe(
      map((res) => {
        res.data = this.mapData(res.data);
        return res;
      })
    );
  }

  fetchDemoBehaviors(platform: any): Observable<any> {
    return this.queryApi.get(Endpoints.BEHAVIORS(platform)).pipe(
      map((res) => {
        res.data = this.mapData(res.data);
        return res;
      })
    );
  }

  fetchDemoInterests(platform: any): Observable<any> {
    return this.queryApi.get(Endpoints.INTERESTS(platform)).pipe(
      map((res) => {
        res.data = this.mapData(res.data);
        return res;
      })
    );
  }

  fetchPlatformsOfPlatform(platform: any): Observable<any> {
    return this.queryApi.get(Endpoints.PLATFORMS_PLATFORM(platform));
  }

  fetchPlatformsOfPlacements(platform: any): Observable<any> {
    return this.queryApi.get(Endpoints.PLACEMENT_CATEGORIES(platform));
  }

  fetchPlatformsOfPixels(platform: any): Observable<any> {
    return this.queryApi.get(Endpoints.PLACEMENT_PIXELS(platform));
  }

  fetchPlatformsCTA(objective: any, platform: any): Observable<any> {
    return this.queryApi.get(Endpoints.CTA(objective, platform)).pipe(
      map((res) => {
        return res.data.map((item: any) => {
          return {
            ...item,
            name: item.title.replace(/_/g, ' ').toLowerCase(),
          };
        });
      })
    );
  }

  fetchLeadGenerationForms(platform: any, page: any): Observable<any> {
    return this.queryApi.get(Endpoints.LEAD_GENERATION_FORMS(platform, page));
  }

  upload(file: any): Observable<any> {
    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append('file', file, file.name);

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'multipart/form-data');
    return this.queryApi.post(Endpoints.UPLOAD, formData, {
      reportProgress: true,
    });
  }

  createCampaign(request: any): Observable<any> {
    return this.queryApi.post(Endpoints.CREATE_CAMPAIGN, request);
  }

  createNewLeadForm(value: any, platform: any, page: any): Observable<any> {
    return this.queryApi.post(
      Endpoints.CREATE_LEAD_FORM(platform, page),
      value
    );
  }
  
  fetchStoreInfo(): Observable<any> {
    return this.queryApi.get(Endpoints.STORE_INFO);
  }
}
