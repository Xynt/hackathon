import {Component, ViewChild} from '@angular/core';
import {MatTable} from "@angular/material/table";

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  skills: Skill[] = [{name: "Spring"}, {name: "CSS"}, {name: "HTML"}];
  displayedColumns: string[] = ["name"];
  skillNameInput: string = "";

  @ViewChild(MatTable) table!: MatTable<Skill>;

  addSkill(skillName: string): void {
    this.skills.push({name: skillName});
    this.skillNameInput = "";
    this.table.renderRows();
  }
}

export interface Skill {
  name: string;
}
