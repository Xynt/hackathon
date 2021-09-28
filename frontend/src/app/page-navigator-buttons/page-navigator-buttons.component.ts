import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-page-navigator-buttons',
  templateUrl: './page-navigator-buttons.component.html',
  styleUrls: ['./page-navigator-buttons.component.scss']
})
export class PageNavigatorButtonsComponent {
  @Input()
  showLeft: boolean = true;

  @Input()
  showRight: boolean = true;
}
