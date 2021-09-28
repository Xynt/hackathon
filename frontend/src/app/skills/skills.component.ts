import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable} from "@angular/material/table";
import {Observable} from "rxjs";
import {FormControl, ValidatorFn, Validators} from "@angular/forms";
import {map, startWith} from "rxjs/operators";
import {existsValidator} from "../service/directive/exists.directive";
import {notExistsValidator} from "../service/directive/not-exists.directive";

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  skills: Skill[] = [{name: "Spring"}, {name: "CSS"}, {name: "HTML"}];
  displayedColumns: string[] = ["name"];
  suggestions: Skill[] = [{name: "Spring"}, {name: "CSS"}, {name: "HTML"}, {name: "Angular"}, {name: "DOTNET"}, {name: "Test"}]

  notExistsValidator: ValidatorFn = notExistsValidator(this.skills.map(skill => skill.name));

  skillControl: FormControl = new FormControl("", [
    Validators.required,
    existsValidator(this.suggestions.map(skill => skill.name)),
    this.notExistsValidator
  ]);

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
      this.resetExistsValidator()
      this.table.renderRows();
      this.skillControl.reset();
    }
  }

  resetExistsValidator(): void {
    this.skillControl.removeValidators(this.notExistsValidator)
    this.notExistsValidator = notExistsValidator(this.skills.map(skill => skill.name));
    this.skillControl.addValidators(this.notExistsValidator);
  }

  _filter(value: string): Skill[] {
    if (!value) {
      value = "";
    }

    const filterValue = value.toLowerCase();

    let existingValuesRemovedSuggestions = this.suggestions.filter(option => !this.skills.map(skill => skill.name).includes(option.name))
    let searchFilteredSuggestions = existingValuesRemovedSuggestions.filter(option => option.name.toLowerCase().includes(filterValue));
    return searchFilteredSuggestions.splice(0, 5);
  }
}

export interface Skill {
  name: string;
}
