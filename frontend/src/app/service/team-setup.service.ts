import {Injectable} from '@angular/core';
import {Skill} from "../../../peoplefinder-api/model/skill";
import {Config} from "../models/config";
import {Person} from "../../../peoplefinder-api/model/person";
import {TeamsServiceApi} from "../../../peoplefinder-api/api/teams.service";
import {ProficiencyPerPerson} from "../config/config.component";
import {Team} from "../../../peoplefinder-api/model/team";
import {Proficiency} from "../../../peoplefinder-api/model/proficiency";
import {Criteria} from "../../../peoplefinder-api/model/criteria";

@Injectable({
  providedIn: 'root'
})
export class TeamSetupService {
  private _people: Person[] = [];
  private _skills: Skill[] = [];
  private _config: Config = {teamDimension: 2};

  constructor(private teamsServiceApi: TeamsServiceApi) { }

  get people(): Person[] {
    return this._people;
  }

  set people(value: Person[]) {
    this._people = value;
  }

  get skills(): Skill[] {
    return this._skills;
  }

  set skills(value: Skill[]) {
    this._skills = value;
  }

  get config(): Config {
    return this._config;
  }

  set config(value: Config) {
    this._config = value;
  }

  submit(proficiencyPerPerson: ProficiencyPerPerson) {
    // map to Team
    let members: { [key: string]: Criteria } = {};
    Object.keys(proficiencyPerPerson).forEach(key => {
      members[key] = this.mapToCriteria(proficiencyPerPerson[key].proficiencies);
    })

    const team: Team = {members: members};
    console.log(team);
    this.teamsServiceApi.calculateTeams(team, this._config.teamDimension);
  }

  private mapToCriteria(proficiencies: Proficiency[]): Criteria {
    return {proficiencies: proficiencies};
  }
}
