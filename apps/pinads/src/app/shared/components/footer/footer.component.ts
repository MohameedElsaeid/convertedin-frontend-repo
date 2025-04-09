import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
declare const FreshworksWidget: any;
@Component({
  selector: 'convertedin-footer',
  standalone: true,
  imports: [TranslateModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  contactUs() {
  
    FreshworksWidget('setLabels', {
      ar: {
        banner: 'تجربيه',
        launcher: 'Soutien',
        contact_form: {
          title: 'Contactez nous',
          submit: 'Envoyer',
          confirmation: 'Nous reviendrons vers vous bientôt',
        },
      },
    });
    FreshworksWidget('open');
  }
}
