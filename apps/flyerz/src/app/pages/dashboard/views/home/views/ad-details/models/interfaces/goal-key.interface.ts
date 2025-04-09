export interface AdGoalKey {
  insights: Array<string>;
  costPerActionType?: Array<string>;
  cards: {
    insights: Array<string>;
    costPerActionType?: Array<string>;
    currency?: Array<string>;
  };
}
