import {Component} from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  skills: Skill[] = [{name: "Spring"}, {name: "CSS"}, {name: "HTML"}];
  displayedColumns: string[] = ["name"];
}

export interface Skill {
  name: string;
}
