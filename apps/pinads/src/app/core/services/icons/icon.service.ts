import { Injectable } from '@angular/core';
import { SvgIconRegistryService } from 'angular-svg-icon';
import { iconList } from 'apps/pinads/src/assets/icons/icons';
@Injectable()
export class IconService {
  constructor(private SvgIconService: SvgIconRegistryService) {
    this.registerIcons();
  }
  registerIcons() {
    iconList.forEach((icon) => this.SvgIconService.loadSvg(icon.url, icon.name));
  }
}
