import { Component, OnInit } from '@angular/core';
import { environment } from '../environment/environment';

@Component({
  selector: 'convertedin-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'redmosde';

  ngOnInit(): void {
    if (environment.enableHotjar) {
      this.initHotjar();
    }
  }

  initHotjar(): void {
    const script = document.createElement('script');
    script.innerHTML = `(function (h, o, t, j, a, r) { h.hj = h.hj || function () { (h.hj.q = h.hj.q || []).push(arguments); }; h._hjSettings = { hjid: 3824903, hjsv: 6 }; a = o.getElementsByTagName('head')[0]; r = o.createElement('script'); r.async = 1; r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv; a.appendChild(r); })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');`;
    document.body.appendChild(script);
  }
}
