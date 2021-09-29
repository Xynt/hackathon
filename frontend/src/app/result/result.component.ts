import {Component, OnInit} from '@angular/core';
import {Team} from "../../../peoplefinder-api/model/team";
import {ResultService} from "../service/result.service";
import {teamOverview} from "../animations";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  animations: [teamOverview]
})
export class ResultComponent implements OnInit {
  teams: Team[] = [];
  avatarStates: boolean[] = [];
  showAvatars: boolean = false;

  constructor(private resultService: ResultService) {
  }

  ngOnInit(): void {
    this.teams = this.resultService.teams;

    this.setupAnimations();
  }

  private setupAnimations() {
    this.teams.forEach(() => this.avatarStates.push(false));

    for (let index = 0; index < this.avatarStates.length; index++) {
      setTimeout(() => this.avatarStates[index] = true, 500 * (index + 1));
    }
  }

  getMembersOf(team: Team) {
    return Object.keys(team.members!);
  }

  getImageFor(code: string) {
    return this.resultService.getImagePath(code);
  }

  getAnimationState(index: number) {
    return this.avatarStates[index] ? 'show' : 'hide';
  }

}
