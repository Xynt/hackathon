import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TeamSetupService} from "../service/team-setup.service";
import {Proficiency} from "../../../peoplefinder-api/model/proficiency";
import {ResultService} from "../service/result.service";

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

  constructor(private router: Router, private teamSetupService: TeamSetupService, private resultService: ResultService) {
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
    for (let p of selectedPeople) {
      teamMembers[p.person.code] = {fullname: p.person.firstName + " " + p.person.lastName, proficiencies: initProficiencies.map(el => Object.assign({}, el))};
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
    this.teamSetupService.submit().subscribe(teams => {
      // TODO Transmit result to new component?
      this.resultService.teams = teams;
      this.router.navigate(["result"]);
    });
  }
}
