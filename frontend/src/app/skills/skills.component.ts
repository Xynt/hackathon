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
import {SkillsServiceApi} from "../../../peoplefinder-api/api/skills.service";
import {TeamSetupService} from "../service/team-setup.service";

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  selectedPersons: Person[] = []
  selectedSkills: Skill[] = [];

  selectableSkills: Skill[] = [];

  displayedColumns: string[] = ["name"];

  notExistsValidator: ValidatorFn = notExistsValidator(this.selectedSkills.map(skill => skill.name));

  skillControl: FormControl = new FormControl("", []);

  filteredSuggestions!: Observable<Skill[]>;

  @ViewChild(MatTable) table!: MatTable<Skill>;

  constructor(private router: Router, private skillsServiceApi: SkillsServiceApi, private teamSetupService: TeamSetupService) {
  }

  ngOnInit(): void {
    this.selectedSkills = [...this.teamSetupService.skills];
    this.selectedPersons = [...this.teamSetupService.people];

    this.skillsServiceApi.getSkills().subscribe(allSkills => {
      this.selectableSkills = allSkills;
      this.skillControl.addValidators([
        Validators.required,
        existsValidator(this.selectableSkills.map(skill => skill.name)),
        this.notExistsValidator
      ])
    });
    this.filteredSuggestions = this.skillControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  addSkill(): void {
    if (this.skillControl.valid) {
      this.selectedSkills.push({name: this.skillControl.value});
      this.skillControl.setValue("");
      this.resetExistsValidator()
      this.table.renderRows();
      this.skillControl.reset();
    }
  }

  resetExistsValidator(): void {
    this.skillControl.removeValidators(this.notExistsValidator)
    this.notExistsValidator = notExistsValidator(this.selectedSkills.map(skill => skill.name));
    this.skillControl.addValidators(this.notExistsValidator);
  }

  continueWithData(): void {
    this.teamSetupService.skills = this.selectedSkills;
    this.router.navigate(["persons"])
  }

  _filter(value: string): Skill[] {
    if (!value) {
      value = "";
    }

    const filterValue = value.toLowerCase();

    let existingValuesRemovedSuggestions = this.selectableSkills.filter(option => !this.selectedSkills.map(skill => skill.name).includes(option.name))
    let searchFilteredSuggestions = existingValuesRemovedSuggestions.filter(option => option.name.toLowerCase().includes(filterValue));
    return searchFilteredSuggestions.splice(0, 5);
  }
}
