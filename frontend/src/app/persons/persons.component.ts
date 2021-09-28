import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, ValidatorFn, Validators} from "@angular/forms";
import {existsValidator} from "../service/directive/exists.directive";
import {Observable} from "rxjs";
import {notExistsValidator} from "../service/directive/not-exists.directive";
import {Person} from "../../../peoplefinder-api/model/person";
import {Skill} from "../../../peoplefinder-api/model/skill";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {

  persons: Person[] = [
    {
      code: "stde",
      firstName: "Stefan",
      lastName: "Derungs"
    },
    {
      code: "xaro",
      firstName: "Xabier",
      lastName: "Rodriguez"
    },
  ]
  displayedColumns: string[] = ["code", "firstname", "lastname"];

  filteredSuggestions!: Observable<Person[]>;
  allPersons: Person[] = [
    {
      code: "stde",
      firstName: "Stefan",
      lastName: "Derungs"
    },
    {
      code: "xaro",
      firstName: "Xabier",
      lastName: "Rodriguez"
    },
    {
      code: "lybo",
      firstName: "Lyndsey",
      lastName: "Bonelli"
    },
    {
      code: "davo",
      firstName: "Davide",
      lastName: "Vanoni"
    },
    {
      code: "anko",
      firstName: "Andres",
      lastName: "Konrad"
    },
  ]

  notExistsValidator: ValidatorFn = notExistsValidator(this.persons.map(person => person.code));

  personControl: FormControl = new FormControl("", [
    Validators.required,
    existsValidator(this.allPersons.map(person => person.code)),
    this.notExistsValidator
  ]);
  skills: Skill[] = [];

  constructor(private router: Router) {
    try {
      this.skills = router.getCurrentNavigation()!.extras.state!.selectedSkills;
    } catch (e) {
      this.router.navigate(["/skills"]);
    }
  }

  ngOnInit(): void {
    this.filteredSuggestions = this.personControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }


  _filter(value: string): Person[] {
    if (!value) {
      value = "";
    }

    const filterValue = value.toLowerCase();

    let existingValuesRemovedSuggestions = this.allPersons.filter(option => !this.persons.map(person => person.code).includes(option.code))
    let searchFilteredSuggestions = existingValuesRemovedSuggestions.filter(option => option.code.toLowerCase().includes(filterValue));
    return searchFilteredSuggestions.splice(0, 5);
  }

}
