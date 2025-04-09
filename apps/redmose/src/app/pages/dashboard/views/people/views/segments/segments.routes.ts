import { Routes } from "@angular/router";
import { SegmentsComponent } from "./segments.component";

export const SEGMENTS_ROUTES : Routes = [
    {
        path: "",
        component: SegmentsComponent,
        children:[
            {
                path: "",
                loadComponent: () => import("./views/segments-table/segments-table.component").then(
                    (component) => component.SegmentsTableComponent
                )
            }
        ]
    }
];

//Since the segments will have multiple views later on we opted for internal routing
//Lazy loading for standalone components
