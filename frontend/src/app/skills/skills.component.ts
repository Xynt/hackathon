import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable} from "@angular/material/table";
import {Observable} from "rxjs";
import {FormControl, Validators} from "@angular/forms";
import {map, startWith} from "rxjs/operators";
import {existsValidator} from "../service/directive/exists.directive";

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  skills: Skill[] = [{name: "Spring"}, {name: "CSS"}, {name: "HTML"}];
  displayedColumns: string[] = ["name"];
  suggestions: Skill[] = [{name: "Spring"}, {name: "CSS"}, {name: "HTML"}, {name: "Angular"}, {name: "DOTNET"}, {name: "Test"}]
  skillControl: FormControl = new FormControl("", [Validators.required, existsValidator(this.suggestions.map(skill => skill.name))]);

  filteredSuggestions!: Observable<Skill[]>;

  @ViewChild(MatTable) table!: MatTable<Skill>;

  ngOnInit(): void {
    this.filteredSuggestions = this.skillControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  addSkill(): void {
    if (this.skillControl.valid) {
      this.skills.push({name: this.skillControl.value});
      this.skillControl.setValue("");
      this.table.renderRows();
    }
  }

  _filter(value: string): Skill[] {
    const filterValue = value.toLowerCase();

    return this.suggestions.filter((option => option.name.toLowerCase().includes(filterValue))).splice(0, 5);
  }
}

export interface Skill {
  name: string;
}
