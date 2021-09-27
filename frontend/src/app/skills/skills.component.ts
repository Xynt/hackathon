import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable} from "@angular/material/table";
import {Observable} from "rxjs";
import {FormControl} from "@angular/forms";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  skillControl: FormControl = new FormControl();
  skills: Skill[] = [{name: "Spring"}, {name: "CSS"}, {name: "HTML"}];
  displayedColumns: string[] = ["name"];
  skillNameInput: string = "";
  suggestions: Skill[] = [{name: "Spring"}, {name: "CSS"}, {name: "HTML"}, {name: "Angular"}, {name: "DOTNET"}, {name: "Test"}]

  filteredSuggestions!: Observable<Skill[]>;

  @ViewChild(MatTable) table!: MatTable<Skill>;

  ngOnInit(): void {
    this.filteredSuggestions = this.skillControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  addSkill(skillName: string): void {
    this.skills.push({name: skillName});
    this.skillNameInput = "";
    this.table.renderRows();
  }

  _filter(value: string): Skill[] {
    const filterValue = value.toLowerCase();
    console.log("AYYY FONSI")

    return this.suggestions.filter((option => option.name.toLowerCase().includes(filterValue))).splice(0, 5);
  }
}

export interface Skill {
  name: string;
}
