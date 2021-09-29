import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-table-input-entry',
  templateUrl: './table-input-entry.component.html',
  styleUrls: ['./table-input-entry.component.scss']
})
export class TableInputEntryComponent implements OnInit {

  @Input()
  value: number = 0;

  control: FormControl = new FormControl();

  @Output("onChange")
  changeEmitter: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit(): void {
    this.control.setValue(this.value);
  }

}
