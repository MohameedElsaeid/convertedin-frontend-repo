import { Component, HostBinding } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowBuilderApiModule } from '@redmose/shared/api';

@Component({
  selector: 'convertedin-flow-builder',
  templateUrl: './flow-builder.component.html',
  styleUrls: ['./flow-builder.component.scss'],
  standalone: true,
  imports: [RouterOutlet, FlowBuilderApiModule],
})
export class FlowBuilderComponent {
  @HostBinding('class') class = 'flex flex-column flex-grow-1';
}
