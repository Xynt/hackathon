import { Injectable } from '@angular/core';
import {Team} from "../../../peoplefinder-api/model/team";

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  private _teams: Team[] = [];

  constructor() { }

  get teams(): Team[] {
    return this._teams;
  }

  set teams(value: Team[]) {
    this._teams = value;
  }
}
