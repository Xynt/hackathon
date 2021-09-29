import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TeamSetupService} from "../service/team-setup.service";
import {Proficiency} from "../../../peoplefinder-api/model/proficiency";

export interface ProficiencyPerPerson {
  [code: string]: PersonConfig;
}

export interface PersonConfig {
  fullname: string;
  proficiencies: Proficiency[];
}

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {
  proficienciesPerPerson: ProficiencyPerPerson = {};

  teamDimension: number = 2;

  constructor(private router: Router, private teamSetupService: TeamSetupService) {
  }

  ngOnInit(): void {
    this.proficienciesPerPerson = this.initProficienciesPerPerson();
  }

  getSkillNames() {
    return this.teamSetupService.skills.map(skill => skill.name);
  }

  getDisplay(): PersonConfig[] {
    return Object.values(this.proficienciesPerPerson);
  }

  private initProficienciesPerPerson(): ProficiencyPerPerson {
    const initProficiencies = this.initProficiencies();

    const selectedPeople = this.teamSetupService.people;
    const teamMembers: {[key: string]: PersonConfig} = {};
    for (let person of selectedPeople) {
      teamMembers[person.code] = {fullname: person.firstName + " " + person.lastName, proficiencies: initProficiencies.map(el => Object.assign({}, el))};
    }

    return teamMembers;
  }

  private initProficiencies() {
    const initProficiencies: Proficiency[] = [];
    const selectedSkills = this.teamSetupService.skills;
    for (let skill of selectedSkills) {
      initProficiencies.push({skill: skill, rating: 1})
    }
    return initProficiencies;
  }

  submit(): void {
    this.teamSetupService.config = {teamDimension: this.teamDimension};
    this.teamSetupService.submit(this.proficienciesPerPerson);
  }

  navigateBack() {

  }
}
