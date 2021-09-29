import {Injectable} from '@angular/core';
import {Skill} from "../../../peoplefinder-api/model/skill";
import {Config} from "../models/config";
import {Person} from "../../../peoplefinder-api/model/person";
import {TeamsServiceApi} from "../../../peoplefinder-api/api/teams.service";

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

  submit() {

  }
}
