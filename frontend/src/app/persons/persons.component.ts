import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {Skill} from "../skills/skills.component";

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent {

  skills: Skill[] = [];

  constructor(private router: Router) {
    try {
      this.skills = router.getCurrentNavigation()!.extras.state!.selectedSkills;
    } catch (e) {
      this.router.navigate(["/skills"]);
    }
  }

}
