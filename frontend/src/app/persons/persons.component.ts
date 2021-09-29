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
import {PersonWithProficiency} from "../model/person-with-proficiency"

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {

  persons: Person[] = [];
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

  tableEntries: PersonWithProficiency[] = [];

  @ViewChild(MatTable) table!: MatTable<PersonWithProficiency>;

  constructor(private router: Router) {
    try {
      this.skills = router.getCurrentNavigation()!.extras.state!.selectedSkills;
    } catch (e) {
      this.router.navigate(["/skills"]);
    }

    try {
      this.persons = router.getCurrentNavigation()!.extras.state!.selectedPersons;
    } catch (e) {
    }
  }

  ngOnInit(): void {
    this.filteredSuggestions = this.personControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );


    this.persons.forEach(person => this.tableEntries.push(this.personToPersonWithProficiency(person)));
    this.skills.forEach(skill => this.displayedColumns.push(skill.name));
  }

  addPerson(): void {
    if (this.personControl.valid) {
      this.persons.push(this.allPersons.find(person => person.code == this.personControl.value)!);
      this.tableEntries.push(this.personToPersonWithProficiency(this.allPersons.find(person => person.code == this.personControl.value)!))
      this.resetExistsValidator()
      this.table.renderRows();

      this.personControl.reset();

      console.log(this.tableEntries[0].proficiencies.get(this.skills[0]));
    }
  }

  personToPersonWithProficiency(person: Person): PersonWithProficiency {
    return new PersonWithProficiency(
      person,
      new Map(this.skills.map(skill => [skill, 0]))
    );
  }

  resetExistsValidator(): void {
    this.personControl.removeValidators(this.notExistsValidator)
    this.notExistsValidator = notExistsValidator(this.persons.map(person => person.code));
    this.personControl.addValidators(this.notExistsValidator);
  }

  navigateBack(): void {
    this.router.navigate(["skills"], {state: {selectedSkills: this.skills, selectedPersons: this.persons}})
  }

  getAccordingProficiencyValue(p: PersonWithProficiency, skillName: string): number {
    let skill: Skill = this.skills.find(s => s.name == skillName)!;
    return p.proficiencies.get(skill)!;
  }

  _filter(value: string): Person[] {
    if (!value) {
      value = "";
    }

    const filterValue = value.toLowerCase();

    let existingValuesRemovedSuggestions = this.allPersons.filter(option => !this.persons.map(person => person.code).includes(option.code))
    let searchFilteredSuggestions = existingValuesRemovedSuggestions.filter(option => {
      let includesCode = option.code.toLowerCase().includes(filterValue);
      let includesName = (option.firstName.toLowerCase() + " " + option.lastName.toLowerCase()).includes(filterValue);
      return includesCode || includesName;
    });
    return searchFilteredSuggestions.splice(0, 5);
  }

}
