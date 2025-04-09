import { Routes } from "@angular/router";
import { PricingComponent } from "./pricing.component";

export const PRICING_ROUTES: Routes = [
    {
      path: '',
      component: PricingComponent,
      children: [
        {
            path: "",
            loadComponent: () => import('./views/main/main.component').then(m => m.MainComponent)
        },
        {
            path: "details",
            loadComponent: () => import('./views/details/details.component').then(m => m.DetailsComponent)
        },
      ],
    },
  ];