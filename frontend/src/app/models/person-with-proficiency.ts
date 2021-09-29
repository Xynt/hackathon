import {Person} from "../../../peoplefinder-api/model/person";
import {Skill} from "../../../peoplefinder-api/model/skill";

export class PersonWithProficiency {
  person: Person;
  proficiencies: Map<Skill, number>;

  constructor(person: Person, proficiencies: Map<Skill, number>) {
    this.person = person;
    this.proficiencies = proficiencies;
  }
}
