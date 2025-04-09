import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { AppInitializerService } from './core/services';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { NgClass } from '@angular/common';

@Component({
  selector: 'convertedin-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet, ToastModule, NgClass],
})
export class AppComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'flex flex-column flex-grow-1';
  title = 'flyerz';
  get dir() {
    return document.documentElement.dir;
  }

  constructor(private __appInit: AppInitializerService) {}

  ngOnInit(): void {
    this.__appInit.init();
  }

  ngOnDestroy(): void {
    this.__appInit.ngOnDestroy();
  }
}
