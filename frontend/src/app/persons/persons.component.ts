import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, ValidatorFn, Validators} from "@angular/forms";
import {existsValidator} from "../service/directive/exists.directive";
import {Observable} from "rxjs";
import {notExistsValidator} from "../service/directive/not-exists.directive";
import {Person} from "../../../peoplefinder-api/model/person";
import {Skill} from "../../../peoplefinder-api/model/skill";
import {map, startWith} from "rxjs/operators";
import {MatTable} from "@angular/material/table";
import {PeopleServiceApi} from "../../../peoplefinder-api/api/people.service";
import {TeamSetupService} from "../service/team-setup.service";
import {PersonWithProficiency} from "../models/person-with-proficiency"
import {Proficiency} from "../../../peoplefinder-api/model/proficiency";

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {
  selectedPeople: PersonWithProficiency[] = [];
  selectedSkills: Skill[] = [];

  selectablePeople: Person[] = [];

  displayedColumns: string[] = ["code", "firstname", "lastname"];
  filteredSuggestions!: Observable<Person[]>;

  notExistsValidator: ValidatorFn = notExistsValidator(this.selectedPeople.map(p => p.person.code));
  personControl: FormControl = new FormControl("", []);

  @ViewChild(MatTable) table!: MatTable<PersonWithProficiency>;

  constructor(private router: Router, private peopleServiceApi: PeopleServiceApi, private teamSetupService: TeamSetupService) {
  }

  ngOnInit(): void {
    this.selectedSkills = [...this.teamSetupService.skills];
    if (!this.selectedSkills) {
      this.router.navigate(["/skills"]);
    }
    this.selectedPeople = [...this.teamSetupService.people];

    this.peopleServiceApi.getPeople().subscribe(people => {
      this.selectablePeople = people;
      this.personControl.addValidators([
        Validators.required,
        existsValidator(this.selectablePeople.map(person => person.code)),
        this.notExistsValidator
      ])
    })

    this.filteredSuggestions = this.personControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.selectedSkills.forEach(skill => this.displayedColumns.push(skill.name));
  }

  addPerson(): void {
    if (this.personControl.valid) {
      this.selectedPeople.push(this.personToPersonWithProficiency(this.selectablePeople.find(person => person.code == this.personControl.value)!));
      this.resetExistsValidator()
      this.table.renderRows();
      this.personControl.reset();
    }
  }

  personToPersonWithProficiency(person: Person): PersonWithProficiency {
    return new PersonWithProficiency(
      person,
      this.selectedSkills.map(skill => <Proficiency>{skill: skill, rating: 0})
    );
  }

  resetExistsValidator(): void {
    this.personControl.removeValidators(this.notExistsValidator)
    this.notExistsValidator = notExistsValidator(this.selectedPeople.map(p => p.person.code));
    this.personControl.addValidators(this.notExistsValidator);
  }

  navigateBack(): void {
    this.router.navigate(["skills"]);
    this.teamSetupService.people = this.selectedPeople;
  }

  continueWithData(): void {
    this.teamSetupService.people = this.selectedPeople;
    this.router.navigate(["config"]);
  }

  getAccordingProficiencyValue(p: PersonWithProficiency, skillName: string): number {
    return p.proficiencies.find(p => p.skill.name == skillName)!.rating;
  }

  editedFor(p: PersonWithProficiency, skillName: string, value: number) {
    let skill: Skill = this.selectedSkills.find(s => s.name == skillName)!;
    this.selectedPeople.find(entry => entry.person.code == p.person.code)!.proficiencies.find(p => p.skill.name == skillName)!.rating = value;
  }

  _filter(value: string): Person[] {
    if (!value) {
      value = "";
    }

    const filterValue = value.toLowerCase();

    let existingValuesRemovedSuggestions = this.selectablePeople.filter(option => !this.selectedPeople.map(p => p.person.code).includes(option.code))
    let searchFilteredSuggestions = existingValuesRemovedSuggestions.filter(option => {
      let includesCode = option.code.toLowerCase().includes(filterValue);
      let includesName = (option.firstName.toLowerCase() + " " + option.lastName.toLowerCase()).includes(filterValue);
      return includesCode || includesName;
    });
    return searchFilteredSuggestions.splice(0, 5);
  }

}
