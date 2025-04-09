import { createFeature } from "@ngrx/store";
import { appReducer } from "../reducer/app.reducer";

export const appFeature = createFeature({
    name: 'app',
    reducer: appReducer,
    
  });