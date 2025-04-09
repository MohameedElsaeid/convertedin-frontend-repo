import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HeaderComponent, NavbarComponent, SidebarComponent } from "@convertedin3/shared/components";

export  const DASHBOARD_IMPORTS = [
    CommonModule,
    RouterModule,
    NavbarComponent,
    SidebarComponent,
    HeaderComponent
];