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

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {
  selectedPeople: Person[] = [];
  selectedSkills: Skill[] = [];

  selectablePeople: Person[] = [];

  displayedColumns: string[] = ["code", "firstname", "lastname"];
  filteredSuggestions!: Observable<Person[]>;

  notExistsValidator: ValidatorFn = notExistsValidator(this.selectedPeople.map(person => person.code));
  personControl: FormControl = new FormControl("", []);

  @ViewChild(MatTable) table!: MatTable<Skill>;

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
  }

  addPerson(): void {
    if (this.personControl.valid) {
      this.selectedPeople.push(this.selectablePeople.find(person => person.code == this.personControl.value)!);
      this.resetExistsValidator()
      this.table.renderRows();
      this.personControl.reset();
    }
  }

  resetExistsValidator(): void {
    this.personControl.removeValidators(this.notExistsValidator)
    this.notExistsValidator = notExistsValidator(this.selectedPeople.map(person => person.code));
    this.personControl.addValidators(this.notExistsValidator);
  }

  navigateBack(): void {
    this.router.navigate(["skills"])
  }

  continueWithData(): void {
    this.teamSetupService.people = this.selectedPeople;
    this.router.navigate(["config"])
  }

  _filter(value: string): Person[] {
    if (!value) {
      value = "";
    }

    const filterValue = value.toLowerCase();

    let existingValuesRemovedSuggestions = this.selectablePeople.filter(option => !this.selectedPeople.map(person => person.code).includes(option.code))
    let searchFilteredSuggestions = existingValuesRemovedSuggestions.filter(option => {
      let includesCode = option.code.toLowerCase().includes(filterValue);
      let includesName = (option.firstName.toLowerCase() + " " + option.lastName.toLowerCase()).includes(filterValue);
      return includesCode || includesName;
    });
    return searchFilteredSuggestions.splice(0, 5);
  }

}
