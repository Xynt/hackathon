import {Injectable} from '@angular/core';
import {Skill} from "../../../peoplefinder-api/model/skill";
import {Config} from "../models/config";
import {Person} from "../../../peoplefinder-api/model/person";
import {TeamsServiceApi} from "../../../peoplefinder-api/api/teams.service";
import {ProficiencyPerPerson} from "../config/config.component";
import {Team} from "../../../peoplefinder-api/model/team";
import {Proficiency} from "../../../peoplefinder-api/model/proficiency";
import {Criteria} from "../../../peoplefinder-api/model/criteria";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TeamSetupService {
  readonly DUMMY_RESULT: Team[] = [
    {
      name: "Team 1", members: {
        lybo: {proficiencies: [{skill: {name: "Angular"}, rating: 1}, {skill: {name: "Spring"}, rating: 1}]},
        dava: {proficiencies: [{skill: {name: "Angular"}, rating: 2}, {skill: {name: "Spring"}, rating: 2}]},
        xaro: {proficiencies: [{skill: {name: "Angular"}, rating: 3}, {skill: {name: "Spring"}, rating: 3}]}
      }
    },
    {
      name: "Team 2", members: {
        stbo: {proficiencies: [{skill: {name: "Angular"}, rating: 5}, {skill: {name: "Spring"}, rating: 1}]},
        geze: {proficiencies: [{skill: {name: "Angular"}, rating: 2}, {skill: {name: "Spring"}, rating: 5}]},
        jar: {proficiencies: [{skill: {name: "Angular"}, rating: 2}, {skill: {name: "Spring"}, rating: 3}]}
      }
    },
    {
      name: "Team 3", members: {
        lume: {proficiencies: [{skill: {name: "Angular"}, rating: 4}, {skill: {name: "Spring"}, rating: 3}]},
        pass: {proficiencies: [{skill: {name: "Angular"}, rating: 2}, {skill: {name: "Spring"}, rating: 5}]},
        asdf: {proficiencies: [{skill: {name: "Angular"}, rating: 2}, {skill: {name: "Spring"}, rating: 5}]}
      }
    }
  ]

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

  submit(proficiencyPerPerson: ProficiencyPerPerson): Observable<Team[]> {
    // map to Team
    let members: { [key: string]: Criteria } = {};
    Object.keys(proficiencyPerPerson).forEach(key => {
      members[key] = TeamSetupService.mapToCriteria(proficiencyPerPerson[key].proficiencies);
    })

    const team: Team = {members: members};
    // return this.teamsServiceApi.calculateTeams(team, this._config.teamDimension);

    return of(this.DUMMY_RESULT);
  }

  private static mapToCriteria(proficiencies: Proficiency[]): Criteria {
    return {proficiencies: proficiencies};
  }
}
