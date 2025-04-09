import { Injectable } from '@angular/core';
import { CreateAdApi } from '../base/create-ad.base';
import { QueryApi } from '@convertedin/api';
import { Observable } from 'rxjs';
import { CreateAdEndpoints } from '../constant/create-ad.constant';
import {
  AdGoal,
  AdSuggestions,
  CategoryItem,
  CreateAd,
  CreateAdChannel,
  LocationItem,
  MatchAdSuggestions,
  ReachEstimate,
  ReachEstimateRequest,
  SocialMediaPosts,
  SuggestionItem,
} from '../models';
import { CreateAdState } from '@flyerz/store/create-ad';
import { MatchSuggestions } from '../models/interfaces/match-suggestions.interface';
import { LocalStorageConstants } from '@flyerz/shared/constants';

@Injectable()
export class CreateAdApiService extends CreateAdApi {
  constructor(private __queryApi: QueryApi) {
    super();
  }

  override getAreas(
    cityId: number,
    offset?: number | undefined,
    limit?: number | undefined,
    q?: string | undefined
  ): Observable<{ data: Array<LocationItem> }> {
    return this.__queryApi.get(CreateAdEndpoints.GET_AREAS(cityId), {
      params: {
        offset: offset!,
        limit: limit!,
        q: q!,
      },
    });
  }

  override getCities(
    offset?: number | undefined,
    limit?: number | undefined,
    q?: string | undefined
  ): Observable<{ data: Array<LocationItem> }> {
    return this.__queryApi.get(CreateAdEndpoints.GET_CITIES, {
      params: {
        offset: offset!,
        limit: limit!,
        q: q!,
      },
    });
  }

  override getBehaviours(
    offset?: number | undefined,
    limit?: number | undefined,
    q?: string | undefined
  ): Observable<{ data: CategoryItem[] }> {
    return this.__queryApi.get(CreateAdEndpoints.GET_BEHAVIOURS, {
      params: {
        limit: limit!,
        offset: offset!,
        q: q!,
      },
    });
  }

  override getDemographics(
    offset?: number | undefined,
    limit?: number | undefined,
    q?: string | undefined
  ): Observable<{ data: CategoryItem[] }> {
    return this.__queryApi.get(CreateAdEndpoints.GET_DEMOGRAPHICS, {
      params: {
        limit: limit!,
        offset: offset!,
        q: q!,
      },
    });
  }

  override getInterests(
    offset?: number | undefined,
    limit?: number | undefined,
    q?: string | undefined
  ): Observable<{ data: SuggestionItem[] }> {
    return this.__queryApi.get(CreateAdEndpoints.GET_INTERESTS, {
      params: {
        offset: offset!,
        limit: limit!,
        q: q!,
      },
    });
  }

  override createReachEstimate(
    data: MatchAdSuggestions
  ): Observable<{ data: ReachEstimate }> {
    return this.__queryApi.post(
      CreateAdEndpoints.REACH_ESTIMATE,
      this.createReachEstimateData(data)
    );
  }

  override createAd(ad: CreateAdState): Observable<any> {
    return this.__queryApi.post(
      CreateAdEndpoints.CREATE_AD,
      this.createAdData(ad)
    );
  }

  override matchAdSuggestions(
    suggestions: AdSuggestions
  ): Observable<{ data: MatchAdSuggestions }> {
    return this.__queryApi.post(
      CreateAdEndpoints.MATCH_AD_SUGGESTIONS,
      this.createMatchSuggestions(suggestions)
    );
  }

  override getChannels(): Observable<{ data: Array<CreateAdChannel> }> {
    return this.__queryApi.get(CreateAdEndpoints.GET_CHANNELS);
  }

  override getFacebookPosts(
    offset?: number,
    limit?: number
  ): Observable<SocialMediaPosts> {
    return this.__queryApi.get(CreateAdEndpoints.GET_FACEBOOK_POSTS, {
      params: {
        offset: offset!,
        limit: limit!,
      },
    });
  }

  override getInstagramPosts(next?: string): Observable<SocialMediaPosts> {
    return this.__queryApi.get(CreateAdEndpoints.GET_INSTAGRAM_POSTS, {
      params: next ? { next } : {},
    });
  }

  override getGoals(): Observable<{ data: AdGoal[] }> {
    return this.__queryApi.get(CreateAdEndpoints.GET_GOALS);
  }

  override createAdByAI(
    adContent: string
  ): Observable<{ data: AdSuggestions }> {
    return this.__queryApi.post(CreateAdEndpoints.CREATE_AD_BY_AI, {
      adContent,
    });
  }

  protected override createReachEstimateData(
    data: MatchAdSuggestions
  ): ReachEstimateRequest {
    return {
      country:
        data.areas.length !== 0 || data.cities.length !== 0
          ? ''
          : data.countries[0]?.key,
      areas: data.areas.map((item) => item.id),
      cities: data.areas.length !== 0 ? [] : data.cities.map((item) => item.id),
      behaviors: data.behaviors.map((item) => item.id),
      demographics: data.demographics.map((item) => item.id),
      gender: typeof data.gender === 'string' ? data.gender : data.gender[0],
      interests: data.interests.map((item) => item.id),
    };
  }

  protected override createMatchSuggestions(
    suggestions: AdSuggestions
  ): MatchSuggestions {
    return {
      ...suggestions.targeting,
      gender: suggestions.gender,
      behaviors: suggestions.behaviors.map((item) => item.name),
      demographics: suggestions.demographics.map((item) => item.name),
      interests: suggestions.interests.map((item) => item.name),
      objective: suggestions.objective,
      maximumAge: suggestions.maximumAge,
      minimumAge: suggestions.minimumAge,
      countries:
        typeof suggestions.targeting.countries === 'string'
          ? [suggestions.targeting.countries]
          : suggestions.targeting.countries,
    };
  }

  protected override createAdData(ad: CreateAdState): CreateAd {
    return {
      areas: ad.adSuggestions!.areas.map((item) => item.id),
      behaviours: ad.adSuggestions!.behaviors.map((item) => item.id),
      budget: ad.adSuggestions!.minimumBudget.amount,
      channel_id: ad.channel!.id,
      cities:
        ad.adSuggestions!.areas.length !== 0
          ? []
          : ad.adSuggestions!.cities.map((item) => item.id),
      countryId: JSON.parse(
        localStorage.getItem(LocalStorageConstants.COUNTRY_ID)!
      ),
      days: ad.adSuggestions!.days,
      demographics: ad.adSuggestions!.demographics.map((item) => item.id),
      gender: ad.adSuggestions!.gender as string,
      goal_id: ad.goal!.id,
      images: ad.post!.attachments!.data,
      interests: ad.adSuggestions!.interests.map((item) => item.id),
      maxAge: ad?.aiSuggestions?.maximumAge || 65,
      minAge: ad?.aiSuggestions?.minimumAge || 18,
      message: ad.post!.postMessage,
      post_id: ad.channel!.id === 2 ? undefined : ad.post!.postId,
      instagram_post_id: ad.channel!.id === 2 ? ad.post!.postId : undefined,
      type: 2,
    };
  }
}
