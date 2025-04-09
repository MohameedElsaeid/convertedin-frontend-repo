import { Route } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';

export const appRoutes: Route[] = [
    {
        path: '',
        redirectTo: "calculator",
        pathMatch: 'full'
    },
    {
        path: '', //this will be the default url, checks for the children in the default path and renders it inside the mainLayoutComponent
        component: MainLayoutComponent,
        children: [
            {
                path: "calculator",
                loadComponent: () => import('./pages/calculator/calculator.component').then(m => m.CalculatorComponent)
            },
            {
                path: "pricing",
                loadChildren: () =>
                    import('./pages/pricing/pricing.routes').then(
                      (routes) => routes.PRICING_ROUTES
                    ),
            }
        ]
    }
];
