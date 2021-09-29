import {Component, OnInit} from '@angular/core';
import {Team} from "../../../peoplefinder-api/model/team";
import {ResultService} from "../service/result.service";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
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
      name: "Team 1", members: {
        lume: {proficiencies: [{skill: {name: "Angular"}, rating: 4}, {skill: {name: "Spring"}, rating: 3}]},
        pass: {proficiencies: [{skill: {name: "Angular"}, rating: 2}, {skill: {name: "Spring"}, rating: 5}]}
      }
    }
  ]

  teams: Team[] = this.DUMMY_RESULT;

  constructor(private resultService: ResultService) {
  }

  ngOnInit(): void {
    this.teams = this.resultService.teams;
  }

  getMembersOf(team: Team) {
    return Object.keys(team.members!);
  }

}
