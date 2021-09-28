import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable} from "@angular/material/table";
import {Observable} from "rxjs";
import {FormControl, ValidatorFn, Validators} from "@angular/forms";
import {map, startWith} from "rxjs/operators";
import {existsValidator} from "../service/directive/exists.directive";
import {notExistsValidator} from "../service/directive/not-exists.directive";
import {Router} from "@angular/router";
import {Skill} from "../../../peoplefinder-api/model/skill";
import {Person} from "../../../peoplefinder-api/model/person";

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  persons: Person[] = []
  skills: Skill[] = [];
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

  constructor(private router: Router) {
    try {
      this.skills = router.getCurrentNavigation()!.extras.state!.selectedSkills;
      this.persons = router.getCurrentNavigation()!.extras.state!.selectedPersons;
    } catch (e) {
    }
  }

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

  continueWithData(): void {
    this.router.navigate(["persons"], {state: {selectedSkills: this.skills, selectedPersons: this.persons}})
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
