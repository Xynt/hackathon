import {Component, EventEmitter, Input, Output} from '@angular/core';

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

  @Output()
  onLeftClick: EventEmitter<any> = new EventEmitter();

  @Output()
  onRightClick: EventEmitter<any> = new EventEmitter();
}
