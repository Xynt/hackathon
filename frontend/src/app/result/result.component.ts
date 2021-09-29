import {Component, OnInit} from '@angular/core';
import {Team} from "../../../peoplefinder-api/model/team";
import {ResultService} from "../service/result.service";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  teams: Team[] = [];

  constructor(private resultService: ResultService) {
  }

  ngOnInit(): void {
    this.teams = this.resultService.teams;
  }

  getMembersOf(team: Team) {
    return Object.keys(team.members!);
  }

  getImageFor(code: string) {
    return this.resultService.getImagePath(code);
  }

}
