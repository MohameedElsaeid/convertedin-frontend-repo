import { AdGoals } from '@flyerz/shared/api';
import { AdGoalKeys } from '../../models/interfaces';

export const goals: AdGoalKeys = {
  // Post engagement
  [AdGoals.POST_ENGAGEMENT]: {
    insights: [
      'totalInlinePostEngagement',
      'totalCostPerInlinePostEngagement',
      'comment',
      'pageEngagement',
      'clicks',
      'totalCpc',
      'like',
      'linkClick',
      'videoView',
      'photoView',
      'frequency',
    ],
    costPerActionType: ['postEngagement', 'like', 'linkClick', 'videoView'],
    cards: {
      insights: ['reach', 'postEngagement', 'impressions'],
      costPerActionType: ['postEngagement'],
      currency: ['spend', 'postEngagement'],
    },
  },
  // Page engagement
  [AdGoals.PAGE_LIKES]: {
    insights: [
      'comment',
      'postEngagement',
      'clicks',
      'totalCpc',
      'like',
      'linkClick',
      'videoView',
      'photoView',
      'frequency',
    ],
    costPerActionType: ['like', 'linkClick', 'videoView'],
    cards: {
      insights: ['reach', 'pageEngagement', 'impressions'],
      costPerActionType: ['pageEngagement'],
      currency: ['spend', 'pageEngagement'],
    },
  },
  // Messages
  [AdGoals.MESSAGES]: {
    insights: [
      'postEngagement',
      'pageEngagement',
      'totalInlinePostEngagement',
      'totalCostPerInlinePostEngagement',
      'comment',
      'clicks',
      'totalCpc',
      'like',
      'linkClick',
      'videoView',
      'photoView',
      'frequency',
    ],
    costPerActionType: ['like', 'linkClick', 'videoView'],
    cards: {
      insights: ['reach', 'messagingFirstReply', 'impressions'],
      costPerActionType: ['messagingFirstReply'],
      currency: ['spend', 'messagingFirstReply'],
    },
  },
  // Lead gen
  [AdGoals.LEAD_GENERATION]: {
    insights: [
      'costPerActionLead',
      'postEngagement',
      'pageEngagement',
      'totalInlinePostEngagement',
      'totalCostPerInlinePostEngagement',
      'comment',
      'clicks',
      'totalCpc',
      'like',
      'linkClick',
      'videoView',
      'photoView',
      'frequency',
    ],
    costPerActionType: ['like', 'linkClick', 'videoView'],
    cards: {
      insights: ['lead', 'reach'],
      // costPerActionType: ['messagingFirstReply'],
      currency: ['spend'],
    },
  },
};
