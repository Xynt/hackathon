import {Person} from "../../../peoplefinder-api/model/person";
import {Proficiency} from "../../../peoplefinder-api/model/proficiency";

export class PersonWithProficiency {
  person: Person;
  proficiencies: Proficiency[];

  constructor(person: Person, proficiencies: Proficiency[]) {
    this.person = person;
    this.proficiencies = proficiencies;
  }
}
