import { Component } from '@angular/core';
import { AppInitializerService } from './core/services';
import { appImports }  from './imports';
@Component({
  standalone: true,
  imports: [appImports],
  selector: 'convertedin-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private __appInit: AppInitializerService){}

  ngOnInit(): void {
    this.__appInit.init();
  }

  ngOnDestroy(): void {
    this.__appInit.ngOnDestroy();
  }
}
